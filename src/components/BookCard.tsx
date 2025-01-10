import { motion } from "framer-motion";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  link: string;
}

const BookCard = ({ title, author, cover, link }: BookCardProps) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="mt-1 text-sm opacity-90">{author}</p>
      </div>
    </motion.a>
  );
};

export default BookCard;