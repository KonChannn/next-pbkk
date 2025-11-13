"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography } from "../../MTailwind";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";

interface Anime {
  id: number;
  title: string;
  synopsis?: string;
  imageUrl?: string;
  score?: number;
  episodes?: number;
  status?: string;
  airing?: boolean;
  genres?: string;
}

interface Bookmark {
  id: number;
  mediaType: "anime" | "manga";
  item: {
    id: number;
    title: string;
    synopsis?: string;
    imageUrl?: string;
    score?: number;
  };
}

export default function AnimeList() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      try {
        const animeResponse = await fetch("/api/anime");
        const animeData = await animeResponse.json();
        setAnimeList(animeData);

        if (session?.user) {
          const bookmarksResponse = await fetch("/api/bookmarks?mediaType=anime");
          const bookmarksData = await bookmarksResponse.json();
          setUserBookmarks(Array.isArray(bookmarksData) ? bookmarksData : []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session]);

  const handleBookmark = async (animeId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      alert("You must log in first.");
      return;
    }

    try {
      // Check if already bookmarked
      const existingBookmark = userBookmarks.find(
        (bookmark) => bookmark.item.id === animeId
      );

      if (existingBookmark) {
        // Delete bookmark
        const response = await fetch(`/api/bookmarks?id=${existingBookmark.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to remove bookmark");
        }
      } else {
        // Add bookmark
        const response = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            animeId,
            mediaType: "anime",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add bookmark");
        }
      }

      // Refresh bookmarks
      const bookmarksResponse = await fetch("/api/bookmarks?mediaType=anime");
      const bookmarksData = await bookmarksResponse.json();
      setUserBookmarks(Array.isArray(bookmarksData) ? bookmarksData : []);
    } catch (error) {
      console.error("Error handling bookmark:", error);
      alert("Failed to process bookmark. Please try again.");
    }
  };

  const isAnimeBookmarked = (animeId: number) => {
    if (!Array.isArray(userBookmarks)) return false;
    return userBookmarks.some((bookmark) => bookmark.item.id === animeId);
  };

  // Calculate pagination
  const totalPages = Math.ceil(animeList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = animeList.slice(startIndex, endIndex);

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentItems.map((anime) => (
          <motion.div
            key={anime.id}
            variants={cardVariants}
            className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/web/anime/${anime.id}`)}
          >
            <div className="relative">
              <img
                src={anime.imageUrl || "/placeholder-image.jpg"}
                alt={anime.title}
                className="w-full h-64 object-cover rounded-md"
              />
              {anime.score && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  ★ {anime.score.toFixed(1)}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {anime.genres?.split(",").slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
            <Typography 
              variant="h5" 
              className="mt-4 font-bold"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {anime.title}
            </Typography>
            <Typography 
              color="gray" 
              className="mt-2 h-20 overflow-hidden relative text-sm"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {(anime.synopsis || "No synopsis available.").slice(0, 100)}
              {(anime.synopsis?.length || 0) > 100 && "..."}
              <Link
                href={`/web/anime/${anime.id}`}
                className="text-blue-500 hover:text-blue-700 mt-1 block"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Read more
              </Link>
            </Typography>
            <div
              className="mt-4 flex justify-end items-center cursor-pointer"
              onClick={(e) => handleBookmark(anime.id, e)}
            >
              {isAnimeBookmarked(anime.id) ? (
                <AiFillHeart className="text-red-500 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-gray-500 text-2xl hover:text-red-500 transition-colors duration-300" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex justify-center gap-2 pb-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i + 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
      <Footer />
    </>
  );
}