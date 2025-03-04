"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProperty() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [costPerNight, setCostPerNight] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddImageField = () => {
    setImages([...images, ""]);
  };

  const handleChangeImage = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          costPerNight: parseFloat(costPerNight),
          availableRooms: parseInt(availableRooms),
          description,
          images: images.filter((url) => url.trim() !== ""),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create property");
      }

      router.push("/manage-hotel"); // Redirect to hotel management page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Property</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          placeholder="Cost Per Night ($)"
          value={costPerNight}
          onChange={(e) => setCostPerNight(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="number"
          placeholder="Available Rooms"
          value={availableRooms}
          onChange={(e) => setAvailableRooms(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg w-full h-28"
          required
        />

        <div>
          <p className="mb-2 font-semibold">Images (Enter Image URLs)</p>
          {images.map((url, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={url}
              onChange={(e) => handleChangeImage(index, e.target.value)}
              className="border p-3 rounded-lg w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="text-blue-500 underline mt-2"
          >
            + Add Another Image
          </button>
        </div>

        <button
          type="submit"
          className={`w-full text-white p-3 rounded-lg transition-all ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Property"}
        </button>
      </form>
    </div>
  );
}
