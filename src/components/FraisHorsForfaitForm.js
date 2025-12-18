import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {API_URL } from '../services/authService';
import '../styles/FraisHorsForfait.css';

const FraisHorsForfaitForm= ({fraisHF= null, idFrais}) => {
const navigate= useNavigate();
const [date, setDate] = useState("");
const [montant, setMontant]= useState("");
const [libelle, setLibelle]= useState("");
const [loading, setLoading]= useState(false);
const [error, setError]= useState("");

    useEffect(()=> {
        if (fraisHF) {
            setDate(fraisHF.date_fraishorsforfait);
            setMontant(fraisHF.montant_fraishorsforfait);
            setLibelle(fraisHF.lib_fraishorsforfait);
        }
    }, [fraisHF]);

    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const token= localStorage.getItem('token');
        
        try {
            if (fraisHF) {
                const data = {
                    id_fraisHF: fraisHF.id_fraishorsforfait,
                    date: date,
                    libelle: libelle,
                    montant: parseFloat(montant)
                };
                await axios.post(`${API_URL}fraisHF/modif`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                const data = {
                    id_frais: idFrais,
                    date: date,
                    libelle: libelle,
                    montant: parseFloat(montant)
                };
                await axios.post(`${API_URL}fraisHF/ajout`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate(`/frais/${idFrais}/hors-forfait`);

        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="frais-hors-forfait-container">
            <h3>{fraisHF ? "Modifier le frais hors forfait" : "Ajouter un frais hors forfait"}</h3>
            <div style={{color: 'red'}}>{error}</div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date :</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e)=> setDate(e.target.value)} 
                        required />
                </div>
                <div className="form-group">
                    <label>Libellé :</label>
                    <input 
                        type="text" 
                        value={libelle} 
                        onChange={(e) => setLibelle(e.target.value)} 
                        required/>
                </div>
                <div className="form-group">
                    <label>Montant :</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        value={montant} 
                        onChange={(e) => setMontant(e.target.value)} 
                        required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : "Valider"}
                </button>
            </form>
        </div>
    );
};

export default FraisHorsForfaitForm;