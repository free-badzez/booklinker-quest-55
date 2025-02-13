import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    title: "A Memory Called Empire",
    author: "Arkady Martine",
    cover: "https://m.media-amazon.com/images/I/81EbhzfWY5L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
  },
  {
    id: 4,
    title: "Foundation",
    author: "Isaac Asimov",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
  },
  {
    id: 5,
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
  },
  {
    id: 6,
    title: "Neuromancer",
    author: "William Gibson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg",
  },
  {
    id: 7,
    title: "Snow Crash",
    author: "Neal Stephenson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589842551i/40651883.jpg",
  },
  {
    id: 8,
    title: "Red Rising",
    author: "Pierce Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1461354651i/15839976.jpg",
  },
  {
    id: 9,
    title: "Hyperion",
    author: "Dan Simmons",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1405546838i/77566.jpg",
  },
  {
    id: 10,
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1488213612i/18423.jpg",
  },
  {
    id: 11,
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    cover: "https://m.media-amazon.com/images/I/81Xb8fFEkwL.jpg",
  }
];

const AlternativeBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      {/* Split background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full flex">
          <div className="w-[30%] bg-[#FDE1D3]" /> {/* Cream color */}
          <div className="w-[70%] bg-[#D3E4FD]" /> {/* Soft blue color */}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <header className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              Alternative View
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Discover books in a different layout
            </motion.p>
          </header>

          <SearchBar onSearch={setSearchQuery} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8"
          >
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlternativeBooks;
