"use client";

import { ThemeColors } from "./types";

interface NiceCalendarHeaderProps {
  currentTheme: ThemeColors;
  darkMode: boolean;
}

const NiceCalendarHeader = ({
  currentTheme,
  darkMode
}: NiceCalendarHeaderProps) => {
  // Header styles
  const headerStyle = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f8fafc", 
    color: currentTheme.text, 
    padding: "0.75rem 1rem", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center"
  };

  const searchButtonStyle = {
    display: "flex", 
    alignItems: "center", 
    color: currentTheme.text
  };

  const searchTextStyle = {
    marginRight: "0.5rem"
  };

  const menuIconStyle = {
    color: currentTheme.text
  };

  const buttonContainerStyle = {
    display: "flex",
    alignItems: "center"
  };

  const menuButtonContainerStyle = {
    marginRight: "1rem"
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Left side of header - could contain logo or other elements */}
      </div>
      <div style={buttonContainerStyle}>
        <div style={menuButtonContainerStyle}>
          <button style={searchButtonStyle}>
            <span style={searchTextStyle}>BUSCA AQUÍ</span>
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
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <button style={menuIconStyle}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

/**
 * Header component for the NiceCalendar
 * 
 * Displays the application header with search and menu buttons.
 * The appearance adjusts based on the current theme (dark/light mode).
 * 
 * @param currentTheme - Theme colors object with text and background colors
 * @param darkMode - Boolean indicating if dark mode is active
 * 
 * @returns React component
 */
export default NiceCalendarHeader;