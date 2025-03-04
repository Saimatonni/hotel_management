import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET - Fetch all properties
export async function GET(req) {
  try {
    const properties = await prisma.property.findMany({
      include: { owner: true, images: true, reviews: true },
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

// POST - Create a new property
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, address, costPerNight, availableRooms, description, images } = body;

    const property = await prisma.property.create({
      data: {
        name,
        address,
        costPerNight,
        availableRooms,
        description,
        ownerId: session.user.id,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}



