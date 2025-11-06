import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';


function Navbar() {

//const { user, logoutUser } = useAuth();
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <span className="logo">GSB Frais</span>
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
        </div>
        <div className="nav-right">
          <Link to="" className="nav-link">Déconnexion</Link>
          <Link to="/login" className="nav-link">Connexion</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
