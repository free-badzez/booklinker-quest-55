import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="w-full px-6 py-4 bg-white bg-opacity-90 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 text-lg"
          />
          <button
            type="submit"
            className="absolute right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;