import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { BookmarksList } from "@/components/reader/BookmarksList";

const bookPDFs = {
  "a-memory-called-empire": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view",
  "project-hail-mary": "https://drive.google.com/file/d/18OCx5hN-lw_3GlAyY5Mma8uL-BuoREgG/view",
  "dune": "https://drive.google.com/file/d/1oh-Gt272vlr3zre7kEcbjNF4Zda07Bwu/view",
  "foundation": "https://drive.google.com/file/d/1FjL_zfkabyTXemqH0aQUXT7nrKb66PBE/view",
    "three-body-problem": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "neuromancer": "https://drive.google.com/file/d/14mhlIpI1yMWvDtsuk_e6M_x24RnZC4uk/view",
  "snow-crash": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
    "red-rising": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "hyperion": "https://drive.google.com/file/d/1NhnW_HP2X1d-EW0NVx1_ca4b2B_BgccC/view",
  "left-hand-of-darkness": "https://drive.google.com/file/d/1mGZCndwCHQlRqjiLzaXybvcQESEWVXby/view",
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
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [viewMode, setViewMode] = useState<'default' | 'longStrip' | 'fitBoth'>('default');
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const loadSettings = () => {
      try {
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
      } catch (err) {
        console.error('Error loading settings:', err);
        toast({
          title: "Error",
          description: "Failed to load settings. Using defaults.",
          variant: "destructive",
        });
      }
    };

    loadSettings();
  }, [bookId, toast]);

  const toggleBookmark = (page: number) => {
    try {
      const newBookmarks = bookmarks.includes(page)
        ? bookmarks.filter(b => b !== page)
        : [...bookmarks, page].sort((a, b) => a - b);
      
      setBookmarks(newBookmarks);
      localStorage.setItem(`bookmarks-${bookId}`, JSON.stringify(newBookmarks));
      
      toast({
        title: bookmarks.includes(page) ? "Bookmark Removed" : "Bookmark Added",
        description: `Page ${page} has been ${bookmarks.includes(page) ? "removed from" : "added to"} bookmarks`,
        duration: 2000,
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
      
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const currentSrc = iframe.src;
        const baseUrl = currentSrc.split('#')[0];
        iframe.src = `${baseUrl}#page=${page}`;
      }
    }
  };

  const toggleHeaderSticky = () => {
    const newValue = !isHeaderSticky;
    setIsHeaderSticky(newValue);
    localStorage.setItem('headerSticky', String(newValue));
  };

  const changeViewMode = (mode: 'default' | 'longStrip' | 'fitBoth') => {
    setViewMode(prev => prev === mode ? 'default' : mode);
    localStorage.setItem('viewMode', mode);
  };

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newValue);
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

  const pdfUrl = bookId ? bookPDFs[bookId as keyof typeof bookPDFs] : null;

  useEffect(() => {
    const handleScroll = (event: MessageEvent) => {
      if (event.data && event.data.type === 'pdf-scroll') {
        const newPage = Math.ceil(event.data.scrollTop / event.data.pageHeight) + 1;
        if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
          localStorage.setItem(`currentPage-${bookId}`, newPage.toString());
        }
      }
    };

    window.addEventListener('message', handleScroll);
    return () => window.removeEventListener('message', handleScroll);
  }, [currentPage, totalPages, bookId]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-black' : 'bg-gray-50'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <ReaderHeader 
        currentPage={currentPage}
        totalPages={totalPages}
        isDarkMode={isDarkMode}
        isHeaderSticky={isHeaderSticky}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex h-[calc(100vh-3.5rem)]">
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto h-full">
            <div 
              className={`relative rounded-lg h-full ${
                viewMode === 'longStrip' ? 'overflow-auto' : 
                'overflow-hidden'
              }`}
            >
              {pdfUrl ? (
                <iframe
                  ref={iframeRef}
                  src={`${pdfUrl}#page=${currentPage}`}
                  className={`w-full rounded-lg ${
                    viewMode === 'longStrip' ? 'min-h-screen' :
                    viewMode === 'fitBoth' ? 'h-full object-contain' :
                    'h-full object-contain'
                  }`}
                  allow="autoplay fullscreen"
                  loading="lazy"
                  title="PDF Reader"
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
          <ScrollArea className={`w-64 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-gray-100 border-gray-200'} border-l p-4 space-y-4 transition-colors duration-200`}>
            <ReaderControls 
              currentPage={currentPage}
              bookmarks={bookmarks}
              isDarkMode={isDarkMode}
              isHeaderSticky={isHeaderSticky}
              viewMode={viewMode}
              toggleBookmark={toggleBookmark}
              toggleHeaderSticky={toggleHeaderSticky}
              changeViewMode={changeViewMode}
              goToLastReadPage={goToLastReadPage}
            />
            
            <BookmarksList 
              bookmarks={bookmarks}
              updateCurrentPage={updateCurrentPage}
              isDarkMode={isDarkMode}
            />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default BookReader;
