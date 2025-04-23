import { ClassItem } from "./types";

// Interfaz para el resultado del parsing
interface ParsedEvent {
  id: number;
  name: string;
  type: string;
  day: string;
  startTime: string;
  endTime: string;
}

/**
 * Convierte un horario en formato texto a objetos de clase para el calendario
 * @param text El texto copiado y pegado del horario
 * @returns Un array de eventos parseados
 */
export const parseScheduleText = (text: string): ParsedEvent[] => {
  // Definir regex para detectar eventos (secciones que empiezan con "## N")
  const eventRegex = /## N\d+\. (.+?)(?=\n|$)([\s\S]*?)(?=## N|\n\nExportado|$)/g;
  
  // Regex para extraer datos específicos
  const nameRegex = /## N\d+\. (.+?)(?=\n|$)/;
  const typeRegex = /Tipo: (.+?)(?=\n|$)/;
  const dayRegex = /Día: (.+?)(?=\n|$)/;
  const timeRegex = /Horario: (.+?) - (.+?)(?=\n|$)/;
  
  const events: ParsedEvent[] = [];
  let match;
  let counter = 1;
  
  // Iterar sobre todos los eventos encontrados
  while ((match = eventRegex.exec(text)) !== null) {
    const fullEventText = match[0];
    
    // Extraer datos
    const nameParts = nameRegex.exec(fullEventText);
    const typeParts = typeRegex.exec(fullEventText);
    const dayParts = dayRegex.exec(fullEventText);
    const timeParts = timeRegex.exec(fullEventText);
    
    if (nameParts && dayParts && timeParts) {
      events.push({
        id: counter,
        name: nameParts[1].trim(),
        type: typeParts ? typeParts[1].trim() : "Sin tipo",
        day: dayParts[1].trim(),
        startTime: timeParts[1].trim(),
        endTime: timeParts[2].trim()
      });
      counter++;
    }
  }
  
  return events;
};

/**
 * Convierte horas en formato "HH:MM" a un número decimal
 * Por ejemplo, "13:30" se convierte en 13.5
 */
export const timeToDecimal = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

/**
 * Convierte un día de la semana a su índice correspondiente
 * El índice se basa en: Lunes = 0, Martes = 1, etc.
 */
export const dayToIndex = (day: string): number => {
  const days = {
    "Lunes": 0,
    "Martes": 1,
    "Miércoles": 2, 
    "Miercoles": 2, // Sin tilde para evitar problemas
    "Jueves": 3,
    "Viernes": 4,
    "Sábado": 5,
    "Sabado": 5 // Sin tilde
  };
  
  return days[day as keyof typeof days] ?? -1;
};

/**
 * Formatea tiempos para mostrar en la interfaz
 * Ejemplo: "14:10" a "2:10pm"
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  let period = 'am';
  let displayHour = hours;
  
  if (hours >= 12) {
    period = 'pm';
    if (hours > 12) {
      displayHour = hours - 12;
    }
  }
  
  if (hours === 0) {
    displayHour = 12;
  }
  
  return `${displayHour}:${minutes.toString().padStart(2, '0')}${period}`;
};

/**
 * Convierte los eventos parseados a objetos ClassItem para el calendario
 */
export const convertParsedEventsToClassItems = (events: ParsedEvent[]): ClassItem[] => {
  return events.map(event => {
    const dayIndex = dayToIndex(event.day);
    const startHour = timeToDecimal(event.startTime);
    const endHour = timeToDecimal(event.endTime);
    
    const formattedStartTime = formatTimeForDisplay(event.startTime);
    const formattedEndTime = formatTimeForDisplay(event.endTime);
    
    return {
      id: event.id,
      name: `${event.name} (${event.type})`,
      dayIndex,
      startHour,
      endHour,
      time: `${formattedStartTime} – ${formattedEndTime}`
    };
  }).filter(classItem => classItem.dayIndex !== -1); // Filtrar días inválidos
};