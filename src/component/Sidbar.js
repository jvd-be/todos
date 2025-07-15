import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from 'next/router';

export default function Sidebar({ isOpen, onClose, data }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/todos/logout/', { method: 'POST' });
      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full md:w-6/12 z-50 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0 md:translate-x-0' : '-translate-y-full md:-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Menu</h2>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <IoCloseSharp className="h-5 w-5" />
        </button>
      </div>

      {/* 👤 User Info Section */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-md text-gray-600">Welcome,</p>
        <p className="text-base font-semibold text-gray-800">
          {data?.userName || 'Guest'}
        </p>
      </div>

      <nav className="flex flex-col px-4 py-4 space-y-2">
        {['Dashboard', 'Profile', 'Settings'].map((item) => (
          <span
            key={item}
            className="text-gray-700 hover:text-blue-500 text-md tracking-wide cursor-pointer transition-colors"
          >
            {item}
          </span>
        ))}
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-blue-500 text-md tracking-wide cursor-pointer transition-colors"
        >
          LogOut
        </button>
      </nav>
    </div>
  );
}
