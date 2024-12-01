// pages/api/media.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Ambil semua media (anime/manga) dari database
      const media = await prisma.media.findMany();
      res.status(200).json(media);
    } catch (error) {
      console.error('Error fetching media from database:', error);
      res.status(500).json({ error: 'Failed to fetch media' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
