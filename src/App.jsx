import { useState } from 'react'
import './App.css'
import Hero from './pages/Hero'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import About from './pages/ImageSwapSection'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Nothing from './pages/Nothing'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills/>
      <Projects/>
      <Nothing/>
    </>
  )
}

export default App
