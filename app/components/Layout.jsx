// src/components/Layout.jsx
import Navbar from './NavBar';
import Footer from './Footer';

export default function Layout({ hero, children }) {
  return (
    <div>
      <Navbar />

      {/* Sección que ocupará todo el ancho si se provee */}
      {hero && (
        <div className="w-full dark:bg-gray-900">
          {hero}
        </div>
      )}

      {/* Contenedor centrado para el resto del contenido */}
      <div className="dark:bg-gray-900 flex flex-col md:flex-row md:justify-center md:space-x-8 px-4">
        {/* Columnas vacías para centrar */}
        <div className="hidden md:w-1/6"></div>
        <div className="hidden md:w-1/6"></div>

        {/* Contenedor central */}
        <div className="mt-16 w-full md:w-2/3 px-4">
          <div className="py-9">
            <main>{children}</main>
          </div>
        </div>

        <div className="hidden md:w-1/6"></div>
        <div className="hidden md:w-1/6"></div>
      </div>
      
      <Footer />
    </div>
  );
}
