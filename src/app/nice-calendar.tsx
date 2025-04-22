"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Definición de interfaces para TypeScript
interface DayOfWeek {
  abbr: string;
  full: string;
  date: string;
}

interface ClassItem {
  id: number;
  name: string;
  color: string;
  textColor: string;
  dayIndex: number;
  startHour: number;
  endHour: number;
  time: string;
}

interface HourMark {
  hour: number;
  display: string;
}

export default function NiceCalendar() {
  // Definición de datos para el calendario
  const daysOfWeek: DayOfWeek[] = [
    { abbr: 'LUN', full: 'Lunes', date: '21' },
    { abbr: 'MAR', full: 'Martes', date: '22' },
    { abbr: 'MIÉ', full: 'Miércoles', date: '23' },
    { abbr: 'JUE', full: 'Jueves', date: '24' },
    { abbr: 'VIE', full: 'Viernes', date: '25' },
    { abbr: 'SÁB', full: 'Sábado', date: '26' }
  ];

  // Definición de clases
  const classes: ClassItem[] = [
    { 
      id: 1, 
      name: 'Sys Inf', 
      color: 'bg-blue-200',
      textColor: 'text-blue-800',
      dayIndex: 0, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 2, 
      name: 'Sys Inf', 
      color: 'bg-blue-200',
      textColor: 'text-blue-800',
      dayIndex: 0, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 3, 
      name: 'Liderazgo', 
      color: 'bg-blue-200',
      textColor: 'text-blue-800',
      dayIndex: 0, 
      startHour: 11.5, 
      endHour: 12.67, 
      time: '11:30am – 12:40pm' 
    },
    { 
      id: 4, 
      name: 'Liderazgo', 
      color: 'bg-blue-200',
      textColor: 'text-blue-800',
      dayIndex: 0, 
      startHour: 13, 
      endHour: 14.17, 
      time: '1 – 2:10pm' 
    },
    { 
      id: 5, 
      name: 'Economía', 
      color: 'bg-green-200',
      textColor: 'text-green-800',
      dayIndex: 1, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 6, 
      name: 'Economía', 
      color: 'bg-green-200',
      textColor: 'text-green-800',
      dayIndex: 1, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 7, 
      name: 'Lab Info', 
      color: 'bg-red-200',
      textColor: 'text-red-800',
      dayIndex: 1, 
      startHour: 11.33, 
      endHour: 12.5, 
      time: '11:20am – 12:50pm' 
    },
    { 
      id: 8, 
      name: 'A. Eco', 
      color: 'bg-green-200',
      textColor: 'text-green-800',
      dayIndex: 1, 
      startHour: 13, 
      endHour: 14.25, 
      time: '1 – 2:15pm' 
    },
    { 
      id: 9, 
      name: 'Progra P', 
      color: 'bg-purple-200',
      textColor: 'text-purple-800',
      dayIndex: 2, 
      startHour: 8.5, 
      endHour: 9.67, 
      time: '8:30 – 9:40am' 
    },
    { 
      id: 10, 
      name: 'Progra P', 
      color: 'bg-purple-200',
      textColor: 'text-purple-800',
      dayIndex: 2, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    },
    { 
      id: 11, 
      name: 'Sys Arq', 
      color: 'bg-yellow-200',
      textColor: 'text-yellow-800',
      dayIndex: 3, 
      startHour: 8.5, 
      endHour: 9.75, 
      time: '8:30 – 9:45am' 
    },
    { 
      id: 12, 
      name: 'Sys Arq', 
      color: 'bg-yellow-200',
      textColor: 'text-yellow-800',
      dayIndex: 3, 
      startHour: 10, 
      endHour: 11.17, 
      time: '10 – 11:10am' 
    }
  ];

  // Horas para la primera columna
  const hours: HourMark[] = [
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

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header - Copiado de page.tsx */}
      <header className="bg-[#1a1a1a] text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
        
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <button className="flex items-center text-white">
              <span className="mr-2">BUSCA AQUÍ</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Calendar Container */}
      <div className="flex-1 bg-black text-white p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mi Horario de Clases</h1>
          <p className="text-gray-400">Semestre 1, 2025 • GMT-04</p>
        </div>

        {/* Calendar Grid */}
        <div className="relative overflow-x-auto">          
          <div className="flex">
            {/* Time column */}
            <div className="w-16 flex-shrink-0">
              <div className="h-16 flex items-end justify-center font-semibold text-gray-500">
                GMT-04
              </div>
              
              {/* Time labels */}
              {hours.map(hour => (
                <div key={hour.hour} className="h-[60px] flex items-center justify-center border-t border-gray-800">
                  <span className="text-sm text-gray-500">{hour.display}</span>
                </div>
              ))}
            </div>
            
            {/* Days columns */}
            {daysOfWeek.map((day, index) => (
              <div key={index} className="flex-1 min-w-[120px]">
                {/* Day header */}
                <div className="h-16 flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">{day.abbr}</div>
                  <div className={`text-2xl font-bold ${index === 0 ? 'bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center' : ''}`}>
                    {day.date}
                  </div>
                </div>
                
                {/* Grid cells for each hour */}
                <div className="relative">
                  {hours.map(hour => (
                    <div key={hour.hour} className="h-[60px] border-t border-gray-800"></div>
                  ))}
                  
                  {/* Classes */}
                  {classes
                    .filter(classItem => classItem.dayIndex === index)
                    .map(classItem => (
                      <div
                        key={classItem.id}
                        className={`absolute p-2 ${classItem.color} ${classItem.textColor} rounded-sm mx-1 overflow-hidden`}
                        style={getClassStyle(classItem)}
                      >
                        <div className="text-sm font-semibold">{classItem.name}</div>
                        <div className="text-xs">{classItem.time}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}