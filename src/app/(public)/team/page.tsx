// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./team.css";

const teamMembers = [
  { name: "Emily Kim", role: "Founder" },
  { name: "Michael Steward", role: "Creative Director" },
  { name: "Emma Rodriguez", role: "Lead Developer" },
  { name: "Julia Gimmel", role: "UX Designer" },
  { name: "Lisa Anderson", role: "Marketing Manager" },
  { name: "James Wilson", role: "Product Manager" },
];

const cardImages = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Team = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [memberName, setMemberName] = useState(teamMembers[0].name);
  const [memberRole, setMemberRole] = useState(teamMembers[0].role);
  const [nameOpacity, setNameOpacity] = useState(1);
  const [roleOpacity, setRoleOpacity] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const index = (newIndex + teamMembers.length) % teamMembers.length;
    setCurrentIndex(index);

    setNameOpacity(0);
    setRoleOpacity(0);

    setTimeout(() => {
      setMemberName(teamMembers[index].name);
      setMemberRole(teamMembers[index].role);
      setNameOpacity(1);
      setRoleOpacity(1);
    }, 300);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleDotClick = (index: number) => {
    updateCarousel(index);
  };

  const handleCardClick = (index: number) => {
    updateCarousel(index);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateCarousel(currentIndex + 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, isAnimating]);

  return (
    <main className="main-container">
      <h1 className="about-title">OUR TEAM</h1>

      <div className="carousel-container">
        <button
          className="nav-arrow left"
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          ‹
        </button>
        <div className="carousel-track">
          {cardImages.map((img, i) => {
            const offset =
              (i - currentIndex + teamMembers.length) % teamMembers.length;
            let cardClass = "card hidden";

            if (offset === 0) cardClass = "card center";
            else if (offset === 1) cardClass = "card right-1";
            else if (offset === 2) cardClass = "card right-2";
            else if (offset === teamMembers.length - 1) cardClass = "card left-1";
            else if (offset === teamMembers.length - 2) cardClass = "card left-2";

            return (
              <div
                key={i}
                className={cardClass}
                onClick={() => handleCardClick(i)}
              >
<img
  src={img}
  alt={`Team Member ${i + 1}`}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
              </div>
            );
          })}
        </div>
        <button
          className="nav-arrow right"
          onClick={() => updateCarousel(currentIndex + 1)}
        >
          ›
        </button>
      </div>

      <div className="member-info">
        <h2
          className="member-name"
          style={{ opacity: nameOpacity, transition: "opacity 0.3s ease-out" }}
        >
          {memberName}
        </h2>
        <p
          className="member-role"
          style={{ opacity: roleOpacity, transition: "opacity 0.3s ease-out" }}
        >
          {memberRole}
        </p>
      </div>

      <div className="dots">
        {teamMembers.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </main>
  )
}

export default Team;
