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

interface Manga {
  id: number;
  title: string;
  synopsis?: string;
  imageUrl?: string;
  score?: number;
  chapters?: number;
  status?: string;
  publishing?: boolean;
  genres?: string;
  author?: string;
  volumes?: number;
}

interface Bookmark {
  id: number;
  mediaType: "manga" | "anime";
  item: Manga;
}

export default function MangaList() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      try {
        const mangaResponse = await fetch("/api/manga");
        const mangaData = await mangaResponse.json();
        setMangaList(mangaData);

        if (session?.user) {
          const bookmarksResponse = await fetch("/api/bookmarks?mediaType=manga");
          const bookmarksData = await bookmarksResponse.json();
          setUserBookmarks(bookmarksData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session]);

  const handleBookmark = async (mangaId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      alert("You must log in first.");
      return;
    }

    try {
      // Check if manga is already bookmarked
      const existingBookmark = userBookmarks.find(
        (bookmark) => bookmark.item.id === mangaId
      );

      if (existingBookmark) {
        // Delete existing bookmark
        const response = await fetch(`/api/bookmarks?id=${existingBookmark.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to remove bookmark");
        }
      } else {
        // Add new bookmark
        const response = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mangaId,
            mediaType: "manga",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add bookmark");
        }
      }

      // Refresh bookmarks
      const bookmarksResponse = await fetch("/api/bookmarks?mediaType=manga");
      const bookmarksData = await bookmarksResponse.json();
      setUserBookmarks(bookmarksData);
    } catch (error) {
      console.error("Error handling bookmark:", error);
      alert("Failed to process bookmark. Please try again.");
    }
  };

  const isMangaBookmarked = (mangaId: number) => {
    return userBookmarks.some((bookmark) => bookmark.item.id === mangaId);
  };

  // Calculate pagination
  const totalPages = Math.ceil(mangaList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mangaList.slice(startIndex, endIndex);

  // Animation variants
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading manga list...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentItems.map((manga) => (
          <motion.div
            key={manga.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => router.push(`/web/manga/${manga.id}`)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={manga.imageUrl || "/placeholder-image.jpg"}
                alt={manga.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              {manga.score && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  ★ {manga.score}
                </div>
              )}
            </div>
            
            <div className="p-4">
              <Typography 
                variant="h5" 
                className="font-bold text-lg mb-2 line-clamp-1"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {manga.title}
              </Typography>
              
              <div className="mb-2 flex flex-wrap gap-1">
                {manga.genres?.split(',').slice(0, 2).map((genre, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
              
              <Typography 
                color="gray" 
                className="mb-3 text-sm line-clamp-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {manga.synopsis
                  ? manga.synopsis.length > 120
                    ? manga.synopsis.slice(0, 120) + "..."
                    : manga.synopsis
                  : "No synopsis available."}
              </Typography>
              
              <div className="flex justify-between items-center mt-auto">
                <Link
                  href={`/web/manga/${manga.id}`}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read more
                </Link>
                
                <div
                  onClick={(e) => handleBookmark(manga.id, e)}
                  className="cursor-pointer"
                >
                  {isMangaBookmarked(manga.id) ? (
                    <AiFillHeart className="text-red-500 text-xl hover:scale-110 transition-transform" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400 text-xl hover:text-red-500 hover:scale-110 transition-all" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pb-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
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
      )}
      <Footer />
    </>
  );
}