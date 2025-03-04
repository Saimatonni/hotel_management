"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditHotel() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    costPerNight: "",
    availableRooms: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id]);

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/${id}`);
  
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  
      const text = await res.text(); // Get raw response text
      if (!text) throw new Error("Empty response from server");
  
      const data = JSON.parse(text); // Parse JSON safely
      setFormData({
        name: data.name || "",
        address: data.address || "",
        costPerNight: data.costPerNight || "",
        availableRooms: data.availableRooms || "",
        description: data.description || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          costPerNight: Number(formData.costPerNight),  
          availableRooms: Number(formData.availableRooms), 
        }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update property");
  
      alert("Property updated successfully!");
      router.push("/manage-hotel"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Property Name" className="w-full p-2 border rounded" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
        <input type="number" name="costPerNight" value={formData.costPerNight} onChange={handleChange} placeholder="Cost per Night" className="w-full p-2 border rounded" required />
        <input type="number" name="availableRooms" value={formData.availableRooms} onChange={handleChange} placeholder="Available Rooms" className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required></textarea>

        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
