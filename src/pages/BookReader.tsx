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
  Moon
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  // Mock book details - replace with actual data
  const bookDetails = {
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
    publishedYear: 2021,
    genre: "Science Fiction",
    driveLink: "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view?usp=drive_link"
  };

  useEffect(() => {
    const loadBookData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load saved bookmarks and current page from localStorage
        const savedBookmarks = localStorage.getItem(`bookmarks-${bookId}`);
        const savedPage = localStorage.getItem(`currentPage-${bookId}`);
        const savedTheme = localStorage.getItem('theme');
        
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        }
        if (savedPage) {
          setCurrentPage(parseInt(savedPage));
        }
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }

        // Apply theme
        document.documentElement.classList.toggle('dark', isDarkMode);
        
        // Load PDF from Drive
        const iframe = document.getElementById('pdf-viewer') as HTMLIFrameElement;
        if (iframe) {
          iframe.src = bookDetails.driveLink;
        }
        
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

  const updateCurrentPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      localStorage.setItem(`currentPage-${bookId}`, page.toString());
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
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

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b py-2 px-4 flex items-center justify-between transition-colors duration-200`}>
        <div className="flex items-center space-x-4">
          <Link to="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm">
            Chapter {currentPage}/{totalPages}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className={`px-3 py-1 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded transition-colors duration-200`}>
            Login
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Navigation Controls */}
            <div className="flex justify-between mb-4">
              <button
                onClick={() => updateCurrentPage(currentPage - 1)}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => updateCurrentPage(currentPage + 1)}
                className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition-colors duration-200`}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className={`aspect-[3/4] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg mb-4 overflow-hidden`}>
              <iframe
                id="pdf-viewer"
                src={bookDetails.driveLink}
                className="w-full h-full border-0"
                title="PDF Viewer"
                allowFullScreen
              />
            </div>
          </div>
        </main>

        {/* Sidebar */}
        {isSidebarOpen && (
          <ScrollArea className={`w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-l p-4 space-y-4 transition-colors duration-200`}>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>you are reading</div>
            <div className="font-medium">by chapter</div>
            
            <div className="space-y-2">
              <button 
                onClick={() => updateCurrentPage(currentPage)}
                className={`w-full flex items-center justify-between p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <span>Chapter {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => updateCurrentPage(currentPage)}
                className={`w-full flex items-center justify-between p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <span>Page {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleBookmark(currentPage)}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <BookMarked className={`w-4 h-4 ${bookmarks.includes(currentPage) ? 'text-yellow-500' : ''}`} />
                <span>Bookmark</span>
              </button>
              
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <MessageSquare className="w-4 h-4" />
                <span>Chapter {currentPage} Comment</span>
              </button>
              
              <button 
                onClick={() => setShowBookDetails(!showBookDetails)}
                className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}
              >
                <Info className="w-4 h-4" />
                <span>Book Detail</span>
              </button>
              
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <AlertTriangle className="w-4 h-4" />
                <span>Report Error</span>
              </button>
            </div>

            {showBookDetails && (
              <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg space-y-2`}>
                <h3 className="font-bold">{bookDetails.title}</h3>
                <p className="text-sm">By {bookDetails.author}</p>
                <p className="text-sm">{bookDetails.description}</p>
                <p className="text-sm">Published: {bookDetails.publishedYear}</p>
                <p className="text-sm">Genre: {bookDetails.genre}</p>
              </div>
            )}

            <div className={`space-y-2 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <MonitorUp className="w-4 h-4" />
                <span>Header Sticky</span>
              </button>
              
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <LayoutTemplate className="w-4 h-4" />
                <span>Long Strip</span>
              </button>
              
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <MoveHorizontal className="w-4 h-4" />
                <span>Fit Both</span>
              </button>
              
              <button className={`w-full flex items-center space-x-2 p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded transition-colors duration-200`}>
                <ArrowDownToLine className="w-4 h-4" />
                <span>Bottom Progress</span>
              </button>
            </div>

            {bookmarks.length > 0 && (
              <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="text-sm font-medium mb-2">Bookmarks</h3>
                <div className="space-y-1">
                  {bookmarks.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => updateCurrentPage(page)}
                      className={`w-full text-left p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded text-sm transition-colors duration-200`}
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