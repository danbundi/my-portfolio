import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import ThreeModel from "../components/ThreeModel";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const text1Heading = useRef(null);
  const text1Paragraph = useRef(null);
  const text2Heading = useRef(null);
  const text2Paragraphs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true
        }
      });

      tl.to([text1Heading.current], {
        y: -40,
        opacity: 0,
        stagger: 0.1,
        ease: "none"
      }, 0);

      tl.to(imageRef.current, {
        xPercent: 150,
        ease: "none"
      })
        .to(text1Ref.current, {
          opacity: 0,
          x: 40
        }, 0)
        .fromTo(text2Ref.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0 },
          0
        );

      tl.fromTo(
        [text2Heading.current, text2Paragraphs.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, ease: "none", delay: 0.5 },
        0.3
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden"
    >

    {/* Background texture */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.08)_1px,transparent_0)] bg-[length:40px_40px]" />

    {/* Ambient glow */}
    <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

    {/* Section Header */}
    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#123524] animate-pulse"></div>
        <span className="text-emerald-300 text-xs font-mono tracking-[0.35em]">
          SYSTEM OVERVIEW
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123524] to-cyan-300">
          Me
        </span>
      </h1>
    </div>

  <div className="relative z-10 h-screen mt-20 flex items-center justify-between px-[6vw]">

    {/* 3D Model */}
    <div ref={imageRef} className="relative w-[70vh] h-[75vh] overflow-visible">
      <ThreeModel />
    </div>

    {/* First Card */}
    <div
      ref={text1Ref}
      className="w-[38%] flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-[#123524] animate-pulse"></div>
        <span className="text-emerald-300 text-sm font-mono tracking-widest">
          ENGINEER PROFILE
        </span>
      </div>

      <h2 ref={text1Heading} className="text-4xl md:text-5xl font-bold leading-tight text-white">
        I design systems that are
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#123524] to-cyan-300">
          scalable & intentional.
        </span>
      </h2>

      <p ref={text1Paragraph} className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
        My work blends clean interface design with robust backend engineering.
        Every project is structured for performance, clarity, and long-term
        maintainability.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <div className="h-[1px] w-16 bg-gradient-to-r from-[#123524] to-cyan-400"></div>
        <span className="text-xs font-mono text-gray-400 tracking-[0.3em]">
          SYSTEM THINKING
        </span>
      </div>
    </div>

    {/* Second Card (Appears on Scroll) */}
    <div
      ref={text2Ref}
      className="absolute left-[6vw] w-[38%] opacity-0 flex flex-col"
    >
      <span className="text-cyan-400 font-mono text-xs tracking-[0.35em] mb-6">
        01 // CAPABILITIES
      </span>

      <h2 ref={text2Heading} className="text-4xl md:text-5xl font-bold leading-tight text-white mb-8">
        From concept to
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
          production deployment.
        </span>
      </h2>

      <div ref={text2Paragraphs} className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-xl">
        <p>
          I build immersive frontend experiences using
          <span className="text-emerald-300 font-medium"> React, Tailwind, and GSAP</span>.
        </p>

        <p>
          On the backend, I architect
          <span className="text-cyan-300 font-medium"> secure APIs, authentication systems, and database layers</span>
          designed for reliability and scale.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <div className="h-[1px] w-16 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
        <span className="text-xs font-mono text-gray-400 tracking-[0.3em]">
          FULL-STACK EXECUTION
        </span>
      </div>
    </div>

  </div>
</section>
    
    </>
  );
}
