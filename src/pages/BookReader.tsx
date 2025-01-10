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
  ChevronDown
} from "lucide-react";

const BookReader = () => {
  const { bookId } = useParams();
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(52); // Example total pages
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Load saved bookmarks and current page from localStorage
    const savedBookmarks = localStorage.getItem(`bookmarks-${bookId}`);
    const savedPage = localStorage.getItem(`currentPage-${bookId}`);
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, [bookId]);

  const saveBookmark = (page: number) => {
    const newBookmarks = [...bookmarks, page];
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks-${bookId}`, JSON.stringify(newBookmarks));
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem(`currentPage-${bookId}`, page.toString());
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-gray-700 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm">
            Chapter {currentPage}/{totalPages}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Menu className="w-5 h-5" />
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
                onClick={() => updateCurrentPage(Math.max(1, currentPage - 1))}
                className="p-2 hover:bg-gray-700 rounded-lg"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => updateCurrentPage(currentPage + 1)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-center p-8">PDF Viewer will be implemented here</p>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 bg-[#161b22] border-l border-gray-700 p-4 space-y-4">
            <div className="text-sm text-gray-400">you are reading</div>
            <div className="font-medium">by chapter</div>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                <span>Chapter {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                <span>Page {currentPage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => saveBookmark(currentPage)}
                className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
              >
                <BookMarked className="w-4 h-4" />
                <span>Bookmark</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <MessageSquare className="w-4 h-4" />
                <span>Chapter 1 Comment</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <Info className="w-4 h-4" />
                <span>Book Detail</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <AlertTriangle className="w-4 h-4" />
                <span>Report Error</span>
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-700">
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <MonitorUp className="w-4 h-4" />
                <span>Header Sticky</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <LayoutTemplate className="w-4 h-4" />
                <span>Long Strip</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <MoveHorizontal className="w-4 h-4" />
                <span>Fit Both</span>
              </button>
              
              <button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <ArrowDownToLine className="w-4 h-4" />
                <span>Bottom Progress</span>
              </button>
            </div>

            {bookmarks.length > 0 && (
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-sm font-medium mb-2">Bookmarks</h3>
                <div className="space-y-1">
                  {bookmarks.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => updateCurrentPage(page)}
                      className="w-full text-left p-2 hover:bg-gray-700 rounded text-sm"
                    >
                      Page {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default BookReader;