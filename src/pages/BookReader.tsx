import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { BookmarksList } from "@/components/reader/BookmarksList";

const bookPDFs = {
  "A-Game-of-Thrones":"https://drive.google.com/file/d/1tBZdyKOzRoMYqOBi5xu7crYG51nv9MvB/preview",
  "A-memory-called-empire": "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/preview",
  "A-Wrinkle-in-Time":"https://drive.google.com/file/d/1EDpNdZavSvCw_VUm3vipIYNoh1HuRyX0/preview",
  "And-Then-There-Were-None":"https://drive.google.com/file/d/1qIKFte4Tw6Tmksp9P6JFkpS1DmRUvJID/preview",
  "Atomic-habits": "https://drive.google.com/file/d/1kYI-g_z_o_GE8ZLb1YJlhQuRa-YTDWem/preview",
  "Beach-Read":"https://drive.google.com/file/d/1C5HxIWmwqxugbJLe8wH2XndEYI9RRiqD/preview",
  "Brave-New-World":"https://drive.google.com/file/d/1-lKJPFpkGRtEdZZarH0BeKWLJvZEpi7y/preview",
  "children-of-time": "https://drive.google.com/file/d/1TYtLBXi62nT-pOXdTzNmtsQtBRI33rtY/preview",
  "Circe":"https://drive.google.com/file/d/1cRlVqg4DTCXn4pJKQxoI2m7FkcfLb56S/preview",
  "Cloud-Atlas":"https://drive.google.com/file/d/1oUtFFchqjFB4ooDwS-uNc_htCfRUY3y7/preview",
  "Contact":"https://drive.google.com/file/d/1Rs5GNRmMcFcoWzuJzSrwDeGvEsrHSFhu/preview",
  "Crime-and-Punishment":"https://drive.google.com/file/d/1yg1AAN98KELDttECk0WLnyFb7TsgyyUA/preview",
  "Daisy-Jones-&-The-Six":"https://drive.google.com/file/d/1vlRnGXrrWzGlDTQ3UhzVe5v1uy3394KS/preview",
  "Deep-work": "https://drive.google.com/file/d/1ljUjMbYjEZWeVH5P5y3FxNfnRtV9FY4W/preview",
  "Dracula":"https://drive.google.com/file/d/1bPfBqB28VKin63DlN1rL7XCyV43PrKvf/preview",
  "Drive: The Surprising Truth About What Motivates Us":"https://drive.google.com/file/d/1Ayazn37SF6DdWAYZgLXtxV3nTIOE2tnG/preview",
  "Dune": "https://drive.google.com/file/d/1oh-Gt272vlr3zre7kEcbjNF4Zda07Bwu/preview",
  "Ego-Is-the-Enemy":"https://drive.google.com/file/d/1A-fGCZSiGE38hP9UGMrFdGrg0HUcF95w/preview",
  "Extreme-Ownership":"https://drive.google.com/file/d/1An9uJyTLn3t--8ajvil6MTISbNjEL28l/preview",
  "foundation": "https://drive.google.com/file/d/1FjL_zfkabyTXemqH0aQUXT7nrKb66PBE/preview",
  "Frankenstein":"https://drive.google.com/file/d/1lJL28vr5kxeiJnzKrJ2QVftaGS2rQ0KG/preview",
  "Fahrenheit 451":"https://drive.google.com/file/d/1MyUiGYy9E6hPlBQZXH4kyq0-6rt8Yzy9/preview",
  "Grit":"https://drive.google.com/file/d/1zRWPssBTT14o0TMuEyKlHAA9hPSx52zK/preview",
  "Harry-Potter-and-the-Sorcerer’s-Stone":"https://drive.google.com/file/d/1NyczhOBFK3-CzkqMa5T3v6lGHhib2uR1/preview",
  "how-to-win-friends": "https://drive.google.com/file/d/1nyur8Ryr7Jw-K9JH21AV4CK8epBy6-ER/preview",
  "House-of-Leaves":"https://drive.google.com/file/d/11hp82_ILcQsexrKpKx9uB-Lb1c5u7nDg/preview",
  "hyperion": "https://drive.google.com/file/d/1NhnW_HP2X1d-EW0NVx1_ca4b2B_BgccC/preview",
  "It":"https://drive.google.com/file/d/164xPzcHQvExTFLS5Wjx6qal7a4qJVOC3/preview",
  "It-Ends-with-Us":"https://drive.google.com/file/d/1Gv9Vdl60YvoiKswnJnOa_z-zX2CAEXn-/preview",
  "Jurassic-Park":"https://drive.google.com/file/d/1Ggx73IZXseQASOEgSK-ZcU51xsMYl3zk/preview",
  "left-hand-of-darkness": "https://drive.google.com/file/d/1mGZCndwCHQlRqjiLzaXybvcQESEWVXby/preview",
  "Lessons-in-Chemistry":"https://drive.google.com/file/d/1dW9cJyfT45MIPOXfvk7ffFWefXm_njvA/preview",
  "Man’s-Search-for-Meaning":"https://drive.google.com/file/d/1iC1cKMiaBFrXxohHzcBQ1oPnw_YPUyVA/preview",
  "Mastery":"https://drive.google.com/file/d/1lPQB96K4a9jvNPwZ7o0KqEeZe4WkbznL/preview",
  "Make-Your-Bed":"https://drive.google.com/file/d/1NbJFIQxeKdfg-e48yj8scssrr9-t5dFd/preview",
  "Mexican-Gothic":"https://drive.google.com/file/d/1pmrvKVApAc_k6gMmZ1v41JV9qB6I5Ig-/preview",
  "Meditations":"https://drive.google.com/file/d/1wDnxhboh30hnONG3PCWcSoRzKgT_CGV1/preview",
  "Me-Before-You":"https://drive.google.com/file/d/17iCC-VcgZNzoHK0i_B2oqyI5wNcoV8ci/preview",
  "mindset": "https://drive.google.com/file/d/1dOM2xQdutXKSN6R1xuUdWZNngl4n0Mu9/preview",
  "November-9":"https://drive.google.com/file/d/1KaI5hNR2UzohcpVXir7haJxVwmpRkHCe/preview",
  "No-Rules-Rules":"https://drive.google.com/file/d/1vyEYUwxLbsGxLt25VtV6pKsg3Y7Jpxnc/preview",
  "neuromancer": "https://drive.google.com/file/d/14mhlIpI1yMWvDtsuk_e6M_x24RnZC4uk/preview",
  "One-Hundred-Years-of-Solitude":"https://drive.google.com/file/d/1s9DlPacOABqBafVywySlmDmQBeD_zeMU/preview",
  "People-We-Meet-on-Vacation":"https://drive.google.com/file/d/1hnTDJ2AwoheQ1ADf1BGRDabjiwTJvQda/preview",
  "Pride-and-Prejudice":"https://drive.google.com/file/d/11-1qkqZNWY4-Id5kpCjtgvrSy-Y-fGj0/preview",
  "Principles":"https://drive.google.com/file/d/1hAFCPfZ4pce9WTBLvaSMbKefEfFJcsEa/preview",
  "project-hail-mary": "https://drive.google.com/file/d/18OCx5hN-lw_3GlAyY5Mma8uL-BuoREgG/preview",
  "red-rising": "https://drive.google.com/file/d/1i3CcgK38MuT7xiweWC_V-CjwQaDxpt1O/preview",
  "Reminders-of-Him":"https://drive.google.com/file/d/1JedXt50oIc7KnOs9Hhfevd73aGVPsqox/preview" 
  "Red,-White-&-Royal-Blue":"https://drive.google.com/file/d/1Cm1l21X1Y9ZQIHuyssSSX-MTjNoQxcCk/preview",
  "rich-dad-poor-dad": "https://drive.google.com/file/d/1Nj5WiCn_CY1BfuMKm2mKwuiPGSDtE-MR/preview",
  "Sapiens":"https://drive.google.com/file/d/1AbuHGlWMrCMcwVWjnUqeBBjiG9N_RjDk/preview",
  "snow-crash": "https://drive.google.com/file/d/1jWu7BC5nzSNf0gU2uAjKGYULVQCaa0pP/preview",
  "So-Good-They-Can’t-Ignore-You":"https://drive.google.com/file/d/1URTZfgtsAHTVQQw-ly_PB3YGieT2gxj-/preview",
  "Start-with-Why":"https://drive.google.com/file/d/1qnry44zH1OVw5gMF4sp5JPxDw7ZZqTUE/preview",
  "The-Alchemist": "https://drive.google.com/file/d/1BmfvQ8XDA6G5IAyureXwHeeNiQnKSTrH/preview",
  "The-Almanack-of-Naval-Ravikant":"https://drive.google.com/file/d/1IWJDlM258zs2MPL4ezY5MjB6NicKJ4hE/preview",
  "The-Andromeda-Strain":"https://drive.google.com/file/d/1M2po7oxaALv00xOC4RZ7Hftv8p58Hr7y/preview",
  "The-Catcher-in-the-Rye":"https://drive.google.com/file/d/1vuQbPRQa9OtsGjFNEWY0Vcsv1V_-PvbL/preview",
  "The-City-We-Became":"https://drive.google.com/file/d/1DrAMmxwIVvuDxG-ZOxG0sG6Cc9gRxhTW/preview",
  "The-compound-effect": "https://drive.google.com/file/d/1EHaDB8tQ70ZYLOT8HM-A08Szn4bc8ZmO/preview",
  "The-Courage-to-Be-Disliked":"https://drive.google.com/file/d/1TGPFzlJaqEKANPjl874TRGZiFTqTSz5h/preview",
  "The-Da-Vinci-Code":"https://drive.google.com/file/d/1U8UHe5UZvW03lNBxJL-N3wFI32MZcScc/preview",
  "The-Daily-Stoic":"https://drive.google.com/file/d/1xz-1StrtBKbBGfyWyQIzX-dWgRdiJ2XV/preview",
  "The-Girl-with-the-Dragon-Tattoo":"https://drive.google.com/file/d/1dqty4x4nXUZPu4TsdPTkCyUd5Tmign5x/preview",
  "The-Hitchhiker’s-Guide-to-the-Galaxy":"https://drive.google.com/file/d/1Qlf3XUMGZFkZWMMNOijWjj18JQ1siLtG/preview",
  "The-Hobbit":"https://drive.google.com/file/d/11vRodKzw8qD0N5Yljm5WPvSddvDOxUsS/preview",
  "The-House-in-the-Cerulean-Sea":"https://drive.google.com/file/d/1GX6zK32WIKThWn8i4fOnq3YU8OTlpDWm/preview",
  "The-Invisible-Life-of-Addie-LaRue":"https://drive.google.com/file/d/19Gb2Nv5nZy4hZZzPQNjuUTAX5coEoMHO/preview",
  "To-Kill-a-Mockingbird":"https://drive.google.com/file/d/1k8PgtS_fPo2BKMp_QDH7fa6VsDl7T8VO/preview",
  "The-Laws-of-Human-Nature":"https://drive.google.com/file/d/11WHUgPdL3hM_Gu0MXbAA5Ht7nTYMInVm/preview",
  "The-Lean-Startup":"https://drive.google.com/file/d/1GPcLcAFMqL0WG9gszSRfoQlnpDvi_2Bl/preview",
  "The-Left-Hand-of-Darkness":"https://drive.google.com/file/d/1mGZCndwCHQlRqjiLzaXybvcQESEWVXby/preview",
  "The-Love-Hypothesis":"https://drive.google.com/file/d/17tpTcR05YX01OomOiXUIfvb1y0DhTEDp/preview",
  "The-Lord-of-the-Rings":"https://drive.google.com/file/d/1ZdV3w_hZPf4qp8LsOgcLVyQB2cJ_ebAs/preview",
  "The-Martian":"https://drive.google.com/file/d/1UJ4GAvAHtiYHAgAoXbUJMqY44vYCfJls/preview",
  "The-Mountain-Is-You":"https://drive.google.com/file/d/1lHerpQHogzQd0RybKlTow4AR3OIQj6kH/preview",
  "The-Name-of-the-Wind":"https://drive.google.com/file/d/15GN1_P9BcXjncEQttMlXd8-BwKsCfaDd/preview",
  "The-Poppy-War":"https://drive.google.com/file/d/1JRusmJ-XIq2xOBmadWdEHZfpB0CgPDIj/preview",
  "The-power-of-now": "https://drive.google.com/file/d/1GjisDmXv-GxzjXKxZqw-b0vzU4foawuX/preview",
  "The-Power":"https://drive.google.com/file/d/1ETzlrMTVK2Ei-27ygiZweVTHuv7MMKln/preview",
  "The-Priory-of-the-Orange-Tree":"https://drive.google.com/file/d/13OGZtDIekMinc0nmyfHSI2Drc_0ARhhD/preview",
  "The-psychology-of-money": "https://drive.google.com/file/d/1kbvwibmLmGhoglSOPduneNlLpdILA5F8/preview",
  "The-Road":"https://drive.google.com/file/d/1_wa8fAi8xObqgWBCAckiVgeNkbygyvNB/preview",
  "The-Seven-Husbands-of-Evelyn-Hugo":"https://drive.google.com/file/d/1IqfS41qtj3s0BXX4ZrvY7Pi-yv-V84gP/preview",
  "The-Shining":"https://drive.google.com/file/d/1ngh5X3mOJG3XJZhIMZ6nRzfqJfRqp8_H/preview",
  "The-Spanish-Love-Deception":"https://drive.google.com/file/d/1iSEEFa6ZWU-u5QWxwLH62b6OKz1Pgy4c/preview",
  "The-Stand":"https://drive.google.com/file/d/1CO9g-4qaSTpRxbJxedMBszGjJdTE2shQ/preview",
  "The-subtle-art-of-not-giving-fuck": "https://drive.google.com/file/d/1l1-YxSel33eSTIOdYkZlWDE45BslH4oK/preview",
  "The-Three-body-problem": "https://drive.google.com/file/d/1-_AYOmaz3P9TpRsfpvfCm1JrAtW_1IaM/preview",
  "The-Time-Machine":"https://drive.google.com/file/d/1VYU1uD5RWfN6ftCAts1DHOb-D4BvQijX/preview",
  "The-Unhoneymooners":"https://drive.google.com/file/d/1KoZC2q-miX8lHnRRMxVzIGfYCzPwpGPt/preview",
  "The-War-of-the-Worlds":"https://drive.google.com/file/d/1NaBf7ZV3HgqgqJYeHksvuZ9hmNoLdwwT/preview",
  "The-7-Habits-of-Highly-Effective-People":"https://drive.google.com/file/d/1ZLsbdckGMUPKc6dFKii_4ab8PuB45B7j/preview",
  "The-48-Laws-of-Power":"https://drive.google.com/file/d/1i5tHzQamOrZg0JXvCHKoHI5ioEw3Q3Op/preview",
  "The-4-hour-work-week": "https://drive.google.com/file/d/1b4vBh1rJT8ujt5EbDj-GvIQlXW8TqHJs/preview",
  "The-5th-Wave":"https://drive.google.com/file/d/13MmiIK98eiR-BfY2Ujy6WVhuaD82xdDc/preview",
  "Think-and-grow-rich": "https://drive.google.com/file/d/13hwJcgT8Pd9Y8Cck4In4Jz23sYJa9sN_/preview",
  "1984":"https://drive.google.com/file/d/1Z1LCJP3LW7UN3wSJOsLkgeDp7shiDbbv/preview",
  "12-Rules-for-Life":"https://drive.google.com/file/d/1gzsp0BhdUJEbpfpovjg5AFRc0oxfXPeJ/preview"
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
