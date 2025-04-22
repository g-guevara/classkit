"use client";

import { useState, useRef } from "react";
import { 
  DayOfWeek, 
  ClassItem, 
  HourMark, 
  ThemeColors,
  THEMES,
  getTextColor,
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
  const [classes, setClasses] = useState<ClassItem[]>(DEFAULT_CLASSES);

  // Function to download calendar as image with error handling and forcing hex colors
  const handleDownload = async () => {
    if (!fullCalendarRef.current) return;
    
    try {
      // Before capturing, temporarily set all colors to hex format
      const elementsWithColor = fullCalendarRef.current.querySelectorAll('[style*="color"]');
      const originalStyles = new Map();
      
      // Store original styles and set compatible colors for html2canvas
      elementsWithColor.forEach((el, i) => {
        originalStyles.set(i, el.getAttribute('style'));
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const textColor = style.color;
        
        // Set standard RGB colors
        (el as HTMLElement).style.backgroundColor = bgColor;
        (el as HTMLElement).style.color = textColor;
      });
      
      // Dynamically import html2canvas only when needed
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      
      // Use html2canvas with specific options to avoid OKLCH colors
      const canvas = await html2canvas(fullCalendarRef.current, {
        backgroundColor: currentTheme.background,
        logging: false,
        removeContainer: true,
        scale: 2, // Higher quality
        useCORS: true
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${title || 'horario'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // Restore original styles
      elementsWithColor.forEach((el, i) => {
        if (originalStyles.has(i)) {
          el.setAttribute('style', originalStyles.get(i) || '');
        }
      });
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

  // Función para calcular posición y tamaño de la clase en el calendario
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