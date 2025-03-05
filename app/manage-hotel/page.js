"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import Image from "next/image";

export default function ManageHotels() {
  const { data: session } = useSession();
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 8;

  useEffect(() => {
    if (session) {
      fetchHotels();
    }
  }, [session]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch properties");
      setHotels(Array.isArray(data) ? data : data.properties || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/properties/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Failed to delete property");

          setHotels(hotels.filter((hotel) => hotel.id !== id));

          Swal.fire("Deleted!", "The property has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700">You need to sign in to manage hotels.</p>
        <button
          onClick={() => router.push("/auth/signin")}
          className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Your Hotels</h1>
        <button
          onClick={() => router.push("/manage-hotel/create")}
          className="bg-green-500 text-white flex items-center gap-2 px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          <FaPlusCircle />
          Create Property
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading properties...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {hotels.length === 0 && !loading ? (
       <p className="text-gray-500">
       No properties found. Click &quot;Create Property&quot; to add a new hotel.
     </p>
     
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white shadow-lg rounded-lg p-4 border cursor-pointer transition hover:shadow-xl"
                onClick={() => router.push(`/manage-hotel/${hotel.id}`)}
              >
                <img
                  src={hotel.images?.[0]?.url || "/placeholder.jpg"}
                  alt={hotel.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.address}</p>
                <p className="text-gray-800 font-semibold">${hotel.costPerNight} / night</p>
                <p className="text-gray-700">Rooms Available: <strong>{hotel.availableRooms}</strong></p>
                
                <p className="flex items-center gap-1 text-yellow-500">
                  <FaStar /> {calculateAverageRating(hotel.reviews)} / 5
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/manage-hotel/edit/${hotel.id}`);
                    }}
                    className="text-blue-500 flex items-center gap-2 cursor-pointer"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(hotel.id);
                    }}
                    className="text-red-500 flex items-center gap-2 cursor-pointer"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-lg shadow ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-lg shadow ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
