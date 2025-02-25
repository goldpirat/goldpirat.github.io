import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const fullName = "Flori Kusari";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (text.length < fullName.length) {
        setText(fullName.slice(0, text.length + 1));
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-navy transition-colors duration-300"
    >
      <div className="max-w-3xl text-left">
        <h1 className="text-black dark:text-white text-lg mb-4">
          Hi, my name is
        </h1>
        <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 h-[70px]">
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block ml-1"
          >
            |
          </motion.span>
        </h2>
        <h3 className="text-3xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 mb-6">
          Software Engineer.
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-xl">
          <a href="#projects" className="hover:text-teal-600 transition-colors">Projects</a> • 
          <a href="#experience" className="hover:text-teal-600 transition-colors"> Work Experience</a> • 
          <a href="#contact" className="hover:text-teal-600 transition-colors"> Contact</a>
        </p>
        <a 
          href="#projects" 
          className="inline-block px-8 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-600/10 transition-colors rounded"
        >
          Check out my work!
        </a>
      </div>
    </motion.section>
  );
};

export default Hero;
