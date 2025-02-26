import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile'; // Adjust the path if needed

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const isMobile = useIsMobile(); // Use the hook

  useEffect(() => {
    if (isMobile) return; // Don't add mousemove listener on mobile

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [isMobile]);

  if (isMobile) {
    return null; // Don't render cursor on mobile
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
