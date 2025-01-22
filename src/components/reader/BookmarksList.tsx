interface BookmarksListProps {
  bookmarks: number[];
  updateCurrentPage: (page: number) => void;
  isDarkMode: boolean;
}

export const BookmarksList = ({
  bookmarks,
  updateCurrentPage,
  isDarkMode,
}: BookmarksListProps) => {
  if (bookmarks.length === 0) return null;

  return (
    <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <h3 className="text-sm font-medium mb-2">Bookmarks</h3>
      <div className="space-y-1">
        {bookmarks.map((page, index) => (
          <button
            key={index}
            onClick={() => updateCurrentPage(page)}
            className={`w-full text-left p-2 ${
              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            } rounded text-sm transition-colors duration-200`}
          >
            Page {page}
          </button>
        ))}
      </div>
    </div>
  );
};