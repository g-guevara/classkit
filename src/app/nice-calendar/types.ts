// Types and interfaces for the calendar component

export interface DayOfWeek {
    abbr: string;
    full: string;
    date: string;
  }
  
  export interface ClassItem {
    id: number;
    name: string;
    dayIndex: number;
    startHour: number;
    endHour: number;
    time: string;
  }
  
  export interface HourMark {
    hour: number;
    display: string;
  }
  
  export interface ThemeColors {
    background: string;
    text: string;
    panel: string;
    border: string;
    grid: string;
    hourText: string;
  }
  
  export const THEMES = {
    dark: {
      background: "#000000",
      text: "#ffffff",
      panel: "#27272a",
      border: "#3f3f46",
      grid: "#333333", // Lighter gray for grid lines
      hourText: "#9ca3af"
    },
    light: {
      background: "#ffffff",
      text: "#000000",
      panel: "#f3f4f6",
      border: "#d1d5db",
      grid: "#e5e7eb", // Light gray for grid lines
      hourText: "#6b7280"
    }
  };
  
  // Helper functions
  
  // Calculate text color based on background color (darker version)
  export const getTextColor = (hexColor: string): string => {
    // Remove the # if present
    const color = hexColor.charAt(0) === '#' ? hexColor.substring(1) : hexColor;
    
    // Parse the hex color to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    // Make it darker (multiply by 0.6)
    const darkR = Math.floor(r * 0.6);
    const darkG = Math.floor(g * 0.6);
    const darkB = Math.floor(b * 0.6);
    
    // Convert back to hex
    return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
  };
  
  // Default data
  
  // Definición de datos para el calendario
  export const DEFAULT_DAYS_OF_WEEK: DayOfWeek[] = [
    { abbr: 'LUN', full: 'Lunes', date: '21' },
    { abbr: 'MAR', full: 'Martes', date: '22' },
    { abbr: 'MIÉ', full: 'Miércoles', date: '23' },
    { abbr: 'JUE', full: 'Jueves', date: '24' },
    { abbr: 'VIE', full: 'Viernes', date: '25' },
    { abbr: 'SÁB', full: 'Sábado', date: '26' }
  ];
  
  // Horas para la primera columna
  export const DEFAULT_HOURS: HourMark[] = [
    { hour: 7, display: '7 AM' },
    { hour: 8, display: '8 AM' },
    { hour: 9, display: '9 AM' },
    { hour: 10, display: '10 AM' },
    { hour: 11, display: '11 AM' },
    { hour: 12, display: '12 PM' },
    { hour: 13, display: '1 PM' },
    { hour: 14, display: '2 PM' },
    { hour: 15, display: '3 PM' },
    { hour: 16, display: '4 PM' },
    { hour: 17, display: '5 PM' },
    { hour: 18, display: '6 PM' },
    { hour: 19, display: '7 PM' },
    { hour: 20, display: '8 PM' }
  ];
  
  // Default classes
  export const DEFAULT_CLASSES: ClassItem[] = [
    { 
      id: 1, 
      name: 'Sys Inf', 
      dayIndex: 0, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 2, 
      name: 'Sys Inf', 
      dayIndex: 0, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 3, 
      name: 'Liderazgo', 
      dayIndex: 0, 
      startHour: 11.5, 
      endHour: 12.67, 
      time: '11:30am – 12:40pm' 
    },
    { 
      id: 4, 
      name: 'Liderazgo', 
      dayIndex: 0, 
      startHour: 13, 
      endHour: 14.17, 
      time: '1 – 2:10pm' 
    },
    { 
      id: 5, 
      name: 'Economía', 
      dayIndex: 1, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 6, 
      name: 'haccer recuadro de settings arriba', 
      dayIndex: 1, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 7, 
      name: 'asegurar el flujo del telefono tambien', 
      dayIndex: 1, 
      startHour: 11.33, 
      endHour: 12.5, 
      time: '11:20am – 12:50pm' 
    },
    { 
      id: 8, 
      name: 'falta esconder nombres', 
      dayIndex: 1, 
      startHour: 13, 
      endHour: 14.25, 
      time: '1 – 2:15pm' 
    },
    { 
      id: 9, 
      name: 'q hago con los colores', 
      dayIndex: 2, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 10, 
      name: 'poner nombre usuario', 
      dayIndex: 2, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 11, 
      name: 'armar el cipypaste ideal de missalas', 
      dayIndex: 3, 
      startHour: 8.5, 
      endHour: 9.75, 
      time: '8:30 – 9:45am' 
    },
    { 
      id: 12, 
      name: 'Sys Arq', 
      dayIndex: 3, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    }
  ];