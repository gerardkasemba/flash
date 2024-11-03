"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu visibility
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-500">
          <Link href="/">StudySync</Link>
        </div>

        {/* Nav Links for Desktop */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link href="/upload" className="text-gray-600 hover:text-blue-500">
            Upload Textbook
          </Link>
          <Link href="/mynotes" className="text-gray-600 hover:text-blue-500">
            My Notes
          </Link>
          <Link
            href="/flashcards"
            className="text-gray-600 hover:text-blue-500"
          >
            Flashcards
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-blue-500">
            Profile
          </Link>
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            {/* Insert mobile menu icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links (Only visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="space-y-4 px-4 py-2">
            <Link href="/" className="block text-gray-600 hover:text-blue-500">
              Home
            </Link>
            <Link
              href="/upload"
              className="block text-gray-600 hover:text-blue-500"
            >
              Upload Textbook
            </Link>
            <Link
              href="/notes"
              className="block text-gray-600 hover:text-blue-500"
            >
              My Notes
            </Link>
            <Link
              href="/flashcards"
              className="block text-gray-600 hover:text-blue-500"
            >
              Flashcards
            </Link>
            <Link
              href="/profile"
              className="block text-gray-600 hover:text-blue-500"
            >
              Profile
            </Link>
            <Link
              href="/login"
              className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
