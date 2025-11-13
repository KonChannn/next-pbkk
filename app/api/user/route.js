import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle GET request (READ user data)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        reviews: true,
        Bookmark: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// Handle POST request (CREATE user)
export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password, // Hash the password before storing it (optional)
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// Handle PUT request (UPDATE user)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, username, password } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(username && { username }),
        ...(password && { password }), // Hash the password before storing it (optional)
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// Handle DELETE request (DELETE user)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
