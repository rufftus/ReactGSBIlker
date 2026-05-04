import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/authService";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function InvitationsGestion() {
    const { idPraticien } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [praticien, setPraticien] = useState(null);
    const [activites, setActivites] = useState([]);
    const [selectedAct, setSelectedAct] = useState("");
    const [isSpecialiste, setIsSpecialiste] = useState("N");

    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        loadData();
    }, [idPraticien]);

    const loadData = async () => {
        const [resP, resA] = await Promise.all([
            axios.get(`${API_URL}invitations/praticien/${idPraticien}`, { headers }),
            axios.get(`${API_URL}activites`, { headers })
        ]);
        setPraticien(resP.data);
        setActivites(resA.data);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}invitations`, {
                id_praticien: idPraticien,
                id_activite_compl: selectedAct,
                specialiste: isSpecialiste
            }, { headers });
            loadData(); // Recharger la liste
            alert("Invitation ajoutée !");
        } catch (e) { alert("Erreur : déjà invité ou problème serveur"); }
    };

    const handleDelete = async (idAct) => {
        if (!window.confirm("Supprimer l'invitation ?")) return;
        await axios.delete(`${API_URL}invitations/${idAct}/${idPraticien}`, { headers });
        loadData();
    };

    if (!praticien) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Invitations du Dr. {praticien.nom_praticien}</h2>

            {/* Formulaire d'ajout */}
            <form onSubmit={handleAdd} className="card p-3 mb-4 bg-light">
                <h5>Ajouter une invitation</h5>
                <div className="row">
                    <div className="col-md-6">
                        <select className="form-select" required value={selectedAct} onChange={e => setSelectedAct(e.target.value)}>
                            <option value="">-- Choisir une activité --</option>
                            {activites.map(a => <option key={a.id_activite_compl} value={a.id_activite_compl}>{a.theme_activite}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={isSpecialiste} onChange={e => setIsSpecialiste(e.target.value)}>
                            <option value="N">Non Spécialiste</option>
                            <option value="O">Spécialiste</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success w-100">Ajouter</button>
                    </div>
                </div>
            </form>

            <table className="table table-striped border">
                <thead className="table-dark">
                    <tr><th>Activité</th><th>Date</th><th>Spécialiste</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {praticien.activites.map(act => (
                        <tr key={act.id_activite_compl}>
                            <td>{act.theme_activite}</td>
                            <td>{act.date_activite}</td>
                            <td>{act.pivot.specialiste === 'O' ? 'Oui' : 'Non'}</td>
                            <td><button onClick={() => handleDelete(act.id_activite_compl)} className="btn btn-danger btn-sm">Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/praticiens/recherche')} className="btn btn-secondary">Retour</button>
        </div>
    );
}

export default InvitationsGestion;