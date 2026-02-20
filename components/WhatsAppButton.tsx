// components/WhatsAppButton.tsx
"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

const WhatsAppButton = () => {
  const phoneNumber = "2347015770234";
  const message =
    "Hello DSA, I would like to make an inquiry about your programs.";
  const encodedMessage = encodeURIComponent(message);

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group flex items-center gap-3"
    >
      {/* Tooltip */}
      <span className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100">
        Chat with us
      </span>

      {/* Button with Ping Animation */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
          <MessageCircle className="w-8 h-8 fill-current" />
        </div>
      </div>
    </Link>
  );
};

export default WhatsAppButton;
