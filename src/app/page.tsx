import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const courses = [
    {
      id: 1,
      title: "Ingeniería Civil en Obras Civiles",
      description: "Ingreso vía Ingeniería Civil (plan común) en ambos campus.",
      imageUrl: "/iconapps.png", 
    },
    {
      id: 2,
      title: "Ingeniería Civil en Minería",
      description: "Ingreso vía Ingeniería Civil (plan común)",
      imageUrl: "/images/mineria.jpg",
    },
    {
      id: 3,
      title: "Ingeniería en Computer Science",
      description: "Nueva carrera 2024",
      imageUrl: "/images/computer-science.jpg",
    },
    {
      id: 4,
      title: "Bachillerato de Ingeniería Civil",
      description: "Programa de un año de duración conducente a 7 carreras de ingeniería Civil y convalidación del equivalente a un semestre.",
      imageUrl: "/images/bachillerato.jpg",
    },
    {
      id: 5,
      title: "Ingeniería Civil Industrial",
      description: "Ingreso vía Ingeniería Civil (plan común) en ambos campus. Ingreso directo en Campus Viña del Mar",
      imageUrl: "/images/industrial.jpg",
    },
  ];

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
      <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
        <Image 
  src= "/5tgb6yhn7ujm.png"
  alt="Campus banner" 
  fill 
  style={{ objectFit: "cover" }}
  priority
/>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-10 left-8 md:left-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Apps y webs alumnos</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-6 md:px-16 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700">
          Destácate como estudiante desarrollando una aplicación o página web que tenga un impacto positivo en nuestra comunidad. Esta es tu oportunidad de aplicar tus conocimientos, demostrar tu creatividad y generar un cambio real en el entorno que te rodea. AGREGA TU APP AQUI
          </p>
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

      {/* Careers Section */}
      <div className="px-6 md:px-16 pb-16">
        <div className="mb-4">
          <h2 className="text-3xl font-bold inline">Conoce</h2>
          <span className="text-3xl text-gray-600 ml-2">nuestras apps</span>
        </div>
        <hr className="border-t border-gray-200 mb-8" />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="h-[150px] relative">
                <Image 
                  src={course.imageUrl} 
                  alt={course.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <Link 
                  href={`/courses/${course.id}`} 
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