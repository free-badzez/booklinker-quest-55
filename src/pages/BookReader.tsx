import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  BookMarked,
  MessageSquare,
  Info,
  AlertTriangle,
  MonitorUp,
  LayoutTemplate,
  MoveHorizontal,
  ArrowDownToLine,
  RefreshCw,
  ChevronDown,
  Sun,
  Moon,
  Check,
  X
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const bookPDFs = {
  "a-memory-called-empire": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "project-hail-mary": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "dune": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "foundation": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "three-body-problem": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "neuromancer": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "snow-crash": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "red-rising": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "hyperion": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "left-hand-of-darkness": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "children-of-time": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "rich-dad-poor-dad": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "psychology-of-money": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "atomic-habits": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "think-and-grow-rich": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "7-habits": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "how-to-win-friends": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "power-of-now": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "the-alchemist": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "subtle-art": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "4-hour-work-week": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "mindset": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "deep-work": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "compound-effect": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview"
};

const BookReader = () => {
  const { bookId } = useParams();
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(52);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [viewMode, setViewMode] = useState<'default' | 'longStrip' | 'fitBoth'>('default');
  const { toast } = useToast();

  const bookDetails = {
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
    publishedYear: 2021,
    genre: "Science Fiction"
  };

  useEffect(() => {
    const loadBookData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const savedBookmarks = localStorage.getItem(`bookmarks-${bookId}`);
        const savedPage = localStorage.getItem(`currentPage-${bookId}`);
        const savedTheme = localStorage.getItem('theme');
        const savedViewMode = localStorage.getItem('viewMode');
        const savedHeaderSticky = localStorage.getItem('headerSticky');
        
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        if (savedPage) setCurrentPage(parseInt(savedPage));
        if (savedTheme) setIsDarkMode(savedTheme === 'dark');
        if (savedViewMode) setViewMode(savedViewMode as 'default' | 'longStrip' | 'fitBoth');
        if (savedHeaderSticky) setIsHeaderSticky(savedHeaderSticky === 'true');
        
        document.documentElement.classList.toggle('dark', isDarkMode);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading book data:', err);
        setError('Failed to load book data. Please try again later.');
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [bookId]);

  const toggleBookmark = (page: number) => {
    try {
      const newBookmarks = bookmarks.includes(page)
        ? bookmarks.filter(b => b !== page)
        : [...bookmarks, page];
      
      setBookmarks(newBookmarks);
      localStorage.setItem(`bookmarks-${bookId}`, JSON.stringify(newBookmarks));
      
      toast({
        title: bookmarks.includes(page) ? "Bookmark removed" : "Bookmark added",
        description: `Page ${page} has been ${bookmarks.includes(page) ? "removed from" : "added to"} bookmarks`,
      });
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReportError = () => {
    toast({
      title: "Error Reported",
      description: "Thank you for reporting this issue. We'll look into it.",
    });
  };

  const toggleHeaderSticky = () => {
    const newValue = !isHeaderSticky;
    setIsHeaderSticky(newValue);
    localStorage.setItem('headerSticky', String(newValue));
  };

  const changeViewMode = (mode: 'default' | 'longStrip' | 'fitBoth') => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

  const goToLastReadPage = () => {
    const savedPage = localStorage.getItem(`currentPage-${bookId}`);
    if (savedPage) {
      updateCurrentPage(parseInt(savedPage));
      toast({
        title: "Navigation",
        description: `Returned to page ${savedPage}`,
      });
    }
  };

  const updateCurrentPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      localStorage.setItem(`currentPage-${bookId}`, page.toString());
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <RefreshCw className="w-8 h-8 text-gray-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-lg text-gray-700">{error}</p>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const pdfUrl = bookId ? bookPDFs[bookId as keyof typeof bookPDFs] : null;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-black' : 'bg-gray-50'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} border-b py-2 px-4 flex items-center justify-between transition-colors duration-200 ${isHeaderSticky ? 'sticky top-0 z-50' : ''}`}>
        <div className="flex items-center space-x-4">
          <Link to="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm">
            Chapter {currentPage}/{totalPages}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleHeaderSticky}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className={`px-3 py-1 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded transition-colors duration-200`}>
            Login
          </button>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between mb-4">
              <button
                onClick={() => updateCurrentPage(currentPage - 1)}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => updateCurrentPage(currentPage + 1)}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className={`rounded-lg mb-4 ${
              viewMode === 'longStrip' ? 'h-auto' : 
              viewMode === 'fitBoth' ? 'h-screen' : 
              'aspect-[3/4] h-[800px]'
            }`}>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className={`w-full rounded-lg ${
                    viewMode === 'longStrip' ? 'min-h-screen' :
                    viewMode === 'fitBoth' ? 'h-full object-contain' :
                    'h-full'
                  }`}
                  allow="autoplay"
                  loading="lazy"
                ></iframe>
              ) : (
                <div className={`w-full h-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                  <p className="text-center p-8">PDF not available</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {isSidebarOpen && (
          <ScrollArea className={`w-64 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} border-l p-4 space-y-4 transition-colors duration-200`}>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>you are reading</div>
            <div className="font-medium">by chapter</div>
            
            <div className="space-y-2">
              <motion.button 
                onClick={() => updateCurrentPage(currentPage)}
                className={`w-full flex items-center justify-between p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <span>Chapter {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
              
              <motion.button 
                onClick={() => updateCurrentPage(currentPage)}
                className={`w-full flex items-center justify-between p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <span>Page {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-2">
              <motion.button 
                onClick={() => toggleBookmark(currentPage)}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <BookMarked className={`w-4 h-4 ${bookmarks.includes(currentPage) ? 'text-yellow-500' : ''}`} />
                <span>Bookmark</span>
                {bookmarks.includes(currentPage) && <Check className="w-4 h-4 ml-auto text-green-500" />}
              </motion.button>
              
              <motion.button 
                onClick={handleReportError}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report Error</span>
              </motion.button>
              
              <motion.button 
                onClick={toggleHeaderSticky}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <MonitorUp className="w-4 h-4" />
                <span>Header Sticky</span>
                {isHeaderSticky ? <Check className="w-4 h-4 ml-auto text-green-500" /> : <X className="w-4 h-4 ml-auto text-gray-500" />}
              </motion.button>
              
              <motion.button 
                onClick={() => changeViewMode('longStrip')}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>Long Strip</span>
                {viewMode === 'longStrip' && <Check className="w-4 h-4 ml-auto text-green-500" />}
              </motion.button>
              
              <motion.button 
                onClick={() => changeViewMode('fitBoth')}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <MoveHorizontal className="w-4 h-4" />
                <span>Fit Both</span>
                {viewMode === 'fitBoth' && <Check className="w-4 h-4 ml-auto text-green-500" />}
              </motion.button>
              
              <motion.button 
                onClick={goToLastReadPage}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Bottom Progress</span>
              </motion.button>
            </div>

            {bookmarks.length > 0 && (
              <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h3 className="text-sm font-medium mb-2">Bookmarks</h3>
                <div className="space-y-1">
                  {bookmarks.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => updateCurrentPage(page)}
                      className={`w-full text-left p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded text-sm transition-colors duration-200`}
                    >
                      Page {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default BookReader;
