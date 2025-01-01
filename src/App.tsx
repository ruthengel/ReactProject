import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './Router'

function App() {


  return (
    <>
      <h1>Home</h1>
      <HomePage />
      <RouterProvider router={myRouter} />
    </>
  )
}

export default App
