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
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    link: "https://www.goodreads.com/book/show/54493401-project-hail-mary"
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    link: "https://www.goodreads.com/book/show/44767458-dune"
  },
  {
    id: 4,
    title: "Foundation",
    author: "Isaac Asimov",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
    link: "https://www.goodreads.com/book/show/29579.Foundation"
  },
  {
    id: 5,
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
    link: "https://www.goodreads.com/book/show/20518872-the-three-body-problem"
  },
  {
    id: 6,
    title: "Neuromancer",
    author: "William Gibson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg",
    link: "https://www.goodreads.com/book/show/6088007-neuromancer"
  },
  {
    id: 7,
    title: "Snow Crash",
    author: "Neal Stephenson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589842551i/40651883.jpg",
    link: "https://www.goodreads.com/book/show/40651883-snow-crash"
  },
  {
    id: 8,
    title: "Red Rising",
    author: "Pierce Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1461354651i/15839976.jpg",
    link: "https://www.goodreads.com/book/show/15839976-red-rising"
  },
  {
    id: 9,
    title: "Hyperion",
    author: "Dan Simmons",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1405546838i/77566.jpg",
    link: "https://www.goodreads.com/book/show/77566.Hyperion"
  },
  {
    id: 10,
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1488213612i/18423.jpg",
    link: "https://www.goodreads.com/book/show/18423.The_Left_Hand_of_Darkness"
  },
  {
    id: 11,
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1431492647i/25499718.jpg",
    link: "https://www.goodreads.com/book/show/25499718-children-of-time"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-7xl"
        >
          <header className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              BookLinker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Find and explore your next favorite book
            </motion.p>
          </header>

          <SearchBar onSearch={setSearchQuery} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16"
          >
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Motivation Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full flex">
            <div className="w-[30%] bg-[#F4D03F]" /> {/* Golden color */}
            <div className="w-[70%] bg-[#006064]" /> {/* Teal color */}
          </div>
        </div>

        <div className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-7xl"
          >
            <header className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
              >
                Motivation
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600"
              >
                Books that inspire and motivate
              </motion.p>
            </header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative min-h-[600px]"
            >
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={`motivation-${book.id}`}
                  className="absolute transform"
                  style={{
                    left: `${(index % 5) * 20}%`,
                    top: `${Math.floor(index / 5) * 200}px`,
                    transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`,
                    zIndex: index,
                  }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                >
                  <BookCard {...book} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SCI-FI Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 py-20">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-7xl"
          >
            <header className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white mb-3"
              >
                SCI-FI
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-300"
              >
                Explore the future through science fiction
              </motion.p>
            </header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {filteredBooks.map((book) => (
                <BookCard key={`scifi-${book.id}`} {...book} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;