import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Post</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
              <FaBars />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Link className="navbar-brand" to="/user">User</Link>
          </div>
        </div>
      </nav>
    </>
  )


}

export default Navbar;