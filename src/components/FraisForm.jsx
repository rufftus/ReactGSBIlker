import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, getCurrentUser } from '../services/authService';
import '../styles/FraisForm.css'; 
import { Link } from 'react-router-dom';
import FraisHorsForfait from './pages/FraisHorsForfait';



const FraisForm = ({ frais = null }) => {
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState("");
    const [nbJustificatifs, setNbJustificatifs] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (frais) {
            setIdFrais(frais.id_frais);
            setAnneeMois(frais.anneemois);
            setNbJustificatifs(frais.nbjustificatifs);
            setMontant(frais.montantvalide || frais.montant || '');
        }
    }, [frais]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Token manquant");

            const user = getCurrentUser();

            const fraisData = {
                anneemois: anneeMois,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
                id_visiteur: user["id_visiteur"]
            };

            if (frais) {
                fraisData["id_frais"] = idFrais;
                fraisData["montantvalide"] = parseFloat(montant);
                fraisData["id_etat"] = frais.id_etat; 

                await axios.post(`${API_URL}frais/modif`, fraisData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

            } else {
                fraisData["montant"] = parseFloat(montant);

                await axios.post(`${API_URL}frais/ajout`, fraisData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

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
            <h3>{frais ? 'Modifier le frais' : 'Saisir un frais'}</h3>
            
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
                    <label htmlFor="montant">Montant (€) :</label>
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

                <Link className="frais-hors-forfait-link" 
                to={`/frais/${idFrais}/hors-forfait`}>Frais hors forfait</Link>

                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Enregistrement...' : (frais ? 'Mettre à jour' : 'Ajouter')}
                </button>
            </form>
        </div>
    );
};

export default FraisForm;