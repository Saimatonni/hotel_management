import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    await prisma.review.deleteMany({ where: { propertyId: id } });
    await prisma.booking.deleteMany({ where: { propertyId: id } });
    await prisma.favorite.deleteMany({ where: { propertyId: id } });
    await prisma.image.deleteMany({ where: { propertyId: id } });

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
    try {
      const { params } = context;
      const id = params?.id;
  
      if (!id) {
        return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
      }
  
      const body = await req.json(); 
  
      if (!body.name || !body.address || !body.costPerNight || !body.availableRooms || !body.description) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          name: body.name,
          address: body.address,
          costPerNight: body.costPerNight,
          availableRooms: body.availableRooms,
          description: body.description,
          updatedAt: new Date(),
        },
      });
  
      return NextResponse.json({ message: "Property updated successfully", property: updatedProperty }, { status: 200 });
    } catch (error) {
      console.error("Update Error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

  export async function GET(req, { params }) {
    try {
      const id = params?.id;
  
      if (!id) {
        return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
      }
  
      const property = await prisma.property.findUnique({
        where: { id },
        include: {
          images: true, 
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          reviews: true, 
        },
      });
  
      if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
  
      return NextResponse.json(property, { status: 200 });
    } catch (error) {
      console.error("Fetch Error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  
