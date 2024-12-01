import { authenticate } from '../../../lib/middleware/auth';  // Middleware untuk autentikasi
import prisma from '../../../lib/prisma';

const getUserReviews = async (req, res) => {
  const userId = req.user.id;

  const reviews = await prisma.review.findMany({
    where: { userId },
    include: {
      anime: true,
      manga: true,
    },
  });

  return res.status(200).json(reviews);
};

export default authenticate(getUserReviews);  // Proteksi API dengan middleware autentikasi
