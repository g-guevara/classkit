"use client";

import { useState, useRef, useCallback } from "react";
import { 
  DayOfWeek, 
  ClassItem, 
  HourMark, 
  ThemeColors,
  THEMES,
  DEFAULT_DAYS_OF_WEEK,
  DEFAULT_HOURS,
} from "../nice-calendar/types";
import HorarioComun from "./HorarioComun";
import { renderCalendarToCanvas } from "../nice-calendar/CalendarRender";
import { parseScheduleText, convertParsedEventsToClassItems } from "../nice-calendar/pasteScheduleParser";

// Define a type for the schedule data
interface ScheduleData {
  isLoaded: boolean;
  classes: ClassItem[];
}

export const HorarioComunContainer = () => {
  // State for title, subtitle and theme
  const [title, setTitle] = useState("Horario en Común");
  const [subtitle, setSubtitle] = useState("Comparación de horarios de clases");
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  
  // Define fixed colors for each schedule
  const scheduleColors = ["#3B82F6", "#FFE135", "#8B5CF6"];
  
  // State for each schedule
  const [schedules, setSchedules] = useState<ScheduleData[]>([
    { isLoaded: false, classes: [] },
    { isLoaded: false, classes: [] },
    { isLoaded: false, classes: [] }
  ]);
  
  // State for modals
  const [activePasteIndex, setActivePasteIndex] = useState<number | null>(null);
  const [pasteValue, setPasteValue] = useState("");
  
  // Create refs with proper typing
  const calendarRef = useRef<HTMLDivElement>(null);
  const fullCalendarRef = useRef<HTMLDivElement>(null);

  // Get current theme
  const currentTheme: ThemeColors = darkMode ? THEMES.dark : THEMES.light;

  // State for days and hours
  const [daysOfWeek] = useState<DayOfWeek[]>(DEFAULT_DAYS_OF_WEEK);
  const [hours] = useState<HourMark[]>(DEFAULT_HOURS);

  // Computed classes that combine all schedules
  const combinedClasses = schedules.flatMap(schedule => schedule.classes);

  // Find common time slots (classes that overlap)
  const commonTimeSlots = findCommonTimeSlots(schedules);

  // Open paste modal for a specific schedule
  const handleOpenPasteModal = useCallback((index: number) => {
    setActivePasteIndex(index);
    setPasteValue("");
  }, []);

  // Close paste modal
  const handleClosePasteModal = useCallback(() => {
    setActivePasteIndex(null);
    setPasteValue("");
  }, []);

  // Handle pasting schedule text
  const handlePasteSchedule = useCallback(() => {
    if (activePasteIndex === null || !pasteValue.trim()) {
      handleClosePasteModal();
      return;
    }
    
    try {
      // Parse the pasted text
      const parsedEvents = parseScheduleText(pasteValue);
      // Convert to class items
      const newClassItems = convertParsedEventsToClassItems(parsedEvents);
      
      if (newClassItems.length > 0) {
        // Update the specific schedule
        setSchedules(prev => {
          const updated = [...prev];
          updated[activePasteIndex] = {
            isLoaded: true,
            classes: newClassItems
          };
          return updated;
        });
      } else {
        alert('No se pudieron encontrar eventos en el texto pegado. Asegúrate de pegar el formato correcto.');
      }
    } catch (error) {
      console.error("Error procesando el horario pegado:", error);
      alert('Error al procesar el horario. Verifica el formato.');
    }
    
    handleClosePasteModal();
  }, [activePasteIndex, pasteValue, handleClosePasteModal]);

  // Función para mostrar instrucciones al usuario
  const showDownloadInstructions = () => {
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      alert(
        'La imagen se ha descargado a tu carpeta de Descargas.\n\n' +
        'Para guardarla en tu galería:\n' +
        '• Abre la app Archivos/Descargas\n' +
        '• Busca el archivo descargado\n' +
        '• Tócalo y selecciona "Guardar en Galería" o "Compartir"'
      );
    }
  };

  // Función de descarga tradicional como fallback
  const fallbackDownload = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `${title || 'horario-comun'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Mostrar mensaje informativo
    showDownloadInstructions();
  };

  // Handle download usando Web Share API con fallback
  const handleDownload = async () => {
    try {
      // Create a new array of classes with proper colors assigned
      const coloredClasses = schedules.flatMap((schedule, scheduleIndex) => 
        schedule.classes.map(classItem => {
          // Check if this time slot is common
          const isCommonTimeSlot = isClassInCommonSlots(classItem, commonTimeSlots);
          
          return {
            ...classItem,
            color: isCommonTimeSlot ? "#10B981" : scheduleColors[scheduleIndex],
            id: `${scheduleIndex}-${classItem.id}`, // Ensure unique IDs
          };
        })
      );
      
      // Create canvas and render calendar on it
      const canvas = renderCalendarToCanvas({
        title: title || "Horario en Común",
        subtitle: subtitle || "Comparación de horarios de clases",
        selectedColor: "#3B82F6", // Default color fallback
        darkMode,
        currentTheme,
        daysOfWeek,
        hours,
        classes: coloredClasses
      });
      
      // Verificar si el dispositivo soporta Web Share API
      if (navigator.share && navigator.canShare) {
        // Convertir canvas a blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${title || 'horario-comun'}.png`, {
              type: 'image/png'
            });
            
            const shareData = {
              title: title || 'Horario en Común',
              text: 'Mi horario de clases',
              files: [file]
            };
            
            // Verificar si se puede compartir el archivo
            if (navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
                return; // Salir si el compartir fue exitoso
              } catch (shareError) {
                console.log('Compartir cancelado por el usuario');
                // Continuar con descarga tradicional como fallback
              }
            }
          }
          
          // Fallback a descarga tradicional
          fallbackDownload(canvas);
        }, 'image/png');
      } else {
        // Fallback para navegadores que no soportan Web Share API
        fallbackDownload(canvas);
      }
      
    } catch (error) {
      console.error('Error generating calendar image:', error);
      alert('No se pudo procesar la imagen. Intente de nuevo más tarde.');
    }
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Calculate position and size of classes in the calendar
  const getClassStyle = (classItem: ClassItem, scheduleIndex?: number) => {
    const hourHeight = 60; // Height of an hour in px
    const startPosition = (classItem.startHour - 7) * hourHeight;
    const duration = (classItem.endHour - classItem.startHour) * hourHeight;
    
    // Check if this time slot is common
    const isCommonTimeSlot = isClassInCommonSlots(classItem, commonTimeSlots);
    
    // If scheduleIndex is undefined but class ID contains a scheduleIndex, extract it
    let effectiveScheduleIndex = scheduleIndex;
    if (effectiveScheduleIndex === undefined && typeof classItem.id === 'string') {
      const match = classItem.id.match(/^(\d+)-/);
      if (match) {
        effectiveScheduleIndex = parseInt(match[1]);
      }
    }
    
    return {
      top: `${startPosition}px`,
      height: `${duration}px`,
      left: `0`,
      right: `0`,
      backgroundColor: isCommonTimeSlot ? "#10B981" : (effectiveScheduleIndex !== undefined ? scheduleColors[effectiveScheduleIndex] : "#3B82F6"),
      opacity: isCommonTimeSlot ? 1 : 0.7,
    };
  };

  // Pass all needed props to the presentation component
  return (
    <>
      <HorarioComun
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        scheduleColors={scheduleColors}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        handleDownload={handleDownload}
        currentTheme={currentTheme}
        daysOfWeek={daysOfWeek}
        hours={hours}
        schedules={schedules}
        getClassStyle={getClassStyle}
        calendarRef={calendarRef as React.RefObject<HTMLDivElement>}
        fullCalendarRef={fullCalendarRef as React.RefObject<HTMLDivElement>}
        handleOpenPasteModal={handleOpenPasteModal}
      />
      
      {/* Modal para pegar horario */}
      {activePasteIndex !== null && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={(e) => {
            // Cerrar el modal solo si se hace clic en el fondo oscuro
            if (e.target === e.currentTarget) {
              handleClosePasteModal();
            }
          }}
        >
          <div 
            style={{
              backgroundColor: currentTheme.background,
              borderRadius: '0.5rem',
              padding: '1rem',
              width: '95%',
              maxWidth: '600px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              color: currentTheme.text
            }}
            onClick={(e) => e.stopPropagation()} // Evitar que los clics dentro del modal se propaguen
          >
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
              Pegar Horario {activePasteIndex + 1}
            </h2>
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>
              Pega el texto de tu horario exportado desde la app Mis Salas, en formato "MIS EVENTOS".
            </p>
            
            <textarea
              style={{
                width: '100%',
                height: '200px',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                border: `1px solid ${currentTheme.border}`,
                backgroundColor: currentTheme.background,
                color: currentTheme.text,
                resize: 'vertical',
                marginBottom: '1rem'
              }}
              value={pasteValue}
              onChange={(e) => setPasteValue(e.target.value)}
              placeholder="MIS EVENTOS..."
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={handleClosePasteModal}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.25rem',
                  border: `1px solid ${currentTheme.border}`,
                  backgroundColor: 'transparent',
                  color: currentTheme.text,
                  fontSize: '0.9rem'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handlePasteSchedule}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.25rem',
                  backgroundColor: scheduleColors[activePasteIndex || 0],
                  color: 'white',
                  border: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to find common time slots across schedules
function findCommonTimeSlots(schedules: ScheduleData[]): ClassItem[] {
  // Filter out schedules without classes
  const activeSchedules = schedules.filter(schedule => schedule.isLoaded && schedule.classes.length > 0);
  
  // If less than 2 active schedules, there are no common slots
  if (activeSchedules.length < 2) return [];
  
  const commonSlots: ClassItem[] = [];
  
  // Create a map of day/time combinations that appear in all active schedules
  const dayTimeMap = new Map<string, number>();
  
  // Count occurrences of each time slot
  activeSchedules.forEach(schedule => {
    const seen = new Set<string>(); // To avoid counting duplicate slots in the same schedule
    
    schedule.classes.forEach(classItem => {
      // Create a key for each 30-minute block this class occupies
      for (let time = classItem.startHour; time < classItem.endHour; time += 0.5) {
        const key = `${classItem.dayIndex}-${time}`;
        if (!seen.has(key)) {
          seen.add(key);
          dayTimeMap.set(key, (dayTimeMap.get(key) || 0) + 1);
        }
      }
    });
  });
  
  // Find keys that appear in all active schedules
  const commonKeys = Array.from(dayTimeMap.entries())
    .filter(([_, count]) => count === activeSchedules.length)
    .map(([key]) => key);
  
  // Group consecutive time slots by day
  const groupedByDay = new Map<number, number[]>();
  
  commonKeys.forEach(key => {
    const [day, time] = key.split('-').map(Number);
    if (!groupedByDay.has(day)) {
      groupedByDay.set(day, []);
    }
    groupedByDay.get(day)?.push(time);
  });
  
  // Convert grouped time slots to ClassItems
  let id = 1;
  groupedByDay.forEach((times, dayIndex) => {
    // Sort times
    times.sort((a, b) => a - b);
    
    // Find consecutive blocks
    let startTime = times[0];
    let currentTime = startTime;
    
    for (let i = 1; i <= times.length; i++) {
      const nextTime = times[i];
      
      if (nextTime !== currentTime + 0.5 || i === times.length) {
        // End of a block, create a ClassItem
        commonSlots.push({
          id: `common-${dayIndex}-${startTime}`, // Create a truly unique ID
          name: "Horario en común",
          dayIndex,
          startHour: startTime,
          endHour: currentTime + 0.5,
          time: formatTimeRange(startTime, currentTime + 0.5)
        });
        
        if (i < times.length) {
          startTime = nextTime;
        }
      }
      
      currentTime = nextTime;
    }
  });
  
  return commonSlots;
}

// Helper to format time range for display
function formatTimeRange(startHour: number, endHour: number): string {
  const formatHour = (hour: number) => {
    const intHour = Math.floor(hour);
    const minutes = Math.round((hour - intHour) * 60);
    const period = intHour >= 12 ? 'pm' : 'am';
    const displayHour = intHour > 12 ? intHour - 12 : (intHour === 0 ? 12 : intHour);
    return `${displayHour}:${minutes.toString().padStart(2, '0')}${period}`;
  };
  
  return `${formatHour(startHour)} – ${formatHour(endHour)}`;
}

// Helper to check if a class is in the common time slots
function isClassInCommonSlots(classItem: ClassItem, commonSlots: ClassItem[]): boolean {
  return commonSlots.some(commonSlot => 
    commonSlot.dayIndex === classItem.dayIndex &&
    Math.max(commonSlot.startHour, classItem.startHour) < Math.min(commonSlot.endHour, classItem.endHour)
  );
}

export default HorarioComunContainer;