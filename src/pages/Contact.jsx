import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    link: "https://wa.me/254705155010",
    color: "from-green-400 to-green-600",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/danbundi",
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/_dienbi_/",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/daniel-bundi/",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Call",
    icon: <HiOutlinePhone />,
    link: "tel:+254705155010",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    name: "Email",
    icon: <HiOutlineMail />,
    link: "mailto:danielbundi24@gmail.com",
    color: "from-purple-400 to-indigo-400",
  },
];

const Contact = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgBlobRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, cardRefs.current], {
        opacity: 0,
        y: 30
      });

      // Title animation with scroll trigger
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Subtitle animation
      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Cards animation
      gsap.to(cardRefs.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });

      // Continuous floating animation for blob
      gsap.to(bgBlobRef.current, {
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, containerRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Smooth hover effects with CSS instead of GSAP
  const handleMouseEnter = (index) => {
    const card = cardRefs.current[index];
    const icon = card?.querySelector(".contact-icon");
    
    if (card) {
      card.style.transform = "translateY(-8px) scale(1.05)";
      card.style.boxShadow = "0 20px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.1)";
    }
    if (icon) {
      icon.style.transform = "scale(1.1) rotate(3deg)";
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    const icon = card?.querySelector(".contact-icon");
    
    if (card) {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "none";
    }
    if (icon) {
      icon.style.transform = "scale(1) rotate(0)";
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center px-4 md:px-6 py-16 md:py-24 relative overflow-hidden"
      id="contact"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16 z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 relative">
            Touch
          </span>
        </h2>
        <p 
          ref={subtitleRef}
          className="text-gray-400 mt-3 text-sm md:text-base"
        >
          Connect with me through any of the platforms below
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl w-full z-10">
        {contacts.map((contact, index) => (
          <a
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="flex flex-col justify-center items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-gray-700 transition-all duration-300 ease-out cursor-pointer group"
            style={{
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
            }}
          >
            {/* Icon with gradient background */}
            <div
              className={`contact-icon w-14 h-14 md:w-16 md:h-16 flex justify-center items-center rounded-full bg-gradient-to-br ${contact.color} text-white text-xl md:text-2xl shadow-xl transition-all duration-300 ease-out`}
              style={{
                transition: 'transform 0.3s ease-out',
              }}
            >
              {contact.icon}
            </div>

            {/* Label */}
            <span className="text-white font-semibold text-sm md:text-base relative">
              {contact.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-400 group-hover:w-1/2 group-hover:left-0 transition-all duration-300"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-emerald-400 group-hover:w-1/2 group-hover:right-0 transition-all duration-300"></span>
            </span>

            {/* Hover tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-emerald-400 text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-emerald-400/30 pointer-events-none">
              Click to connect
            </div>
          </a>
        ))}
      </div>

      {/* Floating contact info */}
      <div className="mt-12 text-center z-10">
        <p className="text-gray-500 text-sm">
          Available for freelance work and collaborations
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-emerald-400 text-xs uppercase tracking-wider">Open to opportunities</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        </div>
      </div>

      {/* Background blob */}
      <div 
        ref={bgBlobRef}
        className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden"
      >
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-emerald-600/20 via-cyan-400/20 to-teal-400/20 opacity-20 blur-3xl"></div>
      </div>

      {/* Secondary blobs */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        /* Smooth transitions for all interactive elements */
        a {
          will-change: transform, box-shadow;
        }
        
        .contact-icon {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Contact;