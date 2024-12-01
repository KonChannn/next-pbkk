import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mangaList = await prisma.manga.findMany();
      res.status(200).json(mangaList);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch manga data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
