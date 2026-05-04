import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-content">

        <div className="nav-left">
          <span className="logo">GSB Frais</span>
          <Link to="/" className="nav-link">Accueil</Link>

          {user && (
            <>
              <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
              <Link to="/frais/ajouter" className="nav-link">Ajouter Frais</Link>

              {/* --- Début des liens Mission 7 --- */}
              <Link to="/praticiens/top" className="nav-link">Top 5 Spécialités</Link>
              <Link to="/praticiens/specialite" className="nav-link">Par Spécialité</Link>
              <Link to="/praticiens/recherche" className="nav-link">Recherche & Invitations</Link>
              {/* --- Fin des liens Mission 7 --- */}
            </>
          )}
        </div>

        <div className="nav-right">
          {user ? (
            <button onClick={logoutUser} className="nav-link logout-btn">
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="nav-link">Connexion</Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;