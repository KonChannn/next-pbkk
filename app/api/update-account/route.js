import { hash } from "bcryptjs";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma"; // Pastikan Prisma Client sudah dikonfigurasi

export async function POST(req, res) {
  try {
    // Ambil session pengguna
    const session = await getSession({ req });

    // Validasi session, jika tidak ada session, kembalikan error
    if (!session) {
      return res.status(401).json({ message: "You must be logged in to update your account." });
    }

    // Ambil data dari body
    const { name, password } = req.body;

    // Validasi input: nama tidak boleh kosong, password opsional
    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters." });
      }
      // Mengenkripsi password jika ada password yang diubah
      updates.password = await hash(password, 10);
    }

    // Jika tidak ada perubahan yang diminta, kembalikan error
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No changes to update." });
    }

    // Update data pengguna di database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email, // Menggunakan email dari session
      },
      data: updates,
    });

    // Kirim respons sukses
    return res.status(200).json({ message: "Account updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating account:", error);
    return res.status(500).json({ message: "Failed to update account" });
  }
}
