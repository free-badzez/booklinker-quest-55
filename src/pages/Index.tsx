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
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    cover: "https://m.media-amazon.com/images/I/81GdMqla0cL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/A-Game-of-Thrones",
    driveLink: ""
  },
  {
    id: 2,
    title: "A Memory Called Empire",
    author: "Arkady Martine",
    cover: "https://img.chirpbooks.com/image/upload/f_auto,q_auto:low,w_660,h_660/v1651605790/cover_images/macmillan/9781250318954.jpg",
    link: "/reader/A-memory-called-empire",
    driveLink: "https://drive.google.com/file/d/1NE3LMVzkHzMlGEoRqSiyMykAU3uSlvR4/view?usp=sharing" // Add your Google Drive link here
  },
  {
    id: 3,
    title: "A Wrinkle in Time",
    author: "Madeleine L’Engle",
    cover: "https://m.media-amazon.com/images/I/81IBa0EgyOL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/A-Wrinkle-in-Time",
    driveLink: ""
   },
   {
    id: 4,
    title: "And Then There Were None",
    author: "Agatha Christie",
    cover: "https://m.media-amazon.com/images/I/71NvWibzW5L._UF1000,1000_QL80_.jpg",
    link: "/reader/And-Then-There-Were-None",
    driveLink: ""
   },
   {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    link: "/reader/Atomic-habits",
    driveLink: "" // Add your Google Drive link here
   },
   {
    id: 6,
    title: "Beach Read",
    author: "Emily Henry",
    cover: "https://m.media-amazon.com/images/I/71kdiN5Y1YL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Beach-Read",
    driveLink: ""
   },
   {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    cover: "https://m.media-amazon.com/images/I/91D4YvdC0dL.jpg",
    link: "/reader/Brave-New-World",
    driveLink: ""
   },
   {
    id: 8,
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    cover: "https://m.media-amazon.com/images/I/8158B6v-ugL.jpg",
    link: "/reader/children-of-time",
    driveLink: "" // Add your Google Drive link here
   },
   {
    id: 9,
    title: "Circe",
    author: "Madeline Miller",
    cover: "https://m.media-amazon.com/images/I/A1osRAsXZnL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Circe",
    driveLink: ""
   },
   {
    id: 10,
    title: "Cloud Atlas",
    author: "David Mitchell",
    cover: "https://m.media-amazon.com/images/I/81PK7KMw4IL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Cloud-Atlas",
    driveLink: ""
   },
   {
    id: 11,
    title: "Contact",
    author: "Carl Sagan",
    cover: "https://m.media-amazon.com/images/I/819TTW8woSL._UF1000,1000_QL80_.jpg",
    link: "/reader/Contact",
    driveLink: ""
   },
   {
    id: 12,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    cover: "https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Crime-and-Punishment",
    driveLink: ""
   },
   {
    id: 13,
    title: "Daisy Jones & The Six",
    author: "Taylor Jenkins Reid",
    cover: "https://m.media-amazon.com/images/I/81cxxjQd57L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Daisy-Jones-&-The-Six",
    driveLink: ""
  },
   {
    id: 14,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    link: "/reader/Deep-work",
    driveLink: ""
  },
  {
    id: 15,
    title: "Dracula",
    author: "Bram Stoker",
    cover: "https://m.media-amazon.com/images/I/91wOUFZCE+L._UF1000,1000_QL80_.jpg",
    link: "/reader/Dracula",
    driveLink: ""
  },
  {
    id: 16 ,
    title: "DUNE",
    author: " Frank Herbert",
    cover: "https://m.media-amazon.com/images/I/71oO1E-XPuL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Dune",
    driveLink: ""
  },
  {
    id: 17 ,
    title: "Drive: The Surprising Truth About What Motivates Us",
    author: "Daniel H. Pink",
    cover: "https://m.media-amazon.com/images/I/71uTHTyxtwL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Drive",
    driveLink: ""
  },
  {
    id: 18,
    title: "Ego Is the Enemy",
    author: "Ryan Holiday",
    cover: "https://m.media-amazon.com/images/I/71XJ8xwLPpL.jpg",
    link: "/reader/Ego-Is-the-Enemy",
    driveLink: ""
  },
  {
    id: 19,
    title: "Extreme Ownership",
    author: "Jocko Willink, Leif Babin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1427163007i/23848190.jpg",
    link: "/reader/Extreme-Ownership",
    driveLink: ""
  },
  {
    id: 20,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    cover: "https://m.media-amazon.com/images/I/61zc4fPQbIL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Fahrenheit 451",
    driveLink: ""
  },
  {
    id: 21,
    title: "Foundation",
    author: "Isaac Asimov",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
    link: "/reader/foundation",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 22,
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://m.media-amazon.com/images/I/91KEmBm2GVL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Frankenstein",
    driveLink: ""
  },
  {
    id: 23,
    title: "Grit",
    author: "Angela Duckworth",
    cover: "https://m.media-amazon.com/images/I/71gPBwjsEfL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Grit",
    driveLink: ""
  },
  {
    id: 24,
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    cover: "https://m.media-amazon.com/images/I/81q77Q39nEL.jpg",
    link: "/reader/Harry-Potter-and-the-Sorcerer’s-Stone",
    driveLink: ""
  },
  {
    id: 25,
    title: "House of Leaves",
    author: "Mark Z. Danielewski",
    cover: "https://m.media-amazon.com/images/I/61yArGR8YkL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/House-of-Leaves",
    driveLink: ""
  },
   {
    id: 26,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg",
    link: "/reader/how-to-win-friends",
    driveLink: ""
  },
  {
    id: 27,
    title: "Hyperion",
    author: "Dan Simmons",
    cover: "https://m.media-amazon.com/images/I/91V0S0qjKwL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/hyperion",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 28,
    title: "It",
    author: "Stephen King",
    cover: "https://m.media-amazon.com/images/I/712+f2W4uoL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/It",
    driveLink: ""
  },
   {
    id: 29,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/It-Ends-with-Us",
    driveLink: ""
  },
  {
    id: 30,
    title: "Jurassic Park",
    author: "Michael Crichton",
    cover: "https://m.media-amazon.com/images/I/91CbcH+c5eL.jpg",
    link: "/reader/Jurassic-Park",
    driveLink: ""
  },
  {
    id: 31,
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    cover: "https://m.media-amazon.com/images/I/81-GeCd+96L.jpg",
    link: "/reader/Lessons-in-Chemistry",
    driveLink: ""
    },
  {
    id: 32,
    title: "Left hand of darkness",
    author: "Bonnie Garmus",
    cover: "https://m.media-amazon.com/images/I/81-GeCd+96L.jpg",
    link: "/reader/left-hand-of-darkness",
    driveLink: ""
    },
    {
    id: 33,
    title: "Make Your Bed",
    author: "William H. McRaven",
    cover: "https://m.media-amazon.com/images/I/710b2STZwOL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Make-Your-Bed",
    driveLink: ""
  },
  {
    id: 34,
    title: "Man’s Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "https://m.media-amazon.com/images/I/61157LApbuL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Man’s-Search-for-Meaning",
    driveLink: ""
  },
  {
    id: 35,
    title: "Mastery",
    author: "Robert Greene",
    cover: "https://m.media-amazon.com/images/I/61kZgW7wemL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Mastery",
    driveLink: ""
    },
  {
    id: 36,
    title: "Meditations",
    author: "Marcus Aurelius",
    cover: "https://m.media-amazon.com/images/I/81DFDGzHZqL.jpg",
    link: "/reader/Meditations",
    driveLink: ""
},
   {
    id: 37,
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    cover: "https://m.media-amazon.com/images/I/81Q9jM2ASmL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Mexican-Gothic",
    driveLink: ""
  },
  {
    id: 38,
    title: "Me Before You",
    author: "Jojo Moyes",
    cover: "https://m.media-amazon.com/images/I/61u7fXK-n-L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Me-Before-You",
    driveLink: ""
  },
  {
    id: 39,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436227012i/40745.jpg",
    link: "/reader/mindset",
    driveLink: ""
  },
   {
    id: 40,
    title: "Neuromancer",
    author: "William Gibson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg",
    link: "/reader/neuromancer",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 41,
    title: "November 9",
    author: "Colleen Hoover",
    cover: "https://m.media-amazon.com/images/I/71RBpTJkKaL.jpg",
    link: "/reader/November-9",
    driveLink: ""
  },
   {
    id: 42,
    title: "No Rules Rules",
    author: "Reed Hastings, Erin Meyer",
    cover: "https://m.media-amazon.com/images/I/81Dg7P7KFFL.jpg",
    link: "/reader/No-Rules-Rules",
    driveLink: ""
},
   {
    id: 43,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    cover: "https://m.media-amazon.com/images/I/61mok7+j2dL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/One-Hundred-Years-of-Solitude",
    driveLink: ""
  },
  {
    id: 44,
    title: "People We Meet on Vacation",
    author: "Emily Henry",
    cover: "https://m.media-amazon.com/images/I/81i9kql+6PL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/People-We-Meet-on-Vacation"
    driveLink: ""
  },
    {
    id: 45,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    link: "/reader/project-hail-mary",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 46,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Pride-and-Prejudice",
    driveLink: ""
  },
  {
    id: 47,
    title: "Principles",
    author: "Ray Dalio",
    cover: "https://m.media-amazon.com/images/I/61LKD6scbfL.jpg",
    link: "/reader/Principles",
    driveLink: ""
},
  {
    id: 48,
    title: "Red, White & Royal Blue",
    author: "Casey McQuiston",
    cover: "https://m.media-amazon.com/images/I/71pSRcqtzbL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Red,-White-&-Royal-Blue",
    driveLink: ""
  },
   {
    id: 49,
    title: "Reminders of Him",
    author: "Colleen Hoover",
    cover: "https://m.media-amazon.com/images/I/71rdsaOMvVL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Reminders-of-Him",
    driveLink: ""
  },
   {
    id: 50,
    title: "Red Rising",
    author: "Pierce Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1461354651i/15839976.jpg",
    link: "/reader/red-rising",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 51,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: "https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg",
    link: "/reader/rich-dad-poor-dad",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 52,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
    link: "/reader/Sapiens",
    driveLink: ""
  },
  {
    id: 53,
    title: "So Good They Can’t Ignore You",
    author: "Cal Newport",
    cover: "https://m.media-amazon.com/images/I/81vEQ9rFgKL.jpg",
    link: "/reader/So-Good-They-Can’t-Ignore-You",
    driveLink: ""
  },
  {
    id: 53 ,
    title: "Snow Crash",
    author: "Neal Stephenson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589842551i/40651883.jpg",
    link: "/reader/snow-crash",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 55,
    title: "Start with Why",
    author: "Simon Sinek",
    cover: "https://m.media-amazon.com/images/I/71M1P287BjL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/Start-with-Why",
    driveLink: ""
  },
  {
    id: 56,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    link: "/reader/The-Alchemist",
    driveLink: ""
  },
  {
    id: 57,
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover: "https://m.media-amazon.com/images/I/51lUeX6L2BL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Almanack-of-Naval-Ravikant",
    driveLink: ""
},
  {
    id: 58,
    title: "The Andromeda Strain",
    author: "Michael Crichton",
    cover: "https://m.media-amazon.com/images/I/91bHkt+0KaL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Andromeda-Strain",
    driveLink: ""
  },
  {
    id: 59,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "https://m.media-amazon.com/images/I/7108sdEUEGL.jpg",
    link: "/reader/The-Catcher-in-the-Rye",
    driveLink: ""
  },
  {
    id: 60,
    title: "The City We Became",
    author: "N.K. Jemisin",
    cover: "https://m.media-amazon.com/images/I/81Z2QA86JCL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-City-We-Became",
    driveLink: ""
  },
  {
    id: 61,
    title: "The Compound Effect",
    author: "Darren Hardy",
    cover: "https://m.media-amazon.com/images/I/610QDSRlLYL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-compound-effect",
    driveLink: ""
  },
  {
    id: 62,
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi, Fumitake Koga",
    cover: "https://m.media-amazon.com/images/I/710cYy40DUL.jpg",
    link: "/reader/The-Courage-to-Be-Disliked",
    driveLink: ""
},
   {
    id: 63,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    cover: "https://m.media-amazon.com/images/I/71y4X5150dL._UF1000,1000_QL80_.jpg",
    link: "/reader/The-Da-Vinci-Code",
    driveLink: ""
  },
  {
    id: 64,
    title: "The Daily Stoic",
    author: "Ryan Holiday, Stephen Hanselman",
    cover: "https://m.media-amazon.com/images/I/71r4YkNAUKL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Daily-Stoic",
    driveLink: ""
  },
  {
    id: 65,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    cover: "https://m.media-amazon.com/images/I/81YW99XIpJL._UF1000,1000_QL80_.jpg",
    link: "/reader/The-Girl-with-the-Dragon-Tattoo",
    driveLink: ""
  },
  {
    id: 66,
    title: "The Hitchhiker’s Guide to the Galaxy",
    author: "Douglas Adams",
    cover: "https://m.media-amazon.com/images/I/81Nqplsq6LL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Hitchhiker’s-Guide-to-the-Galaxy",
    driveLink: ""
  },
  {
    id: 67,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://m.media-amazon.com/images/I/717TGeIkVML._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Hobbit",
    driveLink: ""
  },
  {
    id: 68,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    cover: "https://m.media-amazon.com/images/I/71bgrXZvbuS._UF1000,1000_QL80_.jpg",
    link: "/reader/The-House-in-the-Cerulean-Sea",
    driveLink: ""
  },
  {
    id: 69,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    cover: "https://m.media-amazon.com/images/I/91U8gXEhK3L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Invisible-Life-of-Addie-LaRue",
    driveLink: ""
  },
   {
    id: 70,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://m.media-amazon.com/images/I/71smIoGNeiL._UF1000,1000_QL80_.jpg",
    link: "/reader/To-Kill-a-Mockingbird",
    driveLink: ""
  },
  {
    id: 71,
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    cover: "https://m.media-amazon.com/images/I/612j5C23G-L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Left-Hand-of-Darkness",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 72,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover: "https://m.media-amazon.com/images/I/81j4C6j3dRL.jpg",
    link: "/reader/The-Lord-of-the-Rings",
    driveLink: ""
  },
  {
    id: 73,
    title: "The Love Hypothesis",
    author: "Ali Hazelwood",
    cover: "https://m.media-amazon.com/images/I/81plBFoPgtL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Love-Hypothesis",
    driveLink: ""
  },
  {
    id: 74,
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    cover: "https://m.media-amazon.com/images/I/61LkQGz38cL.jpg",
    link: "/reader/The-Laws-of-Human-Nature",
    driveLink: ""
},
{
    id: 75,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "https://m.media-amazon.com/images/I/61BFOf9Ap-L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Lean-Startup",
    driveLink: ""
  },
  {
    id: 76,
    title: "The Martian",
    author: "Andy Weir",
    cover: "https://m.media-amazon.com/images/I/51QimqeXMXL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Martian",
    driveLink: ""
  },
   {
    id: 77,
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    cover: "https://m.media-amazon.com/images/I/61xivWmExiL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Mountain-Is-You",
    driveLink: ""
},
   {
    id: 78,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    cover: "https://m.media-amazon.com/images/I/611iKJa7a-L.jpg",
    link: "/reader/The-Name-of-the-Wind",
    driveLink: ""
  },
    {
    id: 79,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689947880i/6708.jpg",
    link: "/reader/The-power-of-now",
    driveLink: ""
  },
  {
    id: 80,
    title: "The Poppy War",
    author: "R.F. Kuang",
    cover: "https://m.media-amazon.com/images/I/71qrDmmlupL._UF1000,1000_QL80_.jpg",
    link: "/reader/The-Poppy-War",
    driveLink: ""
  },
  {
    id: 81,
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    cover: "https://m.media-amazon.com/images/I/91JR5HRL84L._UF1000,1000_QL80_.jpg",
    link: "/reader/The-Priory-of-the-Orange-Tree",
    driveLink: ""
  },
  {
    id: 82,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    link: "/reader/The-psychology-of-money",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 83,
    title: "The Power",
    author: "Naomi Alderman",
    cover: "https://m.media-amazon.com/images/I/61wncgMzC5L._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Power",
    driveLink: ""
  },
  {
    id: 84,
    title: "The Road",
    author: "Cormac McCarthy",
    cover: "https://m.media-amazon.com/images/I/711WYzePJeL.jpg",
    link: "/reader/The-Road",
    driveLink: ""
  },
   {
    id: 85,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://m.media-amazon.com/images/I/710QvWhZIwL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Seven-Husbands-of-Evelyn-Hugo",
    driveLink: ""
  },
  {
    id: 86,
    title: "The Shining",
    author: "Stephen King",
    cover: "https://m.media-amazon.com/images/I/81zqohMOk-L.jpg",
    link: "/reader/The-Shining",
    driveLink: ""
  },
   {
    id: 87,
    title: "The Spanish Love Deception",
    author: "Elena Armas",
    cover: "https://m.media-amazon.com/images/I/610rcbFwuZL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Spanish-Love-Deception",
    driveLink: ""
  },
  {
    id: 88,
    title: "The Stand",
    author: "Stephen King",
    cover: "https://m.media-amazon.com/images/I/91YWt2jiowL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-Stand",
    driveLink: ""
  },
  {
    id: 89,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg",
    link: "/reader/The-subtle-art-of-not-giving-fuck",
    driveLink: ""
  },
   {
    id: 90,
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
    link: "/reader/The-Three-body-problem",
    driveLink: "" // Add your Google Drive link here
  },
  {
    id: 91,
    title: "The Time Machine",
    author: "H.G. Wells",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327942880i/2493.jpg",
    link: "/reader/The-Time-Machine",
    driveLink: ""
  },
  {
    id: 92,
    title: "The Unhoneymooners",
    author: "Christina Lauren",
    cover: "https://m.media-amazon.com/images/I/71PVJVuMMQL._UF1000,1000_QL80_.jpg",
    link: "/reader/The-Unhoneymooners",
    driveLink: ""
  },
  {
    id: 93,
    title: "The War of the Worlds",
    author: "H.G. Wells",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781451687989/the-war-of-the-worlds-9781451687989_hr.jpg",
    link: "/reader/The-War-of-the-Worlds",
    driveLink: ""
  },
  {
    id: 94,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421842784i/36072.jpg",
    link: "/reader/The-7-Habits-of-Highly-Effective-People",
    driveLink: ""
  },
 
