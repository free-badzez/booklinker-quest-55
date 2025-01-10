import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    title: "A Memory Called Empire",
    author: "Arkady Martine",
    cover: "/lovable-uploads/2a335f2f-468b-443b-a696-6db4096ef4ba.png",
    link: "https://www.goodreads.com/book/show/37794149-a-memory-called-empire"
  },
  // Add more books here
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-7xl"
      >
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Discover Your Next Read
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600"
          >
            Explore our curated collection of remarkable books
          </motion.p>
        </header>

        <SearchBar onSearch={setSearchQuery} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;