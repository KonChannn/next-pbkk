"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation"; // Import useParams untuk mengambil parameter dari URL
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Typography, Button } from "../../../MTailwind";

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

export default function AnimeDetail() {
  const { id } = useParams() as { id: string }; // Mengambil parameter `id` dari URL
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function fetchAnimeDetail() {
      try {
        const response = await fetch(`/api/anime/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading anime details...</div>;
  }

  if (!anime) {
    return <div className="text-center py-10">Anime not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-8 py-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={anime.imageUrl || "/placeholder-image.jpg"}
            alt={anime.title}
            className="w-72 h-96 object-cover rounded-lg shadow-lg"
          />
          <div>
            <Typography
              variant="h4"
              className="mb-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {anime.title}
            </Typography>
            <Typography
              color="gray"
              className="mb-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {anime.synopsis || "No synopsis available."}
            </Typography>
            <div className="grid grid-cols-2 gap-4">
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Score:</strong> {anime.score || "N/A"}
              </Typography>
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Episodes:</strong> {anime.episodes || "N/A"}
              </Typography>
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Status:</strong> {anime.status || "N/A"}
              </Typography>
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Airing:</strong> {anime.airing ? "Yes" : "No"}
              </Typography>
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <strong>Genres:</strong> {anime.genres || "N/A"}
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
        <Button
                    color="blue"
                    fullWidth
                    onClick={() => window.location.href = `/web/anime`}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}>
                    Back to List
                  </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
