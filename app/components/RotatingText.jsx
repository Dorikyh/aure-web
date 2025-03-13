import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  "set autopost",
  "get mc stats",
  "get waifu pics",
  "browse Rule34",
  "save posts",
  "get songs lyrics",
  "get songs meaning",
  "get books info",
  "chat with Gemini",
  "get reddit memes",
  "get NASA photos",
  "get animals pics",
  "get rankings",
  "get mc skins",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5); // Estado para lineHeight

  // Efecto para detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      setLineHeight(isDesktop ? 1 : 1.5);
    };
    
    handleResize(); // Configurar inicialmente
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{ 
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'bottom',
      lineHeight: lineHeight // Line-height dinámico
    }}>
      {/* Texto fantasma */}
      <span style={{ 
        visibility: 'hidden', 
        whiteSpace: 'nowrap',
        display: 'inline-block'
      }}>
        {texts.reduce((a, b) => a.length > b.length ? a : b)}
      </span>
      
      <AnimatePresence mode='wait'>
        <motion.span
          key={index}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 120, damping: 15 }
          }}
          exit={{ 
            y: '30%',
            opacity: 0,
            transition: { 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            } 
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            whiteSpace: 'nowrap',
            color: '#FACC15',
            lineHeight: 'inherit' // Hereda del contenedor padre
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}