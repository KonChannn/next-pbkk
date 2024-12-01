import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const secret = process.env.JWT_SECRET || 'your-secret-key';

const loginHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  // Buat token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

  return res.status(200).json({ token });
};

export default loginHandler;
