import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import projects from "../assets/projects.json";

const Projects = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const cards = gsap.utils.toArray(".project-card");
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Infinite scroll logic
      if (scrollLeft + clientWidth >= scrollWidth - 200) {
        container.scrollTo({
          left: scrollWidth / 3,
          behavior: 'instant'
        });
      }
      if (scrollLeft <= 200) {
        container.scrollTo({
          left: scrollWidth / 3,
          behavior: 'instant'
        });
      }

      // Fade edges effect - adjust based on screen size
      const centerX = window.innerWidth / 2;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(centerX - cardCenter);
        
        // Responsive fade range
        const fadeRange = window.innerWidth < 768 ? 400 : 800;
        const opacity = gsap.utils.mapRange(0, fadeRange, 1, 0.2, distanceFromCenter);
        const scale = gsap.utils.mapRange(0, fadeRange, 1, 0.9, distanceFromCenter);
        
        gsap.set(card, { opacity, scale });
      });
    };

    // Set initial position
    container.scrollLeft = container.scrollWidth / 3;

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Handle resize
    window.addEventListener("resize", handleScroll);
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center overflow-hidden py-8 md:py-0">
      
      <div className="text-center mb-6 md:mb-10 z-10 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Featured Projects</h2>
        
        {/* Decorative line with icon - responsive sizing */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-3 md:mt-4">
          <div className="w-8 md:w-12 h-px bg-emerald-500/50"></div>
          <span className="text-emerald-400 text-xs md:text-sm">✧</span>
          <div className="w-8 md:w-12 h-px bg-emerald-500/50"></div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar py-8 md:py-20 px-4 md:px-[10vw] cursor-grab active:cursor-grabbing"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex gap-4 md:gap-8 lg:gap-12">
          {[...projects, ...projects, ...projects].map((project, index) => (
            <div
              key={index}
              className="project-card w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[400px] bg-gray-800/40 border border-gray-700 rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="h-36 sm:h-40 md:h-44 lg:h-52 overflow-hidden bg-black">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{project.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a 
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm md:text-base rounded-lg transition-colors duration-300"
                >
                  <span>View Project</span>
                  <svg 
                    className="w-3 h-3 md:w-4 md:h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Add line clamp for description */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects;