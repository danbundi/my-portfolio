import { useState } from 'react'
import './App.css'
import Hero from './pages/Hero'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import About from './pages/ImageSwapSection'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Nothing from './pages/Nothing'
import Gallery from './pages/Gallery'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills/>
      <Projects/>
      <Gallery/>
      <Contact/>
    </>
  )
}

export default App
