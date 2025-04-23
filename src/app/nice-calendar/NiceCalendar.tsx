"use client";

import { RefObject } from "react";
import { ThemeColors } from "./types";
import NiceCalendarHeader from "./NiceCalendarHeader";
import NiceCalendarGrid from "./NiceCalendarGrid";

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
  daysOfWeek: any[];
  hours: any[];
  classes: any[];
  getClassStyle: (classItem: any) => {
    top: string;
    height: string;
    left: string;
    right: string;
  };
  calendarRef: RefObject<HTMLDivElement>;
  fullCalendarRef: RefObject<HTMLDivElement>;
  handleOpenPasteModal: () => void;
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
  fullCalendarRef,
  handleOpenPasteModal
}: NiceCalendarProps) => {
  // Panel styles
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
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid white",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)"
  };

  const pasteScheduleButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #3B82F6",
    borderRadius: "0.25rem",
    padding: "0.75rem 1rem",
    color: "#60a5fa",
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none",
    position: "relative" as const,
    zIndex: 2
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: currentTheme.background, color: currentTheme.text }}>
      {/* Header */}
      <NiceCalendarHeader 
        currentTheme={currentTheme} 
        darkMode={darkMode} 
      />

      {/* Calendar Container */}
      <div style={{ flex: "1", backgroundColor: currentTheme.background, color: currentTheme.text, padding: "1rem" }}>
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
          
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <button 
              onClick={handleDownload}
              style={buttonStyle}
              type="button"
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
              <div 
                style={{
                  ...colorPickerStyle,
                  backgroundColor: selectedColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <input 
                  type="color" 
                  value={selectedColor}
                  onChange={handleColorChange}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    zIndex: 1
                  }}
                  aria-label="Selector de color"
                />
              </div>
            </div>
            
            <div style={{ marginLeft: "1rem", marginTop:"1rem" }}>
              {/* Paste schedule button in its own container */}
              <button 
                onClick={handleOpenPasteModal}
                style={pasteScheduleButtonStyle}
                type="button"
                aria-label="Pegar horario"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
                  <path d="M4 11V8a1 1 0 0 1 1-1h5V3h4v4h5a1 1 0 0 1 1 1v3" />
                  <path d="M4 13v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                </svg>
                Pega horario
              </button>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", marginTop:"1rem" }}>
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
        </div>

        {/* Calendar content */}
        <NiceCalendarGrid
          fullCalendarRef={fullCalendarRef}
          calendarRef={calendarRef}
          title={title}
          subtitle={subtitle}
          currentTheme={currentTheme}
          darkMode={darkMode}
          daysOfWeek={daysOfWeek}
          hours={hours}
          classes={classes}
          selectedColor={selectedColor}
          getClassStyle={getClassStyle}
        />
      </div>
    </div>
  );
};

export default NiceCalendar;