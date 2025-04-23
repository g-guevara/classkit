"use client";

import { RefObject } from "react";
import { ThemeColors, ClassItem, DayOfWeek, HourMark } from "./types";

interface NiceCalendarGridProps {
  fullCalendarRef: RefObject<HTMLDivElement>;
  calendarRef: RefObject<HTMLDivElement>;
  title: string;
  subtitle: string;
  currentTheme: ThemeColors;
  darkMode: boolean;
  daysOfWeek: DayOfWeek[];
  hours: HourMark[];
  classes: ClassItem[];
  selectedColor: string;
  getClassStyle: (classItem: ClassItem) => {
    top: string;
    height: string;
    left: string;
    right: string;
  };
}

/**
 * NiceCalendarGrid component
 * 
 * Displays the main calendar grid with days, hours, and class blocks.
 * This component handles the visual representation of the schedule.
 */
const NiceCalendarGrid = ({
  fullCalendarRef,
  calendarRef,
  title,
  subtitle,
  currentTheme,
  darkMode,
  daysOfWeek,
  hours,
  classes,
  selectedColor,
  getClassStyle
}: NiceCalendarGridProps) => {
  // Styles for class text elements
  const classTextStyle = {
    fontSize: "0.875rem", 
    fontWeight: "600" as const,
    color: "#000000", // Always black text for contrast
    display: "-webkit-box", 
    WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const classTimeStyle = {
    fontSize: "0.75rem",
    color: "#000000", // Always black text for contrast
  };

  // Container styles
  const calendarContainerStyle = {
    backgroundColor: currentTheme.background, 
    color: currentTheme.text, 
    padding: "0.5rem"
  };

  const titleStyle = {
    fontSize: "1.5rem", 
    fontWeight: "bold" as const
  };

  const subtitleStyle = {
    color: darkMode ? "#9ca3af" : "#6b7280"
  };

  const titleContainerStyle = {
    marginBottom: "1.5rem"
  };

  return (
    <div ref={fullCalendarRef} style={calendarContainerStyle}>
      {/* Title and subtitle */}
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>{title || "Mi Horario de Clases"}</h1>
        <p style={subtitleStyle}>{subtitle || "Semestre 1, 2025 • GMT-04"}</p>
      </div>

      {/* Calendar Grid */}
      <div style={{ position: "relative", overflowX: "auto" }} ref={calendarRef}>          
        <div style={{ display: "flex" }}>
          {/* Time column */}
          <div style={{ width: "4rem", flexShrink: 0 }}>
            <div style={{ 
              height: "4rem", 
              display: "flex", 
              alignItems: "flex-end", 
              justifyContent: "center", 
              fontWeight: "600", 
              color: currentTheme.hourText 
            }}>
              GMT-04
            </div>
            
            {/* Time labels */}
            {hours.map(hour => (
              <div 
                key={hour.hour} 
                style={{ 
                  height: "60px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  borderTop: `1px solid ${currentTheme.grid}` 
                }}
              >
                <span style={{ fontSize: "0.875rem", color: currentTheme.hourText }}>
                  {hour.display}
                </span>
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {daysOfWeek.map((day, index) => (
            <div key={index} style={{ flex: "1", minWidth: "120px" }}>
              {/* Day header */}
              <div style={{ 
                height: "4rem", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center" 
              }}>
                <div style={{ fontSize: "1rem", color: currentTheme.text }}>
                  {day.abbr}
                </div>
              </div>
              
              {/* Grid cells for each hour */}
              <div style={{ position: "relative" }}>
                {hours.map(hour => (
                  <div 
                    key={hour.hour} 
                    style={{ 
                      height: "60px", 
                      borderTop: `1px solid ${currentTheme.grid}` 
                    }}
                  ></div>
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
  );
};

export default NiceCalendarGrid;