import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { BookmarksList } from "@/components/reader/BookmarksList";

const bookPDFs = {
  "a-memory-called-empire": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "project-hail-mary": "https://drive.google.com/file/d/18OCx5hN-lw_3GlAyY5Mma8uL-BuoREgG/preview",
  "dune": "https://drive.google.com/file/d/1oh-Gt272vlr3zre7kEcbjNF4Zda07Bwu/preview",
  "foundation": "https://drive.google.com/file/d/1FjL_zfkabyTXemqH0aQUXT7nrKb66PBE/preview",
  "three-body-problem": "https://drive.google.com/file/d/1-_AYOmaz3P9TpRsfpvfCm1JrAtW_1IaM/preview",
  "neuromancer": "https://drive.google.com/file/d/14mhlIpI1yMWvDtsuk_e6M_x24RnZC4uk/preview",
  "snow-crash": "https://drive.google.com/file/d/1jWu7BC5nzSNf0gU2uAjKGYULVQCaa0pP/preview",
  "red-rising": "https://drive.google.com/file/d/1i3CcgK38MuT7xiweWC_V-CjwQaDxpt1O/preview",
  "hyperion": "https://drive.google.com/file/d/1NhnW_HP2X1d-EW0NVx1_ca4b2B_BgccC/preview",
  "left-hand-of-darkness": "https://drive.google.com/file/d/1mGZCndwCHQlRqjiLzaXybvcQESEWVXby/preview",
  "children-of-time": "https://drive.google.com/file/d/1TYtLBXi62nT-pOXdTzNmtsQtBRI33rtY/preview",
  "rich-dad-poor-dad": "https://drive.google.com/file/d/1Nj5WiCn_CY1BfuMKm2mKwuiPGSDtE-MR/preview",
  "the-psychology-of-money": "https://drive.google.com/file/d/1kbvwibmLmGhoglSOPduneNlLpdILA5F8/preview",
  "atomic-habits": "https://drive.google.com/file/d/1kYI-g_z_o_GE8ZLb1YJlhQuRa-YTDWem/preview",
  "think-and-grow-rich": "https://drive.google.com/file/d/13hwJcgT8Pd9Y8Cck4In4Jz23sYJa9sN_/preview",
  "7-habits": "https://drive.google.com/file/d/18AbWYaRNnj-HjnpSMEezQjpyeNE346yc/preview",
  "how-to-win-friends": "https://drive.google.com/file/d/1nyur8Ryr7Jw-K9JH21AV4CK8epBy6-ER/preview",
  "the-power-of-now": "https://drive.google.com/file/d/1GjisDmXv-GxzjXKxZqw-b0vzU4foawuX/preview",
  "the-alchemist": "https://drive.google.com/file/d/1BmfvQ8XDA6G5IAyureXwHeeNiQnKSTrH/preview",
  "subtle-art": "https://drive.google.com/file/d/1l1-YxSel33eSTIOdYkZlWDE45BslH4oK/preview",
  "The-4-hour-work-week": "https://drive.google.com/file/d/1b4vBh1rJT8ujt5EbDj-GvIQlXW8TqHJs/preview",
  "mindset": "https://drive.google.com/file/d/1dOM2xQdutXKSN6R1xuUdWZNngl4n0Mu9/preview",
  "deep-work": "https://drive.google.com/file/d/1ljUjMbYjEZWeVH5P5y3FxNfnRtV9FY4W/preview",
  "compound-effect": "https://drive.google.com/file/d/1EHaDB8tQ70ZYLOT8HM-A08Szn4bc8ZmO/preview",
  "Sapiens":"https://drive.google.com/file/d/1AbuHGlWMrCMcwVWjnUqeBBjiG9N_RjDk/preview",
  "The-7-Habits-of-Highly-Effective-People":"https://drive.google.com/file/d/1ZLsbdckGMUPKc6dFKii_4ab8PuB45B7j/preview",
  "Harry-Potter-and-the-Sorcerer’s-Stone":"https://drive.google.com/file/d/1NyczhOBFK3-CzkqMa5T3v6lGHhib2uR1/preview",
  "Meditations":"https://drive.google.com/file/d/1wDnxhboh30hnONG3PCWcSoRzKgT_CGV1/preview",
  "The-Courage-to-Be-Disliked":"https://drive.google.com/file/d/1TGPFzlJaqEKANPjl874TRGZiFTqTSz5h/preview",
  "Ego Is the Enemy":"https://drive.google.com/file/d/1A-fGCZSiGE38hP9UGMrFdGrg0HUcF95w/preview",
  "The Daily Stoic":"https://drive.google.com/file/d/1xz-1StrtBKbBGfyWyQIzX-dWgRdiJ2XV/preview",
  "Man’s Search for Meaning":"https://drive.google.com/file/d/1iC1cKMiaBFrXxohHzcBQ1oPnw_YPUyVA/preview",
  "Grit":"https://drive.google.com/file/d/1zRWPssBTT14o0TMuEyKlHAA9hPSx52zK/preview",
  "12 Rules for Life":"https://drive.google.com/file/d/1gzsp0BhdUJEbpfpovjg5AFRc0oxfXPeJ/preview",
  "Make Your Bed":"https://drive.google.com/file/d/1NbJFIQxeKdfg-e48yj8scssrr9-t5dFd/preview",
  "Extreme Ownership":"https://drive.google.com/file/d/1An9uJyTLn3t--8ajvil6MTISbNjEL28l/preview",
  "The Mountain Is You":"https://drive.google.com/file/d/1lHerpQHogzQd0RybKlTow4AR3OIQj6kH/preview",
  "Mastery":"https://drive.google.com/file/d/1lPQB96K4a9jvNPwZ7o0KqEeZe4WkbznL/preview",
  "The Laws of Human Nature":"https://drive.google.com/file/d/11WHUgPdL3hM_Gu0MXbAA5Ht7nTYMInVm/preview",
  "No Rules Rules":"https://drive.google.com/file/d/1vyEYUwxLbsGxLt25VtV6pKsg3Y7Jpxnc/preview",
  "Principles":"https://drive.google.com/file/d/1hAFCPfZ4pce9WTBLvaSMbKefEfFJcsEa/preview",
  "The Almanack of Naval Ravikant":"https://drive.google.com/file/d/1IWJDlM258zs2MPL4ezY5MjB6NicKJ4hE/preview",
  "The Lean Startup":"https://drive.google.com/file/d/1GPcLcAFMqL0WG9gszSRfoQlnpDvi_2Bl/preview",
  "Start with Why":"https://drive.google.com/file/d/1qnry44zH1OVw5gMF4sp5JPxDw7ZZqTUE/preview",
  "Drive: The Surprising Truth About What Motivates Us":"https://drive.google.com/file/d/1Ayazn37SF6DdWAYZgLXtxV3nTIOE2tnG/preview",
  "So Good They Can’t Ignore You":"https://drive.google.com/file/d/1URTZfgtsAHTVQQw-ly_PB3YGieT2gxj-/preview",
  "1984":"https://drive.google.com/file/d/1Z1LCJP3LW7UN3wSJOsLkgeDp7shiDbbv/preview",
  "Brave New World":"https://drive.google.com/file/d/1-lKJPFpkGRtEdZZarH0BeKWLJvZEpi7y/preview",
  "The Hitchhiker’s Guide to the Galaxy":"https://drive.google.com/file/d/1Qlf3XUMGZFkZWMMNOijWjj18JQ1siLtG/preview",
  "Fahrenheit 451":"https://drive.google.com/file/d/1MyUiGYy9E6hPlBQZXH4kyq0-6rt8Yzy9/preview",
  "The Lord of the Rings":"https://drive.google.com/file/d/1ZdV3w_hZPf4qp8LsOgcLVyQB2cJ_ebAs/preview",
  "The Hobbit":"https://drive.google.com/file/d/11vRodKzw8qD0N5Yljm5WPvSddvDOxUsS/preview",
  "A Game of Thrones":"https://drive.google.com/file/d/1tBZdyKOzRoMYqOBi5xu7crYG51nv9MvB/preview",
  "The Name of the Wind":"https://drive.google.com/file/d/15GN1_P9BcXjncEQttMlXd8-BwKsCfaDd/preview",
  "To Kill a Mockingbird":"https://drive.google.com/file/d/1k8PgtS_fPo2BKMp_QDH7fa6VsDl7T8VO/preview",
  "Pride and Prejudice":"https://drive.google.com/file/d/11-1qkqZNWY4-Id5kpCjtgvrSy-Y-fGj0/preview",
  "Crime and Punishment":"https://drive.google.com/file/d/1yg1AAN98KELDttECk0WLnyFb7TsgyyUA/preview",
  "The Catcher in the Rye":"",
  "Dracula":"",
  "Frankenstein":"",
  "The Shining":"",
  "It":"",
  "And Then There Were None":"",
  "The Girl with the Dragon Tattoo":"",
  "The Da Vinci Code":"",
  "The Martian":"",
  "The Road":"",
  "The Stand":"",
  "A Wrinkle in Time":"",
  "Jurassic Park":"",
  "The War of the Worlds":"",
  "The Time Machine":"",
  "The Andromeda Strain":"",
  "Contact":"",
  "The 5th Wave":"",
  "The City We Became":"",
  "Mexican Gothic":"",
  "Cloud Atlas":"",
  "The Power":"",
  "The Invisible Life of Addie LaRue":"",
  "House of Leaves":"",
  "One Hundred Years of Solitude":"",
  "The Poppy War":"",
  "Circe":"",
  "The Priory of the Orange Tree":"",
  "Daisy Jones & The Six":"",
  "The Seven Husbands of Evelyn Hugo":"",
   "Lessons in Chemistry":"",
  "The House in the Cerulean Sea":"",
  "The Love Hypothesis":"",
  "It Ends with Us":"",
  "Beach Read":"",
  "People We Meet on Vacation":"",
  "Red, White & Royal Blue":"",
  "The Unhoneymooners":"",
  "Me Before You":"",
  "The Spanish Love Deception":"",
  "November 9":"",
  "Reminders of Him":"" 
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
