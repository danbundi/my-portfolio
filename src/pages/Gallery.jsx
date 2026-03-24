import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import img1 from "../assets/gallery/cookship.png";
import img2 from "../assets/gallery/Frame.png";
import img3 from "../assets/gallery/youthservice.png";
import img4 from "../assets/gallery/kinyozi.png";
import img5 from "../assets/gallery/Headphones.png";
import img6 from "../assets/gallery/yummy.png";
import img7 from "../assets/gallery/delicious delicacies.png"
import img8 from "../assets/gallery/MioaRides.png"
import img9 from "../assets/gallery/peppermint.png"
import img10 from "../assets/gallery/bodybutter.png"
import img11 from "../assets/gallery/guardian.png"

const initialImages = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10, img11
];

const Gallery = () => {
  const gridRef = useRef(null);
  const isAnimating = useRef(false);

  const getRandomImages = (arr, count) => {
    const copy = [...arr];
    const result = [];

    while (result.length < count && copy.length > 0) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }

    return result;
  };

  const [images, setImages] = useState(() =>
    getRandomImages(initialImages, 10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const newImages = getRandomImages(initialImages, 10);

      const items = gridRef.current?.querySelectorAll(".gallery-item");

      gsap.to(items, {
        scale: 0.85,
        opacity: 0.4,
        duration: 0.25,
        stagger: 0.02,
        onComplete: () => {
          setImages(newImages);

          requestAnimationFrame(() => {
            const newItems = gridRef.current?.querySelectorAll(".gallery-item");

            gsap.fromTo(
              newItems,
              { scale: 0.85, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.03,
                ease: "power3.out",
                onComplete: () => {
                  isAnimating.current = false;
                },
              }
            );
          });
        },
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-20">

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Gallery
          </span>
        </h2>
        <p className="text-gray-400 mt-3">
          Posters, designs and creative visuals
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
      >
        {images.map((img) => (
          <div
            key={img}
            className="gallery-item relative overflow-hidden rounded-xl group cursor-pointer"
          >
            <img
              src={img}
              alt="poster"
              className="w-[200px] h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>

            <div className="absolute inset-0 border border-transparent group-hover:border-emerald-400/40 rounded-xl transition"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;