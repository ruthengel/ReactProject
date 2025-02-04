import './App.css'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './Router'

function App() {
  return (
    <RouterProvider router={myRouter} />
  )
}

export default App
