import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 1. Importer le hook d'authentification
import { useNavigate } from 'react-router-dom';   // 2. Importer le hook de navigation
import '../styles/Login.css';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    // 3. Récupérer la fonction loginUser du contexte et le hook de navigation
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 4. Appeler la fonction de connexion définie dans AuthContext
            await loginUser(login, password);
            
            // 5. Rediriger l'utilisateur vers la page d'accueil (ou dashboard) après succès
            navigate('/'); 
        } catch (error) {
            console.error("Erreur de connexion :", error);
            alert("Échec de la connexion. Vérifiez vos identifiants.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Connexion</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Login :</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Password :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button>Valider</button>
                </form>
            </div>
        </div>
    );
}