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
import { renderCalendarToCanvas } from "./CalendarRender";

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

  // Handle download using the canvas renderer
  const handleDownload = async () => {
    try {
      // Create canvas and render calendar on it
      const canvas = renderCalendarToCanvas({
        title: title || "Mi Horario de Clases",
        subtitle: subtitle || "Semestre 1, 2025 • GMT-04",
        selectedColor,
        darkMode,
        currentTheme,
        daysOfWeek,
        hours,
        classes
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