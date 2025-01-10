import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  link: string;
}

const BookCard = ({ title, author, cover, link }: BookCardProps) => {
  return (
    <Link to={link}>
      <motion.div
        className="group relative block overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-sm font-semibold leading-tight line-clamp-2">{title}</h3>
          <p className="mt-1 text-xs opacity-90">{author}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;