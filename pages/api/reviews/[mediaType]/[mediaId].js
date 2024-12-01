import prisma from '../../../../lib/prisma';

const getReviewsByMedia = async (req, res) => {
  const { mediaType, mediaId } = req.query;

  let reviews;
  if (mediaType === 'anime') {
    reviews = await prisma.review.findMany({
      where: { animeId: parseInt(mediaId) },
      include: {
        user: true,  // Menyertakan informasi user yang memberikan review
      },
    });
  } else if (mediaType === 'manga') {
    reviews = await prisma.review.findMany({
      where: { mangaId: parseInt(mediaId) },
      include: {
        user: true,  // Menyertakan informasi user yang memberikan review
      },
    });
  } else {
    return res.status(400).json({ error: 'Invalid media type' });
  }

  return res.status(200).json(reviews);
};

export default getReviewsByMedia;
