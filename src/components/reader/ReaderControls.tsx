import { motion } from "framer-motion";
import { 
  BookMarked, 
  AlertTriangle, 
  MonitorUp, 
  LayoutTemplate, 
  MoveHorizontal, 
  ArrowDownToLine,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReaderControlsProps {
  currentPage: number;
  bookmarks: number[];
  isDarkMode: boolean;
  isHeaderSticky: boolean;
  viewMode: 'default' | 'longStrip' | 'fitBoth';
  toggleBookmark: (page: number) => void;
  toggleHeaderSticky: () => void;
  changeViewMode: (mode: 'default' | 'longStrip' | 'fitBoth') => void;
  goToLastReadPage: () => void;
}

export const ReaderControls = ({
  currentPage,
  bookmarks,
  isDarkMode,
  isHeaderSticky,
  viewMode,
  toggleBookmark,
  toggleHeaderSticky,
  changeViewMode,
  goToLastReadPage,
}: ReaderControlsProps) => {
  const { toast } = useToast();

  const handleReportError = () => {
    toast({
      title: "Error Reported",
      description: "Thank you for reporting this issue. We'll look into it.",
    });
  };

  return (
    <div className="space-y-2">
      <motion.button 
        onClick={() => toggleBookmark(currentPage)}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <BookMarked className={`w-4 h-4 ${bookmarks.includes(currentPage) ? 'text-yellow-500' : ''}`} />
        <span>Bookmark</span>
        {bookmarks.includes(currentPage) && <Check className="w-4 h-4 ml-auto text-green-500" />}
      </motion.button>
      
      <motion.button 
        onClick={handleReportError}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Report Error</span>
      </motion.button>
      
      <motion.button 
        onClick={toggleHeaderSticky}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <MonitorUp className="w-4 h-4" />
        <span>Header Sticky</span>
        {isHeaderSticky ? 
          <Check className="w-4 h-4 ml-auto text-green-500" /> : 
          <X className="w-4 h-4 ml-auto text-gray-500" />
        }
      </motion.button>
      
      <motion.button 
        onClick={() => changeViewMode('longStrip')}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <LayoutTemplate className="w-4 h-4" />
        <span>Long Strip</span>
        {viewMode === 'longStrip' && <Check className="w-4 h-4 ml-auto text-green-500" />}
      </motion.button>
      
      <motion.button 
        onClick={() => changeViewMode('fitBoth')}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <MoveHorizontal className="w-4 h-4" />
        <span>Fit Both</span>
        {viewMode === 'fitBoth' && <Check className="w-4 h-4 ml-auto text-green-500" />}
      </motion.button>
      
      <motion.button 
        onClick={goToLastReadPage}
        className={`w-full flex items-center space-x-2 p-2 ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
        } rounded transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowDownToLine className="w-4 h-4" />
        <span>Bottom Progress</span>
      </motion.button>
    </div>
  );
};