"use client";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        {children}
        <button onClick={() => router.back()} className="mt-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}
