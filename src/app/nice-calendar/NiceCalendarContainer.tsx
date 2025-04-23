"use client";

import { useState, useRef } from "react";
import { 
  DayOfWeek, 
  ClassItem, 
  HourMark, 
  ThemeColors,
  THEMES,
  DEFAULT_DAYS_OF_WEEK,
  DEFAULT_HOURS,
  DEFAULT_CLASSES
} from "./types";
import NiceCalendar from "./NiceCalendar";

export const NiceCalendarContainer = () => {
  // State for title, subtitle, color and theme
  const [title, setTitle] = useState("Mi Horario de Clases");
  const [subtitle, setSubtitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6"); // Default blue color
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  
  // Create refs with proper typing
  const calendarRef = useRef<HTMLDivElement>(null);
  const fullCalendarRef = useRef<HTMLDivElement>(null);

  // Get current theme
  const currentTheme: ThemeColors = darkMode ? THEMES.dark : THEMES.light;

  // State for days, hours, and classes
  const [daysOfWeek] = useState<DayOfWeek[]>(DEFAULT_DAYS_OF_WEEK);
  const [hours] = useState<HourMark[]>(DEFAULT_HOURS);
  const [classes] = useState<ClassItem[]>(DEFAULT_CLASSES);

  // New approach: Draw directly on canvas instead of using html2canvas
  const handleDownload = async () => {
    try {
      // Canvas dimensions - make it large enough for good quality
      const calendarWidth = 1500;
      const calendarHeight = 1200;
      
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = calendarWidth;
      canvas.height = calendarHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
      
      // Fill background
      ctx.fillStyle = currentTheme.background;
      ctx.fillRect(0, 0, calendarWidth, calendarHeight);
      
      // Draw title and subtitle
      ctx.fillStyle = currentTheme.text;
      ctx.font = 'bold 28px Arial';
      ctx.fillText(title || "Mi Horario de Clases", 40, 50);
      
      ctx.fillStyle = darkMode ? "#9ca3af" : "#6b7280";
      ctx.font = '16px Arial';
      ctx.fillText(subtitle || "Semestre 1, 2025 • GMT-04", 40, 80);
      
      // Constants for drawing
      const headerHeight = 120;
      const hourHeight = 60;
      const timeColumnWidth = 80;
      const contentWidth = calendarWidth - timeColumnWidth;
      const dayColumnWidth = contentWidth / daysOfWeek.length;
      
      // Helper function to draw rounded rectangle for class boxes
      const roundRect = (
        x: number, 
        y: number, 
        width: number, 
        height: number, 
        radius: number, 
        fill: boolean, 
        stroke: boolean
      ) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      };
      
      // Draw time column header
      ctx.fillStyle = currentTheme.hourText;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GMT-04', timeColumnWidth / 2, headerHeight - 15);
      
      // Draw day headers
      daysOfWeek.forEach((day, index) => {
        const x = timeColumnWidth + (index * dayColumnWidth);
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 16px Arial';
        ctx.fillText(day.abbr, x + dayColumnWidth / 2, headerHeight - 15);
      });
      
      // Draw hour grid
      ctx.strokeStyle = currentTheme.grid;
      ctx.lineWidth = 1;
      
      // Draw time labels and horizontal grid lines
      hours.forEach((hour, index) => {
        const y = headerHeight + (index * hourHeight);
        
        // Draw horizontal grid line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(calendarWidth, y);
        ctx.stroke();
        
        // Draw time label
        ctx.fillStyle = currentTheme.hourText;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(hour.display, timeColumnWidth / 2, y + 30);
      });
      
      // Draw vertical grid lines
      for (let i = 0; i <= daysOfWeek.length; i++) {
        const x = timeColumnWidth + (i * dayColumnWidth);
        ctx.beginPath();
        ctx.moveTo(x, headerHeight);
        ctx.lineTo(x, calendarHeight);
        ctx.stroke();
      }
      
      // Draw classes
      classes.forEach(classItem => {
        const dayIndex = classItem.dayIndex;
        const startHour = classItem.startHour - 7; // Adjusting to 0-based index
        const endHour = classItem.endHour - 7;
        
        const x = timeColumnWidth + (dayIndex * dayColumnWidth) + 6;
        const y = headerHeight + (startHour * hourHeight) + 3;
        const width = dayColumnWidth - 12;
        const height = (endHour - startHour) * hourHeight - 6;
        
        // Draw class box
        ctx.fillStyle = selectedColor;
        roundRect(x, y, width, height, 8, true, false);
        
        // Draw class name
        ctx.fillStyle = '#000000'; // Black text for contrast
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        
        // Ensure text fits in the box
        const className = classItem.name;
        const maxTextWidth = width - 16; // Accounting for padding
        
        // Measure text width and truncate if necessary
        let displayName = className;
        let textWidth = ctx.measureText(displayName).width;
        
        if (textWidth > maxTextWidth) {
          // Truncate text with ellipsis
          let ellipsis = '...';
          let truncated = '';
          
          // Try to fit as much text as possible
          for (let i = 0; i < className.length; i++) {
            let testText = className.substring(0, i) + ellipsis;
            if (ctx.measureText(testText).width > maxTextWidth) {
              break;
            }
            truncated = testText;
          }
          
          displayName = truncated;
        }
        
        // Draw the text with proper padding
        ctx.fillText(displayName, x + 10, y + 25);
        
        // Draw class time
        ctx.font = '14px Arial';
        ctx.fillText(classItem.time, x + 10, y + 50);
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${title || 'horario'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    } catch (error) {
      console.error('Error generating calendar image:', error);
      alert('No se pudo descargar la imagen. Intente de nuevo más tarde.');
    }
  };

  // Handle color picker change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Calculate position and size of classes in the calendar
  const getClassStyle = (classItem: ClassItem) => {
    const hourHeight = 60; // Altura de una hora en px
    const startPosition = (classItem.startHour - 7) * hourHeight;
    const duration = (classItem.endHour - classItem.startHour) * hourHeight;
    
    return {
      top: `${startPosition}px`,
      height: `${duration}px`,
      left: `0`,
      right: `0`,
    };
  };

  // Pass all needed props to the presentation component
  return (
    <NiceCalendar
      title={title}
      setTitle={setTitle}
      subtitle={subtitle}
      setSubtitle={setSubtitle}
      selectedColor={selectedColor}
      handleColorChange={handleColorChange}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      handleDownload={handleDownload}
      currentTheme={currentTheme}
      daysOfWeek={daysOfWeek}
      hours={hours}
      classes={classes}
      getClassStyle={getClassStyle}
      calendarRef={calendarRef}
      fullCalendarRef={fullCalendarRef}
    />
  );
};

export default NiceCalendarContainer;