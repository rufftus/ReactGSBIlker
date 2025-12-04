import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, getCurrentUser } from '../services/authService';
import '../styles/FraisForm.css'; 

const FraisForm = () => {
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token introuvable, vous devez être connecté.");
            }

            const fraisData = {
                anneemois: anneeMois,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
                montant: parseFloat(montant), // Ajout de parseFloat pour assurer le format numérique
                id_visiteur: getCurrentUser()["id_visiteur"]
            };

            const response = await axios.post(`${API_URL}frais/ajout`, fraisData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log("Réponse API:", response);
            navigate('/dashboard');

        } catch (err) {
            console.error('Erreur:', err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Erreur lors de l\'enregistrement'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="frais-form-container">
            <h3>Ajouter une note de frais</h3>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="frais-form">
                <div className="form-group">
                    <label htmlFor="anneeMois">Année-Mois (ex: 202310) :</label>
                    <input
                        type="text"
                        id="anneeMois"
                        className="form-input" 
                        value={anneeMois}
                        onChange={(e) => setAnneeMois(e.target.value)}
                        required
                        placeholder="AAAAMM"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nbJustificatifs">Nombre de justificatifs :</label>
                    <input
                        type="number"
                        id="nbJustificatifs"
                        className="form-input"
                        value={nbJustificatifs}
                        onChange={(e) => setNbJustificatifs(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="montant">Montant total (€) :</label>
                    <input
                        type="number"
                        id="montant"
                        step="0.01"
                        className="form-input"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Enregistrement...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
};

export default FraisForm;