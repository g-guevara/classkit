import { DayOfWeek, ClassItem, HourMark, ThemeColors } from "./types";

interface CalendarRenderProps {
  title: string;
  subtitle: string;
  selectedColor: string;
  darkMode: boolean;
  currentTheme: ThemeColors;
  daysOfWeek: DayOfWeek[];
  hours: HourMark[];
  classes: ClassItem[];
}

// Helper function to draw rounded rectangle for class boxes
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
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

// Helper function to truncate text with ellipsis if it's too long
const truncateText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string => {
  const ellipsis = '...';
  let textWidth = ctx.measureText(text).width;
  
  if (textWidth <= maxWidth) {
    return text;
  }
  
  let truncated = '';
  
  // Try to fit as much text as possible
  for (let i = 0; i < text.length; i++) {
    let testText = text.substring(0, i) + ellipsis;
    if (ctx.measureText(testText).width > maxWidth) {
      break;
    }
    truncated = testText;
  }
  
  return truncated;
};

export const renderCalendarToCanvas = (props: CalendarRenderProps): HTMLCanvasElement => {
  const {
    title,
    subtitle,
    selectedColor,
    darkMode,
    currentTheme,
    daysOfWeek,
    hours,
    classes
  } = props;
  
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
  ctx.textAlign = 'left';
  ctx.fillText(title, 40, 50);
  
  ctx.fillStyle = darkMode ? "#9ca3af" : "#6b7280";
  ctx.font = '16px Arial';
  ctx.fillText(subtitle, 40, 80);
  
  // Constants for drawing
  const headerHeight = 120;
  const hourHeight = 60;
  const timeColumnWidth = 80;
  const contentWidth = calendarWidth - timeColumnWidth;
  const dayColumnWidth = contentWidth / daysOfWeek.length;
  
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
  
  // Draw classes - with improved text handling
  classes.forEach(classItem => {
    const dayIndex = classItem.dayIndex;
    const startHour = classItem.startHour - 7; // Adjusting to 0-based index
    const endHour = classItem.endHour - 7;
    
    const x = timeColumnWidth + (dayIndex * dayColumnWidth) + 6;
    const y = headerHeight + (startHour * hourHeight) + 3;
    const width = dayColumnWidth - 12;
    const height = (endHour - startHour) * hourHeight - 6;
    
    // Draw class box with more padding for text
    ctx.fillStyle = classItem.color || selectedColor;
    drawRoundedRect(ctx, x, y, width, height, 8, true, false);
    
    // Calculate text padding
    const textPadding = 10;
    const maxTextWidth = width - (textPadding * 2);
    
    // Draw class name with truncation if needed
    ctx.fillStyle = '#000000'; // Black text for contrast
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    
    const className = classItem.name;
    const displayName = truncateText(ctx, className, maxTextWidth);
    
    // Position text with proper padding - ensure it's not too close to edges
    ctx.fillText(displayName, x + textPadding, y + 25);
    
    // Draw class time - make sure it fits too
    ctx.font = '14px Arial';
    const timeText = truncateText(ctx, classItem.time, maxTextWidth);
    ctx.fillText(timeText, x + textPadding, y + 50);
  });
  
  return canvas;
};