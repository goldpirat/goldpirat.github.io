
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 rounded-xl max-w-md w-full text-center"
      >
        <motion.h1 
          className="gradient-text text-8xl font-bold mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          404
        </motion.h1>
        <h2 className="text-2xl text-white mb-6">Oops! Page not found</h2>
        <p className="text-slate mb-8">
          The page you're looking for seems to have wandered off into the digital void.
          Let's get you back to familiar territory.
        </p>
        <a 
          href="/" 
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-teal to-[#64D6FF] text-navy font-semibold hover:opacity-90 transition-opacity"
        >
          Return Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
