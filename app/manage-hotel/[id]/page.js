"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        console.log("Property Details:", data);

        if (!res.ok) throw new Error(data.error || "Failed to fetch property details");

        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); 
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading property details...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Listings
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={property.images?.[0]?.url || "/placeholder.jpg"}
          alt={property.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-gray-600">{property.address}</p>
        <p className="text-gray-800 font-semibold">${property.costPerNight} / night</p>
        <p className="mt-4 text-gray-700">{property.description}</p>
        <p className="mt-2 text-gray-600">Available Rooms: {property.availableRooms}</p>

        <p className="mt-2 flex items-center gap-1 text-yellow-500 text-lg font-semibold">
          <FaStar /> {calculateAverageRating(property.reviews)} / 5
        </p>

        <button className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          Book Now
        </button>

        <div className="mt-6 flex gap-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-800">
            <FaFacebook />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Check out this property: ${property.name}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:text-blue-600">
            <FaTwitter />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${property.name}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl hover:text-blue-900">
            <FaLinkedin />
          </a>
          <a href={`https://api.whatsapp.com/send?text=Check out this property: ${property.name} - ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl hover:text-green-700">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}