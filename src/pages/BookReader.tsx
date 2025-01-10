import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BookReader = () => {
  const { bookId } = useParams();
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-4">Book Reader</h1>
        <div className="mb-4">
          <button
            onClick={() => saveBookmark(currentPage)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Bookmark Current Page
          </button>
        </div>
        
        {/* Placeholder for PDF viewer */}
        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4">
          <p className="text-center p-8">PDF Viewer will be implemented here</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => updateCurrentPage(Math.max(1, currentPage - 1))}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Previous Page
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => updateCurrentPage(currentPage + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Next Page
          </button>
        </div>

        {bookmarks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Bookmarks</h2>
            <div className="flex flex-wrap gap-2">
              {bookmarks.map((page, index) => (
                <button
                  key={index}
                  onClick={() => updateCurrentPage(page)}
                  className="bg-yellow-100 px-3 py-1 rounded hover:bg-yellow-200"
                >
                  Page {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookReader;