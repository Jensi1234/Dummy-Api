import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg  navbar">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Post</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <Link class="navbar-brand" to="/user">User</Link>
                    </div>
                </div>
            </nav>

        </>
    )


}

export default Navbar;