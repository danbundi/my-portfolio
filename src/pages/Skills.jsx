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
        // end: "bottom 85%",
        // scrub: true,
        toggleActions: "play reverse play reverse",
      }
    });

    // Header first
    tl.from(skillsText.current, {
      opacity: 0,
    //   yPercent: 30,
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
    }, "-=0.3"); // overlap slightly for smoother feel

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
        <section ref={skillsSection} className=" relative py-28 bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-20">
            <span ref={skillsText} className="text-emerald-300 font-mono text-xs tracking-[0.4em]">
                TECH STACK
            </span>

            <h2 ref={skillsHeader} className="mt-4 text-4xl md:text-5xl font-bold opacity-0">
                Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123524] to-cyan-300">
                Skills
                </span>
            </h2>
            </div>

            {/* Skill Grid */}
            <div ref={skillsGrid} className="grid md:grid-cols-3 gap-10">
                {/* Frontend */}
                <div className="p-8 bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-emerald-400/30 transition duration-300 opacity-0 will-change-transform">
                    <h3 className="text-xl font-semibold text-emerald-300 mb-4">
                    Frontend
                    </h3>
                    <ul ref={skills1} className="space-y-3 text-gray-300">
                    <li>React / Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>GSAP / Animations</li>
                    <li>Responsive Design</li>
                    </ul>
                </div>

                {/* Backend */}
                <div className="p-8 bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-cyan-400/30 transition duration-300 opacity-0 will-change-transform">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                    Backend
                    </h3>
                    <ul ref={skills2} className="space-y-3 text-gray-300">
                    <li>Node.js / Express</li>
                    <li>REST API Design</li>
                    <li>Authentication (JWT)</li>
                    <li>MongoDB / PostgreSQL</li>
                    </ul>
                </div>

                {/* DevOps */}
                <div className="p-8 bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-emerald-400/30 transition duration-300 opacity-0 will-change-transform">
                    <h3 className="text-xl font-semibold text-emerald-300 mb-4">
                    DevOps
                    </h3>
                    <ul ref={skills3} className="space-y-3 text-gray-300">
                    <li>Docker</li>
                    <li>CI/CD Pipelines</li>
                    <li>Cloud Deployment</li>
                    <li>Performance Optimization</li>
                    </ul>
                </div>
            </div>
        </div>
        </section>
    </>
  )
};

export default Skills;