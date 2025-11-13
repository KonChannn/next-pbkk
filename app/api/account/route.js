import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma"; // Prisma client

// Middleware untuk otentikasi
async function authenticateSession() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}

// GET: Ambil data akun
export async function GET() {
  const session = await authenticateSession();
  if (!session) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, username: true, email: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH: Perbarui data akun
export async function PATCH(req) {
  const session = await authenticateSession();
  if (!session) return;

  const { username, password } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(username && { username }),
        ...(password && { password }), // Hash password terlebih dahulu
      },
    });

    return NextResponse.json({
      message: "Account updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}

// DELETE: Hapus akun
export async function DELETE() {
  const session = await authenticateSession();
  if (!session) return;

  try {
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}