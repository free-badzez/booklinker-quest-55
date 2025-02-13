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
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595674531i/23692271.jpg",
    link: "/reader/sapiens",
    driveLink: ""
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
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558i/3.jpg",
    link: "/reader/harry-potter-sorcerers-stone",
    driveLink: ""
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
  },
  {
    id: 25,
    title: "Meditations",
    author: "Marcus Aurelius",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598718766i/30659.jpg",
    link: "/reader/meditations",
    driveLink: ""
},
{
    id: 26,
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi, Fumitake Koga",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1525433527i/43306206.jpg",
    link: "/reader/the-courage-to-be-disliked",
    driveLink: ""
},
{
    id: 27,
    title: "Ego Is the Enemy",
    author: "Ryan Holiday",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1452627562i/27036528.jpg",
    link: "/reader/ego-is-the-enemy",
    driveLink: ""
},
{
    id: 28,
    title: "The Daily Stoic",
    author: "Ryan Holiday, Stephen Hanselman",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463464943i/29093292.jpg",
    link: "/reader/the-daily-stoic",
    driveLink: ""
},
{
    id: 29,
    title: "Man’s Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603125754i/4069.jpg",
    link: "/reader/mans-search-for-meaning",
    driveLink: ""
},
{
    id: 30,
    title: "Grit",
    author: "Angela Duckworth",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1452429704i/27213329.jpg",
    link: "/reader/grit",
    driveLink: ""
},
{
    id: 31,
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1516286131i/30257963.jpg",
    link: "/reader/12-rules-for-life",
    driveLink: ""
},
{
    id: 32,
    title: "Make Your Bed",
    author: "William H. McRaven",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489265350i/32895507.jpg",
    link: "/reader/make-your-bed",
    driveLink: ""
},
{
    id: 33,
    title: "Extreme Ownership",
    author: "Jocko Willink, Leif Babin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1446025324i/23848190.jpg",
    link: "/reader/extreme-ownership",
    driveLink: ""
},
{
    id: 34,
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598999921i/55340018.jpg",
    link: "/reader/the-mountain-is-you",
    driveLink: ""
},
{
    id: 35,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442168386i/1303.jpg",
    link: "/reader/48-laws-of-power",
    driveLink: ""
},
{
    id: 36,
    title: "Mastery",
    author: "Robert Greene",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347805270i/13589182.jpg",
    link: "/reader/mastery",
    driveLink: ""
},
{
    id: 37,
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528395782i/37976347.jpg",
    link: "/reader/laws-of-human-nature",
    driveLink: ""
},
{
    id: 38,
    title: "No Rules Rules",
    author: "Reed Hastings, Erin Meyer",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1588769917i/49099967.jpg",
    link: "/reader/no-rules-rules",
    driveLink: ""
},
{
    id: 39,
    title: "Principles",
    author: "Ray Dalio",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503311923i/34536488.jpg",
    link: "/reader/principles",
    driveLink: ""
},
{
    id: 40,
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603630950i/54898389.jpg",
    link: "/reader/the-almanack-of-naval-ravikant",
    driveLink: ""
},
{
    id: 41,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/10127019.jpg",
    link: "/reader/the-lean-startup",
    driveLink: ""
},
{
    id: 42,
    title: "Start with Why",
    author: "Simon Sinek",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353947925i/7108725.jpg",
    link: "/reader/start-with-why",
    driveLink: ""
},
{
    id: 43,
    title: "Drive: The Surprising Truth About What Motivates Us",
    author: "Daniel H. Pink",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1355385455i/6452796.jpg",
    link: "/reader/drive",
    driveLink: ""
},
{
    id: 44,
    title: "So Good They Can’t Ignore You",
    author: "Cal Newport",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348431838i/13525945.jpg",
    link: "/reader/so-good-they-cant-ignore-you",
    driveLink: ""
},
  {
    id: 45,
    title: "1984",
    author: "George Orwell",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/5470.jpg",
    link: "/reader/1984",
    driveLink: ""
},
{
    id: 46,
    title: "Brave New World",
    author: "Aldous Huxley",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg",
    link: "/reader/brave-new-world",
    driveLink: ""
},
{
    id: 47,
    title: "The Hitchhiker’s Guide to the Galaxy",
    author: "Douglas Adams",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559986151i/11.jpg",
    link: "/reader/hitchhikers-guide",
    driveLink: ""
},
  {
    id: 48,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg",
    link: "/reader/fahrenheit-451",
    driveLink: ""
},
{
    id: 49,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
    link: "/reader/lord-of-the-rings",
    driveLink: ""
},
{
    id: 50,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1372847500i/5907.jpg",
    link: "/reader/the-hobbit",
    driveLink: ""
},
{
    id: 51,
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1488213612i/18423.jpg",
    link: "/reader/left-hand-of-darkness",
    driveLink: "" // Add your Google Drive link here
  },
{
    id: 52,
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562726235i/13496.jpg",
    link: "/reader/game-of-thrones",
    driveLink: ""
},
{
    id: 53,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1629135994i/186074.jpg",
    link: "/reader/name-of-the-wind",
    driveLink: ""
},
  {
    id: 54,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    link: "/reader/to-kill-a-mockingbird",
    driveLink: ""
},
{
    id: 55,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    link: "/reader/pride-and-prejudice",
    driveLink: ""
},
{
    id: 56,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg",
    link: "/reader/crime-and-punishment",
    driveLink: ""
},
{
    id: 57,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
    link: "/reader/the-catcher-in-the-rye",
    driveLink: ""
},
{
    id: 58,
    title: "Dracula",
    author: "Bram Stoker",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387151694i/17245.jpg",
    link: "/reader/dracula",
    driveLink: ""
},
{
    id: 59,
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1381512375i/35031085.jpg",
    link: "/reader/frankenstein",
    driveLink: ""
},
{
    id: 60,
    title: "The Shining",
    author: "Stephen King",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg",
    link: "/reader/the-shining",
    driveLink: ""
},
{
    id: 61,
    title: "It",
    author: "Stephen King",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334416842i/830502.jpg",
    link: "/reader/it",
    driveLink: ""
},
{
    id: 62,
    title: "And Then There Were None",
    author: "Agatha Christie",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1638425884i/16299.jpg",
    link: "/reader/and-then-there-were-none",
    driveLink: ""
},
{
    id: 63,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg",
    link: "/reader/the-girl-with-the-dragon-tattoo",
    driveLink: ""
},
{
    id: 64,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621266i/968.jpg",
    link: "/reader/the-da-vinci-code",
    driveLink: ""
},
  {
    id: 65,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595674531i/23692271.jpg",
    link: "/reader/sapiens",
    driveLink: ""
},
  {
    id: 66,
    title: "The Martian",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
    link: "/reader/the-martian",
    driveLink: ""
},
  {
    id: 67,
    title: "The Road",
    author: "Cormac McCarthy",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511302904i/6288.jpg",
    link: "/reader/the-road",
    driveLink: ""
},
{
    id: 68,
    title: "The Stand",
    author: "Stephen King",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1213131305i/149267.jpg",
    link: "/reader/the-stand",
    driveLink: ""
},
  {
    id: 69,
    title: "A Wrinkle in Time",
    author: "Madeleine L’Engle",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1329061522i/18131.jpg",
    link: "/reader/a-wrinkle-in-time",
    driveLink: ""
},
{
    id: 70,
    title: "Jurassic Park",
    author: "Michael Crichton",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630494043i/40604658.jpg",
    link: "/reader/jurassic-park",
    driveLink: ""
},
{
    id: 71,
    title: "The War of the Worlds",
    author: "H.G. Wells",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320391644i/8909.jpg",
    link: "/reader/the-war-of-the-worlds",
    driveLink: ""
},
{
    id: 72,
    title: "The Time Machine",
    author: "H.G. Wells",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327942880i/2493.jpg",
    link: "/reader/the-time-machine",
    driveLink: ""
},
{
    id: 73,
    title: "The Andromeda Strain",
    author: "Michael Crichton",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1439243935i/7670.jpg",
    link: "/reader/the-andromeda-strain",
    driveLink: ""
},
{
    id: 74,
    title: "Contact",
    author: "Carl Sagan",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630668987i/23229.jpg",
    link: "/reader/contact",
    driveLink: ""
},
  {
    id: 75,
    title: "The 5th Wave",
    author: "Rick Yancey",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1359857195i/16101128.jpg",
    link: "/reader/the-5th-wave",
    driveLink: ""
},
  {
    id: 77,
    title: "The City We Became",
    author: "N.K. Jemisin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1567927143i/42074525.jpg",
    link: "/reader/the-city-we-became",
    driveLink: ""
},
{
    id: 78,
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575349296i/53152636.jpg",
    link: "/reader/mexican-gothic",
    driveLink: ""
},
{
    id: 79,
    title: "Cloud Atlas",
    author: "David Mitchell",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442650822i/49628.jpg",
    link: "/reader/cloud-atlas",
    driveLink: ""
},
{
    id: 80,
    title: "The Power",
    author: "Naomi Alderman",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460379386i/32073191.jpg",
    link: "/reader/the-power",
    driveLink: ""
},
{
    id: 81,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598439160i/50623864.jpg",
    link: "/reader/addie-larue",
    driveLink: ""
},
{
    id: 82,
    title: "House of Leaves",
    author: "Mark Z. Danielewski",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1527593113i/24800.jpg",
    link: "/reader/house-of-leaves",
    driveLink: ""
},
{
    id: 83,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
    link: "/reader/one-hundred-years-of-solitude",
    driveLink: ""
},
{
    id: 84,
    title: "The Poppy War",
    author: "R.F. Kuang",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1516102061i/35068705.jpg",
    link: "/reader/the-poppy-war",
    driveLink: ""
},
{
    id: 85,
    title: "Circe",
    author: "Madeline Miller",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1594057191i/35959740.jpg",
    link: "/reader/circe",
    driveLink: ""
},
{
    id: 86,
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522178823i/29774026.jpg",
    link: "/reader/the-priory-of-the-orange-tree",
    driveLink: ""
},
{
    id: 87,
    title: "Daisy Jones & The Six",
    author: "Taylor Jenkins Reid",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1665346521i/40597810.jpg",
    link: "/reader/daisy-jones-the-six",
    driveLink: ""
},
{
    id: 88,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663451705i/32620332.jpg",
    link: "/reader/the-seven-husbands",
    driveLink: ""
},
{
    id: 89,
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642093481i/58065033.jpg",
    link: "/reader/lessons-in-chemistry",
    driveLink: ""
},
{
    id: 90,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569518610i/45047384.jpg",
    link: "/reader/the-house-in-the-cerulean-sea",
    driveLink: ""
},
  {
    id: 91,
    title: "The Love Hypothesis",
    author: "Ali Hazelwood",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617695320i/56732449.jpg",
    link: "/reader/the-love-hypothesis",
    driveLink: ""
},
{
    id: 92,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575153187i/27362503.jpg",
    link: "/reader/it-ends-with-us",
    driveLink: ""
},
{
    id: 93,
    title: "Beach Read",
    author: "Emily Henry",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575906692i/52867387.jpg",
    link: "/reader/beach-read",
    driveLink: ""
},
{
    id: 94,
    title: "People We Meet on Vacation",
    author: "Emily Henry",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1607090148i/54985743.jpg",
    link: "/reader/people-we-meet-on-vacation",
    driveLink: ""
},
{
    id: 95,
    title: "Red, White & Royal Blue",
    author: "Casey McQuiston",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586092800i/41150487.jpg",
    link: "/reader/red-white-royal-blue",
    driveLink: ""
},
{
    id: 96,
    title: "The Unhoneymooners",
    author: "Christina Lauren",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1540577455i/42201431.jpg",
    link: "/reader/the-unhoneymooners",
    driveLink: ""
},
{
    id: 97,
    title: "Me Before You",
    author: "Jojo Moyes",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1359617636i/15507958.jpg",
    link: "/reader/me-before-you",
    driveLink: ""
},
{
    id: 98,
    title: "The Spanish Love Deception",
    author: "Elena Armas",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1624038490i/57228379.jpg",
    link: "/reader/the-spanish-love-deception",
    driveLink: ""
},
{
    id: 99,
    title: "November 9",
    author: "Colleen Hoover",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1444221752i/25111004.jpg",
    link: "/reader/november-9",
    driveLink: ""
},
{
    id: 100,
    title: "Reminders of Him",
    author: "Colleen Hoover",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627652590i/58341222.jpg",
    link: "/reader/reminders-of-him",
    driveLink: ""
}
];


const topReadBooks = books.slice(0, 11); // First 11 books for "Top Read Books"
const motivationBooks = books.filter((book) =>
  ["Rich Dad Poor Dad", "Atomic Habits", "Mindset: The New Psychology of Success", "The Psychology of Money", "The Alchemist", "Think and Grow Rich","The 7 Habits of Highly Effective People", "How to Win Friends and Influence People", "The Power of Now", "The Subtle Art of Not Giving a F*ck", "Meditations", "The 48 Laws of Power" ].includes(book.title)
);
const sciFiBooks = books.filter((book) =>
  ["Dune", "Neuromancer", "The Three-Body Problem", "Hyperion", "The Left Hand of Darkness", "The Hitchhiker’s Guide to the Galaxy","Contact", "Snow Crash","Red Rising" , "Children of Time", "The Da Vinci Code", "The Time Machine","The Andromeda Strain"].includes(book.title)
);


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
           {topReadBooks.map((book) => (
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
              {motivationBooks.map((book) => (
                <BookCard key={book.id} {...book} />
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
              {sciFiBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}

            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;

