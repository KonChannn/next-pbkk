"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

interface Media {
  id: number;
  title: string;
  synopsis?: string;
  imageUrl?: string;
  score?: number;
  genres?: string;
  status?: string;
}

interface FilterOptions {
  genre: string;
  score: number;
  status: string;
}

export default function ExplorePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [animeList, setAnimeList] = useState<Media[]>([]);
  const [mangaList, setMangaList] = useState<Media[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<Media[]>([]);
  const [filteredManga, setFilteredManga] = useState<Media[]>([]);
  const [activeSection, setActiveSection] = useState<'anime' | 'manga'>('anime');
  const [searchTerm, setSearchTerm] = useState("");
  const [animeFilters, setAnimeFilters] = useState<FilterOptions>({
    genre: '',
    score: 0,
    status: ''
  });
  const [mangaFilters, setMangaFilters] = useState<FilterOptions>({
    genre: '',
    score: 0,
    status: ''
  });

  const getUniqueGenres = (mediaList: Media[]) => {
    const allGenres = mediaList
      .map(item => item.genres?.split(',') || [])
      .flat()
      .map(genre => genre.trim());
    return [...new Set(allGenres)].filter(Boolean);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animeRes, mangaRes] = await Promise.all([
          fetch('/api/anime'),
          fetch('/api/manga')
        ]);
        
        const animeData = await animeRes.json();
        const mangaData = await mangaRes.json();
        
        setAnimeList(animeData);
        setMangaList(mangaData);
        setFilteredAnime(animeData);
        setFilteredManga(mangaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterMedia = (
    mediaList: Media[],
    filters: FilterOptions,
    search: string
  ) => {
    return mediaList.filter(item => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesGenre = !filters.genre || 
        item.genres?.toLowerCase().includes(filters.genre.toLowerCase());
      const matchesScore = !filters.score || 
        (item.score && item.score >= filters.score);
      const matchesStatus = !filters.status || 
        item.status === filters.status;

      return matchesSearch && matchesGenre && matchesScore && matchesStatus;
    });
  };

  useEffect(() => {
    setFilteredAnime(filterMedia(animeList, animeFilters, searchTerm));
  }, [animeList, animeFilters, searchTerm]);

  useEffect(() => {
    setFilteredManga(filterMedia(mangaList, mangaFilters, searchTerm));
  }, [mangaList, mangaFilters, searchTerm]);

  const animeGenres = getUniqueGenres(animeList);
  const mangaGenres = getUniqueGenres(mangaList);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gray-300/50 z-10" />
        <img 
          src="/japanese-street.jpg" 
          alt="Japanese Street"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-gray-800">
          <h1 className="text-5xl font-bold mb-2">エクスプローラー</h1>
          <p className="text-xl mb-6">アニメとマンガの世界へようこそ</p>
          <p className="text-lg">Explore Anime and Manga</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-100 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded bg-gray-200 text-gray-800"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 rounded bg-gray-200 text-gray-800"
              onChange={(e) => {
                if (activeSection === 'anime') {
                  setAnimeFilters({ ...animeFilters, genre: e.target.value });
                } else {
                  setMangaFilters({ ...mangaFilters, genre: e.target.value });
                }
              }}
            >
              <option value="">All Genres</option>
              {(activeSection === 'anime' ? animeGenres : mangaGenres).map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <select
              className="p-2 rounded bg-gray-200 text-gray-800"
              onChange={(e) => {
                if (activeSection === 'anime') {
                  setAnimeFilters({ ...animeFilters, score: Number(e.target.value) });
                } else {
                  setMangaFilters({ ...mangaFilters, score: Number(e.target.value) });
                }
              }}
            >
              <option value="0">All Scores</option>
              {[7, 8, 9].map(score => (
                <option key={score} value={score}>{score}+ ★</option>
              ))}
            </select>
            <select
              className="p-2 rounded bg-gray-200 text-gray-800"
              onChange={(e) => {
                if (activeSection === 'anime') {
                  setAnimeFilters({ ...animeFilters, status: e.target.value });
                } else {
                  setMangaFilters({ ...mangaFilters, status: e.target.value });
                }
              }}
            >
              <option value="">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeSection === 'anime'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
            onClick={() => setActiveSection('anime')}
          >
            アニメ Anime
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeSection === 'manga'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
            onClick={() => setActiveSection('manga')}
          >
            マンガ Manga
          </button>
        </div>

        <AnimatePresence>
          {activeSection === 'anime' ? (
            <motion.div
              key="anime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Featured Anime Carousel */}
              <div className="mb-12">
                <h2 className="text-2xl text-gray-800 mb-6 font-bold">
                  注目のアニメ Featured Anime
                </h2>
                <Swiper
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={3}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[EffectCoverflow, Autoplay, Navigation]}
                  className="w-full"
                >
                  {filteredAnime.slice(0, 10).map((anime) => (
                    <SwiperSlide key={anime.id}>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => router.push(`/web/anime/${anime.id}`)}
                      >
                        <img
                          src={anime.imageUrl || "/placeholder.jpg"}
                          alt={anime.title}
                          className="w-full h-[400px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <h3 className="text-xl font-bold mb-2">{anime.title}</h3>
                            {anime.score && (
                              <div className="flex items-center justify-center">
                                <span className="text-yellow-400">★</span>
                                <span className="ml-1">{anime.score}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Filtered Anime Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredAnime.map((anime) => (
                  <motion.div
                    key={anime.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/web/anime/${anime.id}`)}
                  >
                    <img
                      src={anime.imageUrl || "/placeholder.jpg"}
                      alt={anime.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-gray-800 font-bold mb-2">{anime.title}</h3>
                      {anime.score && (
                        <div className="text-yellow-400">★ {anime.score}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="manga"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Featured Manga Carousel */}
              <div className="mb-12">
                <h2 className="text-2xl text-gray-800 mb-6 font-bold">
                  注目のマンガ Featured Manga
                </h2>
                <Swiper
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={3}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[EffectCoverflow, Autoplay, Navigation]}
                  className="w-full"
                >
                  {filteredManga.slice(0, 10).map((manga) => (
                    <SwiperSlide key={manga.id}>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => router.push(`/web/manga/${manga.id}`)}
                      >
                        <img
                          src={manga.imageUrl || "/placeholder.jpg"}
                          alt={manga.title}
                          className="w-full h-[400px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <h3 className="text-xl font-bold mb-2">{manga.title}</h3>
                            {manga.score && (
                              <div className="flex items-center justify-center">
                                <span className="text-yellow-400">★</span>
                                <span className="ml-1">{manga.score}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Filtered Manga Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredManga.map((manga) => (
                  <motion.div
                    key={manga.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/web/manga/${manga.id}`)}
                  >
                    <img
                      src={manga.imageUrl || "/placeholder.jpg"}
                      alt={manga.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-gray-800 font-bold mb-2">{manga.title}</h3>
                      {manga.score && (
                        <div className="text-yellow-400">★ {manga.score}</div>
                      )}
                      {manga.genres && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {manga.genres.split(',').slice(0, 2).map((genre, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full"
                            >
                              {genre.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

