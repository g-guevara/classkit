// Este archivo contiene tipos adicionales para el renderizado del calendario
// Esta definición debería fusionarse con el archivo types.ts existente

import { DayOfWeek, ClassItem, HourMark, ThemeColors } from "./types";

// Interfaz para configurar el renderizado del calendario
export interface CalendarRenderConfig {
  // Dimensiones del canvas
  width: number;
  height: number;
  
  // Espaciado y márgenes
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  
  // Altura de los elementos
  headerHeight: number;
  hourHeight: number;
  
  // Anchura de la columna de tiempo
  timeColumnWidth: number;
  
  // Estilo del texto
  fonts: {
    title: string;
    subtitle: string;
    dayHeader: string;
    timeLabel: string;
    className: string;
    classTime: string;
  };
  
  // Estilo de las cajas de clase
  classBox: {
    cornerRadius: number;
    padding: number;
  };
}

// Configuración predeterminada para el renderizado
export const DEFAULT_RENDER_CONFIG: CalendarRenderConfig = {
  width: 1500,
  height: 1200,
  
  padding: {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  },
  
  headerHeight: 120,
  hourHeight: 60,
  timeColumnWidth: 80,
  
  fonts: {
    title: 'bold 28px Arial',
    subtitle: '16px Arial',
    dayHeader: 'bold 16px Arial',
    timeLabel: '14px Arial',
    className: 'bold 16px Arial',
    classTime: '14px Arial'
  },
  
  classBox: {
    cornerRadius: 8,
    padding: 10
  }
};

// Interfaz para los parámetros de renderizado
export interface RenderCalendarParams {
  title: string;
  subtitle: string;
  selectedColor: string;
  darkMode: boolean;
  currentTheme: ThemeColors;
  daysOfWeek: DayOfWeek[];
  hours: HourMark[];
  classes: ClassItem[];
  config?: Partial<CalendarRenderConfig>;
}