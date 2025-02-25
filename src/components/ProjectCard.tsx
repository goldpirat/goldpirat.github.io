import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  stars: number;
  url: string;
  homepage?: string;
  language?: string;
}

const ProjectCard = ({ name, description, stars, url, homepage, language }: ProjectCardProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        className="bg-white dark:bg-navy p-6 rounded-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <div className="flex gap-4">
            <Github size={20} className="text-gray-700 dark:text-gray-300 hover:text-teal-600" />
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">{stars}</span>
          </div>
          {language && (
            <span className="text-teal-600 text-sm">{language}</span>
          )}
        </div>
      </motion.div>
    </a>
  );
};

export default ProjectCard;
