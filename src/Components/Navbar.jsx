import reat from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>

    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f5f5f5' }}>  
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Gallery Mini Project</div>
        <div>
            <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>Home</Link>
            <Link to="/gallery" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>Gallery</Link>
            <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>About</Link>
            <Link to="/add-items" style={{ textDecoration: 'none', color: '#333' }}>Add Items</Link>
        </div>
    </nav>
    </>
  )
}