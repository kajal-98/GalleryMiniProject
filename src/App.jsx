import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Gallery } from './Components/Gallery'
import { GalleryNew } from './Components/GalleryNew'
import { GalleryInfiniteScroll } from './Components/GalleryInfiniteScroll'
import { About } from './Components/About'
import { Home } from './Components/Home'
import { AddItems } from './Components/AddItems'
import {  Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/add-items" element={<AddItems />} />
      <Route path="/gallery-new" element={<GalleryNew />} />
      <Route path="/gallery-infinite-scroll" element={<GalleryInfiniteScroll />} />
    </Routes>
  )
}

export default App
