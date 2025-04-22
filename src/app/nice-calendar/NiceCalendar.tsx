"use client";

import { RefObject } from "react";
import { 
  DayOfWeek, 
  ClassItem, 
  HourMark, 
  ThemeColors
} from "./types";

interface NiceCalendarProps {
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  selectedColor: string;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  darkMode: boolean;
  toggleTheme: () => void;
  handleDownload: () => Promise<void>;
  currentTheme: ThemeColors;
  daysOfWeek: DayOfWeek[];
  hours: HourMark[];
  classes: ClassItem[];
  getClassStyle: (classItem: ClassItem) => {
    top: string;
    height: string;
    left: string;
    right: string;
  };
  // Fix the ref types to properly handle null values
  calendarRef: RefObject<HTMLDivElement>;
  fullCalendarRef: RefObject<HTMLDivElement>;
}

export const NiceCalendar = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  selectedColor,
  handleColorChange,
  darkMode,
  toggleTheme,
  handleDownload,
  currentTheme,
  daysOfWeek,
  hours,
  classes,
  getClassStyle,
  calendarRef,
  fullCalendarRef
}: NiceCalendarProps) => {
  // CSS styles without Tailwind color utilities to prevent OKLCH format issues
  const panelStyle = {
    backgroundColor: currentTheme.panel,
    borderRadius: "0.75rem",
    padding: "1.5rem",
    margin: "0 1.5rem 1.5rem 1.5rem",
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    alignItems: "center"
  };

  const inputContainerStyle = {
    flexGrow: 1,
    marginRight: "2rem",
    maxWidth: "400px"
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

  const colorPickerLabelStyle = {
    display: "flex",
    alignItems: "center",
    marginRight: "1rem"
  };

  const colorPickerStyle = {
    width: "2.5rem",
    height: "2.5rem",
    cursor: "pointer",
    borderRadius: "9999px",
    overflow: "hidden"
  };

  const pegarHorarioStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px dashed #3B82F6",
    borderRadius: "0.25rem",
    padding: "0.75rem 1rem",
    color: "#60a5fa",
    cursor: "pointer",
    marginRight: "1rem"
  };

  const toggleButtonStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: darkMode ? "#6b7280" : "#f3f4f6",
    color: darkMode ? "#ffffff" : "#000000",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    border: `1px solid ${currentTheme.border}`
  };

  const classTextStyle = {
    fontSize: "0.875rem", 
    fontWeight: "600",
    color: "#000000", // Always black text
    display: "-webkit-box", 
    WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const classTimeStyle = {
    fontSize: "0.75rem",
    color: "#000000", // Always black text
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: currentTheme.background, color: currentTheme.text }}>
      {/* Header */}
      <header style={{ backgroundColor: darkMode ? "#1a1a1a" : "#f8fafc", color: currentTheme.text, padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "1rem" }}>
            <button style={{ display: "flex", alignItems: "center", color: currentTheme.text }}>
              <span style={{ marginRight: "0.5rem" }}>BUSCA AQUÍ</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <button style={{ color: currentTheme.text }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Calendar Container */}
      <div style={{ flex: "1", backgroundColor: currentTheme.background, color: currentTheme.text, padding: "1rem" }}>
        {/* Settings Panel - Using inline styles to avoid OKLCH colors */}
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
          
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <button 
              onClick={handleDownload}
              style={buttonStyle}
            >
              Descargar
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.5rem" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            
            <div style={colorPickerLabelStyle}>
              <span style={{ marginRight: "0.5rem" }}>Color:</span>
              <div style={colorPickerStyle}>
                <input 
                  type="color" 
                  value={selectedColor}
                  onChange={handleColorChange}
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>
            
            <div style={pegarHorarioStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
                <path d="M4 11V8a1 1 0 0 1 1-1h5V3h4v4h5a1 1 0 0 1 1 1v3" />
                <path d="M4 13v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              Pega horario
            </div>
            
            <button onClick={toggleTheme} style={toggleButtonStyle}>
              {darkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
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
                  Claro
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Oscuro
                </>
              )}
            </button>
          </div>
        </div>

        {/* Full calendar div (includes title, subtitle and calendar) for screenshot */}
        <div ref={fullCalendarRef} style={{ backgroundColor: currentTheme.background, color: currentTheme.text, padding: "0.5rem" }}>
          {/* Title and subtitle */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title || "Mi Horario de Clases"}</h1>
            <p style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>{subtitle || "Semestre 1, 2025 • GMT-04"}</p>
          </div>

          {/* Calendar Grid */}
          <div style={{ position: "relative", overflowX: "auto" }} ref={calendarRef}>          
            <div style={{ display: "flex" }}>
              {/* Time column */}
              <div style={{ width: "4rem", flexShrink: 0 }}>
                <div style={{ height: "4rem", display: "flex", alignItems: "flex-end", justifyContent: "center", fontWeight: "600", color: currentTheme.hourText }}>
                  GMT-04
                </div>
                
                {/* Time labels */}
                {hours.map(hour => (
                  <div key={hour.hour} style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center", borderTop: `1px solid ${currentTheme.grid}` }}>
                    <span style={{ fontSize: "0.875rem", color: currentTheme.hourText }}>{hour.display}</span>
                  </div>
                ))}
              </div>
              
              {/* Days columns */}
              {daysOfWeek.map((day, index) => (
                <div key={index} style={{ flex: "1", minWidth: "120px" }}>
                  {/* Day header */}
                  <div style={{ height: "4rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "1rem", color: currentTheme.text }}>{day.abbr}</div>
                  </div>
                  
                  {/* Grid cells for each hour */}
                  <div style={{ position: "relative" }}>
                    {hours.map(hour => (
                      <div key={hour.hour} style={{ height: "60px", borderTop: `1px solid ${currentTheme.grid}` }}></div>
                    ))}
                    
                    {/* Classes */}
                    {classes
                      .filter(classItem => classItem.dayIndex === index)
                      .map(classItem => (
                        <div
                          key={classItem.id}
                          style={{
                            position: "absolute",
                            padding: "0.5rem",
                            borderRadius: "0.5rem", // Rounded corners
                            marginLeft: "0.25rem",
                            marginRight: "0.25rem",
                            overflow: "hidden",
                            backgroundColor: selectedColor,
                            ...getClassStyle(classItem)
                          }}
                        >
                          <div style={classTextStyle}>{classItem.name}</div>
                          <div style={classTimeStyle}>{classItem.time}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NiceCalendar;