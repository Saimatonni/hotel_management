"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaHotel } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <FaHotel className="text-2xl text-yellow-400" />
        <h1 className="text-xl font-bold">Hotel Management</h1>
      </div>

      <div className="flex items-center space-x-4">
        {session ? (
          <>
            {session.user?.image && (
              <img src={session.user.image} alt="User Avatar" className="w-8 h-8 rounded-full border" />
            )}
            <span className="font-medium">{session.user?.name}</span>

            <button
              onClick={() => router.push("/manage-hotel")}
              className="bg-yellow-500 px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
            >
              Manage Hotel
            </button>

            <button
              onClick={() => signOut()}
              className="bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/auth/signin?modal=true")}
              className="bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Sign In
            </button>

            <button
              onClick={() => router.push("/auth/register?modal=true")}
              className="bg-green-500 px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
