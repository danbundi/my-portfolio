import { useState } from 'react'
import './App.css'
import Hero from './pages/Hero'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import About from './pages/ImageSwapSection'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  )
}

export default App
