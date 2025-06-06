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
  DEFAULT_CLASSES
} from "./types";
import NiceCalendar from "./NiceCalendar";
import { renderCalendarToCanvas } from "./CalendarRender";
import { parseScheduleText, convertParsedEventsToClassItems } from "./pasteScheduleParser";

export const NiceCalendarContainer = () => {
  // State for title, subtitle, color and theme
  const [title, setTitle] = useState("Mi Horario de Clases");
  const [subtitle, setSubtitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6"); // Default blue color
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteValue, setPasteValue] = useState("");
  
  // Create refs with proper typing
  const calendarRef = useRef<HTMLDivElement>(null);
  const fullCalendarRef = useRef<HTMLDivElement>(null);

  // Get current theme
  const currentTheme: ThemeColors = darkMode ? THEMES.dark : THEMES.light;

  // State for days, hours, and classes
  const [daysOfWeek] = useState<DayOfWeek[]>(DEFAULT_DAYS_OF_WEEK);
  const [hours] = useState<HourMark[]>(DEFAULT_HOURS);
  const [classes, setClasses] = useState<ClassItem[]>(DEFAULT_CLASSES);

  // Display a welcome message if no classes are present
  const handleOpenPasteModal = useCallback(() => {
    // Evitar que cualquier otro evento se propague
    setShowPasteModal(true);
  }, []);

  const handleClosePasteModal = useCallback(() => {
    setShowPasteModal(false);
    setPasteValue("");
  }, []);

  const handlePasteSchedule = useCallback(() => {
    if (!pasteValue.trim()) {
      handleClosePasteModal();
      return;
    }
    
    try {
      // Parsear el texto pegado
      const parsedEvents = parseScheduleText(pasteValue);
      // Convertir a formato de clase para el calendario
      const newClassItems = convertParsedEventsToClassItems(parsedEvents);
      
      if (newClassItems.length > 0) {
        setClasses(newClassItems);
      } else {
        alert('No se pudieron encontrar eventos en el texto pegado. Asegúrate de pegar el formato correcto.');
      }
    } catch (error) {
      console.error("Error procesando el horario pegado:", error);
      alert('Error al procesar el horario. Verifica el formato.');
    }
    
    handleClosePasteModal();
  }, [pasteValue, handleClosePasteModal]);

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
    link.download = `${title || 'horario'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Mostrar mensaje informativo
    showDownloadInstructions();
  };

  // Handle download usando Web Share API con fallback
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
      
      // Verificar si el dispositivo soporta Web Share API
      if (navigator.share && navigator.canShare) {
        // Convertir canvas a blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${title || 'horario'}.png`, {
              type: 'image/png'
            });
            
            const shareData = {
              title: title || 'Mi Horario de Clases',
              text: 'Mi horario de clases',
              files: [file]
            };
            
            // Verificar si se puede compartir el archivo
            if (navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
                return; // Salir si el compartir fue exitoso
              } catch {
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
    <>
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
        calendarRef={calendarRef as React.RefObject<HTMLDivElement>}
        fullCalendarRef={fullCalendarRef as React.RefObject<HTMLDivElement>}
        handleOpenPasteModal={handleOpenPasteModal}
      />
      
      {/* Modal para pegar horario */}
      {showPasteModal && (
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
              padding: '1.5rem',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              color: currentTheme.text
            }}
            onClick={(e) => e.stopPropagation()} // Evitar que los clics dentro del modal se propaguen
          >
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Pegar Horario</h2>
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
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: `1px solid ${currentTheme.border}`,
                  backgroundColor: 'transparent',
                  color: currentTheme.text
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handlePasteSchedule}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none'
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

export default NiceCalendarContainer;