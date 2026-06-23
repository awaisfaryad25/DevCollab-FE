"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Emily Kim",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
  },
  {
    name: "Michael Steward",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
  },
  {
    name: "Emma Rodriguez",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  },
  {
    name: "Julia Gimmel",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054",
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
  },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCarousel = (index: number) => {
    setCurrentIndex(
      (index + teamMembers.length) % teamMembers.length
    );
  };

  const getPositionClass = (index: number) => {
    const offset =
      (index - currentIndex + teamMembers.length) %
      teamMembers.length;

    switch (offset) {
      case 0:
        return "z-10 scale-110 opacity-100 translate-x-0";
      case 1:
        return "z-5 scale-90 opacity-90 translate-x-[200px]";
      case 2:
        return "z-0 scale-80 opacity-70 translate-x-[400px]";
      case teamMembers.length - 1:
        return "z-5 scale-90 opacity-90 -translate-x-[200px]";
      case teamMembers.length - 2:
        return "z-0 scale-80 opacity-70 -translate-x-[400px]";
      default:
        return "opacity-0 pointer-events-none";
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] px-4">
      {/* Background Title */}
      <h1 className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7.5rem] font-black uppercase tracking-tight text-transparent bg-gradient-to-b from-[#082A7B]/35 to-transparent bg-clip-text">
        OUR TEAM
      </h1>

      {/* Carousel */}
      <div className="relative mt-20 h-[450px] w-full max-w-[1200px]">
        {/* Left */}
        <button
          onClick={() => updateCarousel(currentIndex - 1)}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#082A7B]/60 text-white transition hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cards */}
        <div className="relative flex h-full items-center justify-center">
          {teamMembers.map((member, index) => {
            const offset =
              (index - currentIndex + teamMembers.length) %
              teamMembers.length;

            const grayscale =
              offset === 0 ? "" : "grayscale";

            return (
              <div
                key={index}
                onClick={() => updateCarousel(index)}
                className={`absolute h-[380px] w-[280px] cursor-pointer overflow-hidden rounded-[20px] shadow-2xl transition-all duration-700 ${getPositionClass(
                  index
                )}`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover transition-all duration-700 ${grayscale}`}
                />
              </div>
            );
          })}
        </div>

        {/* Right */}
        <button
          onClick={() => updateCarousel(currentIndex + 1)}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#082A7B]/60 text-white transition hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Member Info */}
      <div className="mt-10 text-center">
        <h2 className="relative inline-block text-4xl font-bold text-[#082A7B] md:text-5xl">
          {teamMembers[currentIndex].name}

          <span className="absolute top-full right-[calc(100%+20px)] h-[2px] w-24 bg-[#082A7B]" />
          <span className="absolute top-full left-[calc(100%+20px)] h-[2px] w-24 bg-[#082A7B]" />
        </h2>

        <p className="mt-2 text-lg uppercase tracking-[0.15em] text-[#848696]">
          {teamMembers[currentIndex].role}
        </p>
      </div>

      {/* Dots */}
      <div className="mt-12 flex gap-3">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => updateCarousel(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentIndex === index
                ? "scale-125 bg-[#082A7B]"
                : "bg-[#082A7B]/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}