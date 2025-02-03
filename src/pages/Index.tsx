import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const books = [
  {
    id: 1,
    title: "A Memory Called Empire",
    author: "Arkady Martine",
    cover: "https://img.chirpbooks.com/image/upload/f_auto,q_auto:low,w_660,h_660/v1651605790/cover_images/macmillan/9781250318954.jpg",
    link: "/reader/a-memory-called-empire",
    driveLink: "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view?usp=sharing" // Add your Google Drive link here
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    link: "/reader/project-hail-mary",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    link: "/reader/dune",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 4,
    title: "Foundation",
    author: "Isaac Asimov",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
    link: "/reader/foundation",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 5,
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
    link: "/reader/three-body-problem",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 6,
    title: "Neuromancer",
    author: "William Gibson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg",
    link: "/reader/neuromancer",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 7,
    title: "Snow Crash",
    author: "Neal Stephenson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589842551i/40651883.jpg",
    link: "/reader/snow-crash",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 8,
    title: "Red Rising",
    author: "Pierce Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1461354651i/15839976.jpg",
    link: "/reader/red-rising",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 9,
    title: "Hyperion",
    author: "Dan Simmons",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1405546838i/77566.jpg",
    link: "/reader/hyperion",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 10,
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1488213612i/18423.jpg",
    link: "/reader/left-hand-of-darkness",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 11,
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1431492647i/25499718.jpg",
    link: "/reader/children-of-time",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 12,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388211242i/69571.jpg",
    link: "/reader/rich-dad-poor-dad",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 13,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    link: "/reader/psychology-of-money",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 14,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    link: "/reader/atomic-habits",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 15,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
    link: "/reader/think-and-grow-rich",
    driveLink: ""
  },
  {
    id: 16,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421842784i/36072.jpg",
    link: "/reader/7-habits",
    driveLink: ""
  },
  {
    id: 17,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg",
    link: "/reader/how-to-win-friends",
    driveLink: ""
  },
  {
    id: 18,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689947880i/6708.jpg",
    link: "/reader/power-of-now",
    driveLink: ""
  },
  {
    id: 19,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    link: "/reader/the-alchemist",
    driveLink: ""
  },
  {
    id: 20,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg",
    link: "/reader/subtle-art",
    driveLink: ""
  },
  {
    id: 21,
    title: "The 4-Hour Work Week",
    author: "Timothy Ferriss",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348972669i/368593.jpg",
    link: "/reader/4-hour-work-week",
    driveLink: ""
  },
  {
    id: 22,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436227012i/40745.jpg",
    link: "/reader/mindset",
    driveLink: ""
  },
  {
    id: 23,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
    link: "/reader/deep-work",
    driveLink: ""
  },
  {
    id: 24,
    title: "The Compound Effect",
    author: "Darren Hardy",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1391442225i/9420697.jpg",
    link: "/reader/compound-effect",
    driveLink: ""
  }
];

const visibleBooks = books.slice(0, 11); // Only show first 11 books by default

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : visibleBooks;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-7xl relative"
        >
          {/* Menu Button */}
          <div className="absolute right-4 top-0 z-10">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => (window.location.href = "https://mcqgenrator.netlify.app/")}>
        MCQ Generator
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => (window.location.href = "https://calm-tapioca-eab340.netlify.app/")}>
        Pomodoro Timer
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

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

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-6 text-left"
          >
            Top Read Books
          </motion.h2>

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

      <div className="bg-gradient-to-r from-[#FDE1D3] to-[#D3E4FD] py-16">
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {filteredBooks.map((book) => (
                <BookCard key={`motivation-${book.id}`} {...book} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-blue-900 py-16">
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
