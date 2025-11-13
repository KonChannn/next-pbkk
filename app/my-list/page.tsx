"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography } from "../MTailwind";
import { MdDelete } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

interface MediaItem {
  id: number;
  title: string;
  synopsis?: string;
  imageUrl?: string;
  genres?: string;
  score?: number;
}

interface Bookmark {
  id: number;
  mediaType: "anime" | "manga";
  item: MediaItem;
}

type MediaType = "anime" | "manga";

export default function BookmarksPage() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<MediaType>("anime");

  useEffect(() => {
    if (!session) return;

    async function fetchBookmarks() {
      try {
        const response = await fetch(`/api/bookmarks?mediaType=${activeTab}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookmarks();
  }, [session, activeTab]);

  const handleDeleteBookmark = async (bookmarkId: number) => {
    try {
      const response = await fetch(`/api/bookmarks?id=${bookmarkId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bookmark");
      }

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== bookmarkId));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      alert("Failed to delete bookmark. Please try again.");
    }
  };

  const TabButton = ({ type, isActive }: { type: MediaType; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Typography
            variant="h4"
            className="text-gray-700"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Please log in to view your bookmarks.
          </Typography>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Typography
            variant="h4"
            className="text-gray-700"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Loading bookmarks...
          </Typography>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <Typography
            variant="h4"
            className="mb-6 text-gray-800"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Your Bookmarks
          </Typography>
          <div className="flex gap-4">
            <TabButton type="anime" isActive={activeTab === "anime"} />
            <TabButton type="manga" isActive={activeTab === "manga"} />
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Typography
              variant="h5"
              className="text-gray-700"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              No {activeTab} bookmarks found.
            </Typography>
            <Typography
              className="text-gray-500 mt-2"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Start bookmarking your favorite {activeTab}!
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={bookmark.item.imageUrl || "/placeholder-image.jpg"}
                    alt={bookmark.item.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  {bookmark.item.score && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <AiFillStar className="text-yellow-300" />
                      <span>{bookmark.item.score.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bookmark.item.genres?.split(",").slice(0, 3).map((genre, index) => (
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
                  className="mt-4 font-bold line-clamp-1"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {bookmark.item.title}
                </Typography>
                <Typography
                  color="gray"
                  className="mt-2 h-20 overflow-hidden relative text-sm"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {(bookmark.item.synopsis || "No synopsis available.").slice(0, 100)}
                  {(bookmark.item.synopsis?.length || 0) > 100 && "..."}
                </Typography>
                <div className="mt-4 flex justify-end items-center">
                  <button
                    onClick={() => handleDeleteBookmark(bookmark.id)}
                    className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <MdDelete className="text-xl mr-1" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}