import React, { useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsGrid = useRef(null);
    const skillsSection = useRef(null);
    const skillsText = useRef(null);
    const skillsHeader = useRef(null);
    const skills1 = useRef(null);
    const skills2 = useRef(null);
    const skills3 = useRef(null);

    useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsSection.current,
        start: "top 55%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Header first
    tl.from(skillsText.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    });

    tl.to(skillsHeader.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
    })

    // Then cards staggered
    tl.fromTo(skillsGrid.current.children, {
      opacity: 0,
      yPercent: 10,
    }, {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3");

    tl.fromTo([skills1.current.children, skills2.current.children, skills3.current.children], {
      opacity: 0,
      yPercent: 10,
    }, {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3");

  }, skillsSection);

  return () => ctx.revert();
}, []);


  return (
    <>
        <section ref={skillsSection} className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Background Blobs - responsive sizing */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top left blob - smaller on mobile */}
                <div className="absolute -top-10 sm:-top-20 left-0 sm:-left-20 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                
                {/* Center blob - responsive sizing and positioning */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                
                {/* Bottom right blob - smaller on mobile */}
                <div className="absolute -bottom-10 sm:-bottom-20 right-0 sm:-right-20 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
                
                {/* Floating particles - fewer on mobile */}
                {[...Array(window.innerWidth < 640 ? 3 : 6)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-emerald-400/20 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <span ref={skillsText} className="text-emerald-300 font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em]">
                        TECH STACK
                    </span>

                    <h2 ref={skillsHeader} className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold opacity-0">
                        Core{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123524] to-cyan-300">
                            Skills
                        </span>
                    </h2>
                </div>

                {/* Skill Grid - stacked on mobile, side by side on larger screens */}
                <div ref={skillsGrid} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {/* Frontend */}
                    <div className="p-6 sm:p-7 md:p-8 bg-gray-800/40 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-gray-700/50 hover:border-emerald-400/30 transition duration-300 opacity-0 will-change-transform">
                        <h3 className="text-lg sm:text-xl font-semibold text-emerald-300 mb-3 sm:mb-4">
                            Frontend
                        </h3>
                        <ul ref={skills1} className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                            <li>React / Next.js</li>
                            <li>Tailwind CSS</li>
                            <li>GSAP / Animations</li>
                            <li>Responsive Design</li>
                        </ul>
                    </div>

                    {/* Backend */}
                    <div className="p-6 sm:p-7 md:p-8 bg-gray-800/40 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-gray-700/50 hover:border-cyan-400/30 transition duration-300 opacity-0 will-change-transform">
                        <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">
                            Backend
                        </h3>
                        <ul ref={skills2} className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                            <li>Node.js / Express</li>
                            <li>REST API Design</li>
                            <li>Authentication (JWT)</li>
                            <li>MongoDB / PostgreSQL</li>
                        </ul>
                    </div>

                    {/* DevOps */}
                    <div className="p-6 sm:p-7 md:p-8 bg-gray-800/40 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-gray-700/50 hover:border-emerald-400/30 transition duration-300 opacity-0 will-change-transform sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-emerald-300 mb-3 sm:mb-4">
                            DevOps
                        </h3>
                        <ul ref={skills3} className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                            <li>Docker</li>
                            <li>CI/CD Pipelines</li>
                            <li>Cloud Deployment</li>
                            <li>Performance Optimization</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <style>{`
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
            }
        `}</style>
    </>
  )
};

export default Skills;