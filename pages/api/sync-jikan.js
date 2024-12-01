import axios from 'axios';
import prisma from '../../lib/prisma';  // Pastikan prisma client sudah di-setup dengan benar

const API_URL_ANIME = 'https://api.jikan.moe/v4/anime';
const API_URL_MANGA = 'https://api.jikan.moe/v4/manga';

async function fetchAndSaveAnime() {
  const { data } = await axios.get(API_URL_ANIME);
  const animeData = data.data;
  for (let anime of animeData) {
    await prisma.anime.create({
      data: {
        title: anime.title,
        title_english: anime.title_english,
        title_japanese: anime.title_japanese,
        synopsis: anime.synopsis,
        imageUrl: anime.images.jpg.large_image_url,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        airing: anime.airing,
        genres: anime.genres.map((g) => g.name).join(', '),
        url: anime.url,
      },
    });
  }
}

async function fetchAndSaveManga() {
  const { data } = await axios.get(API_URL_MANGA);
  const mangaData = data.data;
  for (let manga of mangaData) {
    await prisma.manga.create({
      data: {
        title: manga.title,
        title_english: manga.title_english,
        title_japanese: manga.title_japanese,
        synopsis: manga.synopsis,
        imageUrl: manga.images.jpg.large_image_url,
        score: manga.score,
        chapters: manga.chapters,
        status: manga.status,
        genres: manga.genres.map((g) => g.name).join(', '),
        url: manga.url,
      },
    });
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Sync anime dan manga dari API Jikan
      await fetchAndSaveAnime();
      await fetchAndSaveManga();
      res.status(200).json({ message: 'Data synced successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync data from Jikan' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
