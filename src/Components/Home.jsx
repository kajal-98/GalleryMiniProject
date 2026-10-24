import reat from 'react'
import { Link } from 'react-router-dom'
import{Navbar} from './Navbar'
export const Home = () => {
  return (
   <>
    <Navbar />
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page of the gallery project.</p>
    </div>
    </>
  )
}