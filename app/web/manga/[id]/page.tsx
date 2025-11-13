"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Button } from "../../../MTailwind";

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

export default function MangaDetail() {
  const { id } = useParams() as { id: string };
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function fetchMangaDetail() {
      try {
        const response = await fetch(`/api/manga/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch manga details");
        }
        const data = await response.json();
        setManga(data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMangaDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-10">Loading manga details...</div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-10">Manga not found</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-8 py-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-auto flex flex-col items-center">
            <img
              src={manga.imageUrl || "/placeholder-image.jpg"}
              alt={manga.title}
              className="w-72 h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="flex-1">
            <Typography
              variant="h4"
              className="mb-4 font-bold"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {manga.title}
            </Typography>
            
            <Typography
              color="gray"
              className="mb-6 leading-relaxed"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {manga.synopsis || "No synopsis available."}
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Score:</strong> 
                <span className="bg-blue-100 px-2 py-1 rounded">
                  {manga.score || "N/A"}
                </span>
              </Typography>
              
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Chapters:</strong> 
                <span>{manga.chapters || "Ongoing"}</span>
              </Typography>
              
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Volumes:</strong> 
                <span>{manga.volumes || "N/A"}</span>
              </Typography>
              
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Status:</strong> 
                <span className={`px-2 py-1 rounded ${
                  manga.publishing 
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {manga.status || "N/A"}
                </span>
              </Typography>
              
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Publishing:</strong> 
                <span>{manga.publishing ? "Yes" : "No"}</span>
              </Typography>
              
              <Typography
                className="flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Author:</strong> 
                <span>{manga.author || "Unknown"}</span>
              </Typography>
              
              <Typography
                className="col-span-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Genres:</strong> 
                <div className="flex flex-wrap gap-2 mt-2">
                  {manga.genres?.split(',').map((genre, index) => (
                    <span 
                      key={index}
                      className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                    >
                      {genre.trim()}
                    </span>
                  )) || "N/A"}
                </div>
              </Typography>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button
            color="blue"
            className="px-6 py-2 transition-transform hover:scale-105"
            onClick={() => window.location.href = `/web/manga`}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Back to Manga List
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}