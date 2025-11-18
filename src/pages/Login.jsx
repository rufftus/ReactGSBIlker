import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginUser(login, password)) {
            navigate('/dashboard');
        } else {
            alert('Identifiants incorrects');
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
