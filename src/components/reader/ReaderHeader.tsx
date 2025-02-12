
import { Link } from "react-router-dom";
import { ChevronLeft, Menu, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ReaderHeaderProps {
  currentPage: number;
  totalPages: number;
  isDarkMode: boolean;
  isHeaderSticky: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
}

export const ReaderHeader = ({
  currentPage,
  totalPages,
  isDarkMode,
  isHeaderSticky,
  toggleSidebar,
  toggleDarkMode,
}: ReaderHeaderProps) => {
  return (
    <header 
      className={`${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-gray-100 border-gray-200'
      } border-b py-2 px-4 flex items-center justify-between transition-colors duration-200 ${
        isHeaderSticky ? 'sticky top-0 z-50' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleDarkMode}
        className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>
    </header>
  );
};
