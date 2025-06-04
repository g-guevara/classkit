"use client";

import { RefObject } from "react";
import { ThemeColors, ClassItem } from "../nice-calendar/types";
import NiceCalendarHeader from "../nice-calendar/NiceCalendarHeader";
import NiceCalendarGrid from "../nice-calendar/NiceCalendarGrid";

interface ScheduleData {
  isLoaded: boolean;
  classes: ClassItem[];
}

interface HorarioComunProps {
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  scheduleColors: string[];
  darkMode: boolean;
  toggleTheme: () => void;
  handleDownload: () => Promise<void>;
  currentTheme: ThemeColors;
  daysOfWeek: any[];
  hours: any[];
  schedules: ScheduleData[];
  getClassStyle: (classItem: ClassItem, scheduleIndex?: number) => {
    top: string;
    height: string;
    left: string;
    right: string;
    backgroundColor: string;
    opacity: number;
  };
  calendarRef: RefObject<HTMLDivElement>;
  fullCalendarRef: RefObject<HTMLDivElement>;
  handleOpenPasteModal: (index: number) => void;
}

export const HorarioComun = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  scheduleColors,
  darkMode,
  toggleTheme,
  handleDownload,
  currentTheme,
  daysOfWeek,
  hours,
  schedules,
  getClassStyle,
  calendarRef,
  fullCalendarRef,
  handleOpenPasteModal
}: HorarioComunProps) => {
  // Panel styles
  const panelStyle = {
    backgroundColor: currentTheme.panel,
    borderRadius: "0.75rem",
    padding: "1rem",
    margin: "0 0.5rem 1rem 0.5rem",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    boxSizing: "border-box" as const
  };

  const inputContainerStyle = {
    marginBottom: "1rem",
    width: "100%"
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    padding: "0.75rem 1rem",
    borderRadius: "0.25rem",
    border: `1px solid ${currentTheme.border}`,
    outline: "none",
    marginBottom: "0.75rem"
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: currentTheme.background,
    color: currentTheme.text,
    padding: "0.75rem 1rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    border: `1px solid ${currentTheme.border}`,
    marginRight: "1rem"
  };

  const pasteScheduleButtonStyle = {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #3B82F6",
    borderRadius: "0.25rem",
    padding: "0.75rem 0.5rem",
    color: "#60a5fa",
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none",
    position: "relative" as const,
    zIndex: 2,
    margin: "0 0.25rem",
    fontSize: "0.9rem",
    minWidth: "0"
  };

  const pasteScheduleCompleteStyle = {
    ...pasteScheduleButtonStyle,
    border: "2px solid #10B981",
    color: "#10B981"
  };

  const toggleSwitchStyle = {
    position: "relative" as const,
    display: "inline-block",
    width: "48px",
    height: "24px",
    marginLeft: "8px"
  };
  
  const toggleInputStyle = {
    opacity: 0,
    width: 0,
    height: 0
  };
  
  const toggleSliderStyle = {
    position: "absolute" as const,
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: darkMode ? "#6b7280" : "#cbd5e1",
    borderRadius: "24px",
    transition: "0.4s",
    boxShadow: "0 0 2px rgba(0,0,0,0.3) inset"
  };
  
  const toggleSliderBeforeStyle = {
    position: "absolute" as const,
    content: '""',
    height: "20px",
    width: "20px",
    left: darkMode ? "2px" : "26px",
    bottom: "2px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transition: "0.4s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
  };

  const legendStyle = {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    flexWrap: "wrap" as const,
    gap: "0.5rem"
  };

  const legendItemStyle = {
    display: "flex" as const,
    alignItems: "center",
    marginRight: "0.5rem",
    fontSize: "0.75rem",
    marginBottom: "0.5rem"
  };

  const legendColorBoxStyle = {
    width: "1rem",
    height: "1rem",
    borderRadius: "0.25rem",
    marginRight: "0.5rem"
  };

  // Calculate if any schedules have been loaded
  const anyScheduleLoaded = schedules.some(schedule => schedule.isLoaded);
  const allSchedulesLoaded = schedules.every(schedule => schedule.isLoaded);

  // Combine all classes from all schedules for display
  // Add a unique key by combining the schedule index with the class id
  const allClasses = schedules.flatMap((schedule, scheduleIndex) => 
    schedule.classes.map(classItem => ({
      ...classItem,
      id: `${scheduleIndex}-${classItem.id}`, // Create a unique ID combining schedule index and class ID
      scheduleIndex // Add schedule index to track which schedule it belongs to
    }))
  );

  // Create schedule button components
  const scheduleButtons = () => {
    return (
      <div style={{ display: "flex", width: "100%", marginBottom: "1rem", flexWrap: "wrap" as const }}>
        {schedules.map((schedule, index) => {
          // Use the corresponding schedule color
          const buttonColor = scheduleColors[index];
          // Customize button style based on schedule color
          const customButtonStyle = schedule.isLoaded ? 
            { ...pasteScheduleCompleteStyle, border: `2px solid ${buttonColor}`, color: buttonColor } : 
            { ...pasteScheduleButtonStyle, border: `2px dashed ${buttonColor}`, color: buttonColor };
            
          return (
            <button 
              key={index}
              onClick={() => handleOpenPasteModal(index)}
              style={customButtonStyle}
              type="button"
              aria-label={`Pegar horario ${index + 1}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ marginRight: "0.25rem", flexShrink: 0 }}
              >
                <path d="M4 11V8a1 1 0 0 1 1-1h5V3h4v4h5a1 1 0 0 1 1 1v3" />
                <path d="M4 13v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {schedule.isLoaded ? `Horario ${index + 1} (${schedule.classes.length})` : `Pega horario ${index + 1}`}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: currentTheme.background, color: currentTheme.text }}>
      {/* Header */}
      <NiceCalendarHeader 
        currentTheme={currentTheme} 
        darkMode={darkMode} 
      />

      {/* Calendar Container */}
      <div style={{ flex: "1", backgroundColor: currentTheme.background, color: currentTheme.text, padding: "0.5rem", width: "100%", boxSizing: "border-box" }}>
        {/* Settings Panel */}
        <div style={panelStyle}>
          <div style={inputContainerStyle}>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              style={inputStyle}
            />
            
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtítulo"
              style={inputStyle}
            />
          </div>
          
          {/* Schedule paste buttons */}
          {scheduleButtons()}
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <button 
                onClick={handleDownload}
                style={buttonStyle}
                type="button"
              >
                {/* Icono y texto cambian según el dispositivo */}
                {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
                  <>
                    Compartir
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.5rem" }}>
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </>
                ) : (
                  <>
                    Descargar
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.5rem" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
                <label style={toggleSwitchStyle}>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                    style={toggleInputStyle}
                  />
                  <span style={toggleSliderStyle}>
                    <span style={toggleSliderBeforeStyle}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Legend for the color coding */}
          {anyScheduleLoaded && (
            <div style={legendStyle}>
              {schedules.map((schedule, index) => (
                schedule.isLoaded && (
                  <div key={index} style={legendItemStyle}>
                    <div style={{...legendColorBoxStyle, backgroundColor: scheduleColors[index]}}></div>
                    <span>Horario {index + 1}</span>
                  </div>
                )
              ))}
              {schedules.filter(s => s.isLoaded).length >= 2 && (
                <div style={legendItemStyle}>
                  <div style={{...legendColorBoxStyle, backgroundColor: "#10B981"}}></div>
                  <span>Tiempo en común</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Calendar content - we're using the same grid component but passing custom class data */}
        <NiceCalendarGrid
          fullCalendarRef={fullCalendarRef}
          calendarRef={calendarRef}
          title={title}
          subtitle={subtitle}
          currentTheme={currentTheme}
          darkMode={darkMode}
          daysOfWeek={daysOfWeek}
          hours={hours}
          classes={allClasses}
          selectedColor={scheduleColors[0]}
          getClassStyle={(classItem) => getClassStyle(classItem, (classItem as any).scheduleIndex)}
        />
      </div>
    </div>
  );
};

export default HorarioComun;