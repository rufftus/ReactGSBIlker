import {useState } from 'react';

import '../styles/Login.css';

export default function Login() {
    const [login, setLogin]= useState('');
    const [password, setPassword]= useState('');


    const handleSubmit= async(e) => {
        e.preventDefault();


        
        
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
