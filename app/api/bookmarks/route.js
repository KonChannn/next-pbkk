import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to handle unauthorized users
function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Helper function for invalid input response
function invalidInputResponse(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// POST: Add Bookmark
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const { animeId, mangaId, mediaType } = await request.json();

    // Validate input
    if (!mediaType || (mediaType !== "anime" && mediaType !== "manga")) {
      return invalidInputResponse("Invalid mediaType. Must be 'anime' or 'manga'.");
    }
    if (!animeId && !mangaId) {
      return invalidInputResponse("Either animeId or mangaId must be provided.");
    }

    const userId = parseInt(session.user.id, 10);

    // Check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        mediaType,
        animeId: animeId || null,
        mangaId: mangaId || null,
      },
    });

    if (existingBookmark) {
      return invalidInputResponse("This item is already bookmarked.");
    }

    // Create new bookmark
    const newBookmark = await prisma.bookmark.create({
      data: {
        userId,
        mediaType,
        animeId: animeId || null,
        mangaId: mangaId || null,
      },
    });

    return NextResponse.json({
      message: "Bookmark added successfully",
      bookmark: newBookmark,
    });
  } catch (error) {
    console.error("Error in POST /bookmarks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Fetch Bookmarks
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const url = new URL(request.url);
    const mediaType = url.searchParams.get("mediaType");

    if (!mediaType || (mediaType !== "anime" && mediaType !== "manga")) {
      return invalidInputResponse("Invalid mediaType. Must be 'anime' or 'manga'.");
    }

    const userId = parseInt(session.user.id, 10);

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
        mediaType,
      },
      include: {
        ...(mediaType === "anime"
          ? {
              Anime: {
                select: {
                  id: true,
                  title: true,
                  synopsis: true,
                  imageUrl: true,
                  score: true,
                  episodes: true,
                  status: true,
                  genres: true,
                },
              },
            }
          : {
              Manga: {
                select: {
                  id: true,
                  title: true,
                  synopsis: true,
                  imageUrl: true,
                  score: true,
                  chapters: true,
                  status: true,
                  genres: true,
                },
              },
            }),
      },
    });

    const formattedBookmarks = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      mediaType: bookmark.mediaType,
      item: mediaType === "anime" ? bookmark.Anime : bookmark.Manga,
    }));

    return NextResponse.json(formattedBookmarks);
  } catch (error) {
    console.error("Error in GET /bookmarks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove Bookmark
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const bookmarkId = searchParams.get("id");

    if (!bookmarkId) {
      return invalidInputResponse("Bookmark ID is required");
    }

    const userId = parseInt(session.user.id, 10);

    // Verify bookmark belongs to user
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: parseInt(bookmarkId, 10),
        userId,
      },
    });

    if (!bookmark) {
      return invalidInputResponse("Bookmark not found or unauthorized");
    }

    // Delete bookmark
    await prisma.bookmark.delete({
      where: {
        id: parseInt(bookmarkId, 10),
      },
    });

    return NextResponse.json({
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /bookmarks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update Bookmark
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const { id, ...updateData } = await request.json();

    if (!id) {
      return invalidInputResponse("Bookmark ID is required");
    }

    const userId = parseInt(session.user.id, 10);

    // Verify bookmark belongs to user
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: parseInt(id, 10),
        userId,
      },
    });

    if (!bookmark) {
      return invalidInputResponse("Bookmark not found or unauthorized");
    }

    // Update bookmark
    const updatedBookmark = await prisma.bookmark.update({
      where: {
        id: parseInt(id, 10),
      },
      data: updateData,
    });

    return NextResponse.json({
      message: "Bookmark updated successfully",
      bookmark: updatedBookmark,
    });
  } catch (error) {
    console.error("Error in PATCH /bookmarks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
