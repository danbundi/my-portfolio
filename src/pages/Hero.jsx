import React from 'react'
import trashed1767035063Img20251129Wa0021RemovebgPreview1 from '../assets/photo2.png'
import gsap from 'gsap';
import SplitText from 'gsap/src/SplitText';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

  const frontendBar = useRef(null);
  const backendBar = useRef(null);
  const devopsBar = useRef(null);

  const frontendPercent = useRef(null);
  const backendPercent = useRef(null);
  const devopsPercent = useRef(null);
  const buttonRef = useRef(null);
  const rightText = useRef(null);

  const leftPar = useRef(null);
  const leftText = useRef(null);
  const leftObjs = useRef(null);

  useLayoutEffect(() => {

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    const tl2 = gsap.timeline({ delay: 0.5 });

    // Left side animation
    const split = new SplitText(leftText.current, { type: "words" });

    tl2.from(leftPar.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out"
    })

    tl2.fromTo(split.words, {
      opacity: 0,
      yPercent: 100
    }, {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.05,
      force3D: true
    })

    tl2.from(leftObjs.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1
    })

    // Frontend
    tl.to(rightText.current, {
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })

    tl.to(frontendBar.current, {
      width: "95%",
      duration: 1.2,
      ease: "power3.out"
    })
    .to(frontendPercent.current, {
      innerText: 95,
      duration: 1.2,
      snap: { innerText: 1 },
      ease: "power3.out",
      onUpdate: function () {
        frontendPercent.current.innerText = Math.round(frontendPercent.current.innerText) + "%";
      }
    }, "<")

    // Backend
    .to(backendBar.current, {
      width: "66%",
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.6")
    .to(backendPercent.current, {
      innerText: 66,
      duration: 1.2,
      snap: { innerText: 1 },
      ease: "power3.out",
      onUpdate: function () {
        backendPercent.current.innerText = Math.round(backendPercent.current.innerText) + "%";
      }
    }, "<")

    // DevOps
    .to(devopsBar.current, {
      width: "55%",
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.6")
    .to(devopsPercent.current, {
      innerText: 55,
      duration: 1.2,
      snap: { innerText: 1 },
      ease: "power3.out",
      onUpdate: function () {
        devopsPercent.current.innerText = Math.round(devopsPercent.current.innerText) + "%";
      }
    }, "<")
    
    .to(buttonRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power3.out"
    });

  }, heroRef);

  return () => ctx.revert();
}, []);


  return (
    <main 
      ref={heroRef} 
      className="bg-gradient-to-b from-gray-900 to-gray-800 w-full min-h-screen relative flex flex-col justify-end items-center overflow-hidden px-4">
  {/* Background pattern/dots for texture */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.1)_1px,transparent_0)] bg-[length:40px_40px]" />
  
  {/* Phthalo Green circle behind the head */}
  <div 
    className="absolute bottom-[30%] w-[350px] h-[350px] bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 rounded-full mix-blend-overlay opacity-80 blur-[1px] animate-spin"
    role="presentation"
    aria-hidden="true"
  />
  
  
  {/* Glow effect for the circle */}
  <div 
    className="absolute bottom-[30%] w-[350px] h-[350px] bg-gradient-to-br from-emerald-400/30 to-cyan-300/20 rounded-full blur-xl"
    role="presentation"
    aria-hidden="true"
  />
  
  <div className="relative z-20 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between mb-8 lg:mb-0">
    
    {/* Left side text */}
    <div className="text-left mb-10 lg:mb-0 lg:w-1/3 lg:pr-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#123524] animate-pulse"></div>
        <span className="text-emerald-300 text-sm font-mono tracking-widest">HELLO WORLD</span>
      </div>
      
      <h1 ref={leftPar} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        Crafting Digital
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#123524] to-cyan-300">
          Experiences
        </span>
      </h1>
      
      <p ref={leftText} className="text-gray-300 text-lg mb-6 leading-relaxed will-change-transform">
        I architect seamless full-stack solutions that bridge 
        <span className="text-emerald-300 font-semibold"> design </span>
        with
        <span className="text-cyan-300 font-semibold"> functionality</span>.
        Transforming complex problems into elegant, scalable applications.
      </p>
      
      <div ref={leftObjs} className="flex flex-wrap gap-3">
        <div className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
          <span className="text-emerald-300 font-mono text-sm">React/Next.js</span>
        </div>
        <div className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
          <span className="text-cyan-300 font-mono text-sm">Node.js</span>
        </div>
        <div className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
          <span className="text-emerald-300 font-mono text-sm">TypeScript</span>
        </div>
      </div>
    </div>
    
    {/* Center Image */}
    <div className="relative flex justify-center w-full lg:w-1/3">
      <img
        className="relative z-10 w-[500px] lg:w-[600px] h-auto max-h-[100vh] bottom-0 object-contain drop-shadow-2xl"
        alt="Full-Stack Developer Portrait"
        src={trashed1767035063Img20251129Wa0021RemovebgPreview1}
      />
    </div>
    
    {/* Right side text */}
    <div className="text-right mt-10 lg:mt-0 lg:w-1/3 lg:pl-8 animate-fadeIn">
      <div className="flex justify-end items-center gap-3 mb-4">
        <span className="text-cyan-300 text-sm font-mono tracking-widest">AVAILABLE FOR WORK</span>
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>
      
      <h2 ref={rightText} className="text-3xl md:text-4xl font-bold text-white mb-6 opacity-0">
        Full-Stack
        <span className="block text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 to-cyan-300">
          Developer
        </span>
      </h2>
      
      <div className="space-y-4 mb-8">
        {/* Frontend */}
        <div className="text-gray-300">
          <div className="flex justify-between items-center mb-1">
            <span className="text-emerald-300 font-semibold">Frontend</span>
            <span ref={frontendPercent} className="text-sm">0%</span>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              ref={frontendBar} 
              className="h-full w-[0%] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Backend */}
        <div className="text-gray-300">
          <div className="flex justify-between items-center mb-1">
            <span className="text-cyan-300 font-semibold">Backend</span>
            <span ref={backendPercent} className="text-sm">0%</span>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              ref={backendBar}
              className="h-full w-[0%] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>
        
        {/* devops */}
        <div className="text-gray-300">
          <div className="flex justify-between items-center mb-1">
            <span className="text-cyan-300 font-semibold">Devops</span>
            <span ref={devopsPercent} className="text-sm">0%</span>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              ref={devopsBar}  
              className="h-full w-[0%] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <button ref={buttonRef} className="group opacity-0 relative px-8 py-3 bg-gradient-to-r from-[#123524] to-cyan-600  font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/30">
        <span className="relative z-10">View My Projects.</span>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute z-50 bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
      <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2"></div>
      
    </div>
  </div>
</main>
  )
}

export default Hero;