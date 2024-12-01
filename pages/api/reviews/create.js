import { authenticate } from '../../../lib/middleware/auth';  // Middleware untuk autentikasi
import prisma from '../../../lib/prisma';

const createReview = async (req, res) => {
    console.log(req.body);  // Menambahkan log untuk memeriksa isi request body
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { mediaType, mediaId, content, rating } = req.body;
  
    if (!mediaType || !mediaId || !content || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Validasi rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
  
    // Validasi mediaId di database
    if (mediaType === 'anime') {
      const anime = await prisma.anime.findUnique({
        where: { id: mediaId }
      });
      if (!anime) {
        return res.status(404).json({ error: 'Anime not found' });
      }
    } else if (mediaType === 'manga') {
      const manga = await prisma.manga.findUnique({
        where: { id: mediaId }
      });
      if (!manga) {
        return res.status(404).json({ error: 'Manga not found' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid media type' });
    }
  
    // Menambahkan review
    let review;
    try {
      if (mediaType === 'anime') {
        review = await prisma.review.create({
          data: {
            content,
            rating,
            animeId: mediaId,
            userId: req.user.id,  // Menambahkan ID user yang login
          },
        });
      } else if (mediaType === 'manga') {
        review = await prisma.review.create({
          data: {
            content,
            rating,
            mangaId: mediaId,
            userId: req.user.id,  // Menambahkan ID user yang login
          },
        });
      }
  
      return res.status(201).json(review);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create review' });
    }
  };  

export default authenticate(createReview);  // Proteksi API dengan middleware autentikasi
