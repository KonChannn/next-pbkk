import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';  // Pastikan untuk mengganti ini dengan secret yang aman

export const authenticate = (handler) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Ambil token dari Authorization header

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;  // Menyimpan data user ke req.user
      return handler(req, res);  // Menjalankan handler API setelah autentikasi
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
