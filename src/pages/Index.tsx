import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";

const Index = () => {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: "Sample Book 1",
      author: "Author 1",
      cover: "/placeholder.svg",
      pdfUrl: "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view?usp=drive_link"
    },
    {
      id: 2,
      title: "Sample Book 2",
      author: "Author 2",
      cover: "/placeholder.svg",
      pdfUrl: "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view?usp=drive_link"
    }
  ]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Search logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Book Library
        </h1>
        <SearchBar onSearch={handleSearch} />
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {searchResults.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
              link={`/reader/${book.id}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;