{
    id: 95,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    cover: "https://m.media-amazon.com/images/I/61F-bq53kOL.jpg",
    link: "/reader/The-48-Laws-of-Power",
    driveLink: ""
},
  {
    id: 96,
    title: "The 4-Hour Work Week",
    author: "Timothy Ferriss",
    cover: "https://m.media-amazon.com/images/I/6142S0D-PiL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-4-hour-work-week",
    driveLink: ""
  },
   {
    id: 97,
    title: "The 5th Wave",
    author: "Rick Yancey",
    cover: "https://m.media-amazon.com/images/I/61P4qla-ThL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/The-5th-Wave",
    driveLink: ""
  },
  {
    id: 98,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
    link: "/reader/Think-and-grow-rich",
    driveLink: ""
  },
  {
    id: 99,
    title: "1984",
    author: "George Orwell",
    cover: "https://m.media-amazon.com/images/I/612ADI+BVlL._AC_UF1000,1000_QL80_.jpg",
    link: "/reader/1984",
    driveLink: ""
  },
  {
    id: 100,
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    cover: "https://m.media-amazon.com/images/I/71OVB8HknWL.jpg",
    link: "/reader/12-rules-for-life",
    driveLink: ""
},
];


const topReadBooks = books.slice(0, 11); // First 11 books for "Top Read Books"

