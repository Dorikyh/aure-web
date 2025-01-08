// src/components/Layout.jsx
import Navbar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="dark:bg-gray-900 flex flex-col md:flex-row md:justify-center md:space-x-8 px-4">
          {/* Columna izquierda vacía para pantalla grande */}
          <div className="hidden md:w-1/6"></div>
          {/* Primera columna vacía */}
          <div className="hidden md:w-1/6"></div>
          {/* Contenedor central */}
          <div className="w-full md:w-2/3 px-4">
            <div className="py-9">
               <main>{children}</main>
            </div>
          </div>
          {/* Segunda columna vacía */}
          <div className="hidden md:w-1/6"></div>
          {/* Columna derecha vacía para pantalla grande */}
          <div className="hidden md:w-1/6"></div>
        </div>
      <Footer />
    </div>
  );
}
