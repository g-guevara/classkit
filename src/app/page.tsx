"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "Horario en común",
      description: "Encuentra espacios en común con otro alumno.",
      imageUrl: "/people.png",
      author: "Extención app Mis Salas",
      link: "/horario-comun" 
    },
    {
      id: 2,
      title: "Horaio de clases",
      description: "Comparte tu horario personalizando.",
      imageUrl: "/week.png",
      author: "Extención app Mis Salas",
      link: "/nice-calendar" // URL personalizada
    },

    {
      id: 3,
      title: "Extención Google Calendar",
      description: "Extensión de Mis Salas para Google Calendar",
      imageUrl: "/gg6.png",
      author: "Extención app Mis Salas",
      link: "/g-calendar" // URL personalizada
    },

    {
      id: 4,
      title: "Campus Google Maps",
      description: "Explora los campus con Google Maps.",
      imageUrl: "/gmp.png",
      author: "Joaquín Arriagada",
      link: "/gmp.png" // URL personalizada
    },

    {
      id: 5,
      title: "Merchandaising",
      description: "Compra polerones, poleras, botellas y mas.",
      imageUrl: "/mch.png",
      author: "Diego Martínez",
      link: "/civil-industrial" // URL personalizada
    },
  ];

  // Filtrar cursos basados en el término de búsqueda (título o autor)
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define la imagen del hero banner
  const heroBanner = {
    imageUrl: "/vkh2.jpg",
    title: "Apps y webs alumnos"
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Hero Banner */}
      <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden bg-black">
        <div className="h-full w-full relative">
          <Image 
            src={heroBanner.imageUrl} 
            alt="Banner principal"
            width={1920}
            height={600}
            className="w-full h-full object-cover opacity-80"
            priority
          />
        </div>
        <div className="absolute bottom-10 left-8 md:left-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold">{heroBanner.title}</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-6 md:px-16 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 mb-4">
            Destácate como estudiante desarrollando una aplicación o página web que tenga un impacto positivo en nuestra comunidad. Esta es tu oportunidad de aplicar tus conocimientos, demostrar tu creatividad y generar un cambio real en el entorno que te rodea.
          </p>
          {/* Botón "AGREGA TU APP" - rectangular, sin bordes redondeados, sin sombra, celeste */}
          <Link 
            href="/agregar-app" 
            className="inline-block bg-[#3498db] text-white font-bold py-3 px-6 border-0 rounded-none hover:bg-[#2980b9] transition-colors"
          >
            AGREGA TU APP
          </Link>
        </div>
        <div>
          <button className="w-full bg-black text-white p-6 flex justify-between items-center group transition-all hover:bg-gray-800">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">IdeaLink</h3>
              <p className="text-sm text-gray-300">
                Blog para vinculación de estudiantes y ideas: arma tu equipo de distintas carreras y logra llevar a cabo tu proyecto.
              </p>
            </div>
            <div className="ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Apps Section with Search */}
      <div className="px-6 md:px-16 pb-16">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold inline">Conoce</h2>
            <span className="text-3xl text-gray-600 ml-2">nuestras apps</span>
          </div>
          
          {/* Barra de búsqueda */}
          <div className="mt-4 md:mt-0 w-full md:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título o autor..."
                className="w-full p-3 pl-10 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        
        <hr className="border-t border-gray-200 mb-8" />

        {/* Mostrar mensaje cuando no hay resultados */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron apps que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* Courses Grid - Con fotos de app más pequeñas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 relative">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border border-gray-300  overflow-hidden">
              {/* Contenedor de imagen con padding mayor para hacer que la imagen sea más pequeña */}
              <div className="h-40 relative p-4 bg-gray-50 flex items-center justify-center">
                <div className="w-28 h-28 relative rounded-3xl overflow-hidden shadow-md border border-gray-200">
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              
              {/* El resto mantiene el estilo original */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-400 italic mb-2">Por: {course.author}</p>             
                <p className="text-sm text-gray-600 mb-2">{course.description}</p>

                <Link 
                  href={course.link} 
                  className="text-blue-500 font-medium text-sm inline-block"
                >
                  SABER +
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}