const motivationTitles = [
  "Rich Dad Poor Dad", "Atomic Habits", "Mindset: The New Psychology of Success", 
  "The Psychology of Money", "The Alchemist", "Think and Grow Rich",
  "The 7 Habits of Highly Effective People", "How to Win Friends and Influence People", 
  "The Power of Now", "The Subtle Art of Not Giving a F*ck", "Meditations", "The 48 Laws of Power"
].map((b) => b.toLowerCase());

const sciFiTitles = [
  "Dune", "Neuromancer", "The Three-Body Problem", "Hyperion", "The Left Hand of Darkness", 
  "The Hitchhiker’s Guide to the Galaxy", "Contact", "Snow Crash", "Red Rising", 
  "Children of Time", "The Da Vinci Code", "The Time Machine", "The Andromeda Strain"
].map((b) => b.toLowerCase());

const motivationBooks = books.filter((book) =>
  motivationTitles.includes(book.title.toLowerCase())
);

const sciFiBooks = books.filter((book) =>
  sciFiTitles.includes(book.title.toLowerCase())
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Global search across all books
  const filteredAllBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Existing filtered lists for topReadBooks, motivationBooks, and sciFiBooks
  const filteredTopReadBooks = searchQuery
    ? topReadBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topReadBooks;

  const filteredMotivationBooks = searchQuery
    ? motivationBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : motivationBooks;

  const filteredSciFiBooks = searchQuery
    ? sciFiBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sciFiBooks;

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

          {/* Global Search Results */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-6 text-left"
              >
                Search Results
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              >
                {filteredAllBooks.map((book) => (
                  <BookCard key={`search-${book.id}`} {...book} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Top Read Books */}
          {!searchQuery && (
            <>
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
                {filteredTopReadBooks.map((book) => (
                  <BookCard key={`topread-${book.id}`} {...book} />
                ))}
              </motion.div>
            </>
          )}

          {/* Motivation Books */}
          {!searchQuery && (
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
                    {filteredMotivationBooks.map((book) => (
                      <BookCard key={`motivation-${book.id}`} {...book} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Sci-Fi Books */}
          {!searchQuery && (
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
                    {filteredSciFiBooks.map((book) => (
                      <BookCard key={`scifi-${book.id}`} {...book} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;


