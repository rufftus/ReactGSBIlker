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

    // Nouveaux states pour la modification
    const [editingId, setEditingId] = useState(null);
    const [editSpecialiste, setEditSpecialiste] = useState("N");

    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            loadData();
            setSelectedAct(""); // Remet la liste à zéro
        } catch (e) { alert("Erreur : Ce médecin est déjà invité à cette activité !"); }
    };

    const handleDelete = async (idAct) => {
        if (!window.confirm("Supprimer l'invitation ?")) return;
        await axios.delete(`${API_URL}invitations/${idAct}/${idPraticien}`, { headers });
        loadData();
    };

    // --- NOUVELLES FONCTIONS POUR MODIFIER ---
    const handleEditClick = (act) => {
        setEditingId(act.id_activite_compl);
        setEditSpecialiste(act.pivot.specialiste);
    };

    const handleUpdate = async (idAct) => {
        try {
            await axios.put(`${API_URL}invitations/${idAct}/${idPraticien}`, {
                specialiste: editSpecialiste
            }, { headers });
            setEditingId(null); // On ferme le mode édition
            loadData(); // On recharge les données modifiées
        } catch (e) { alert("Erreur lors de la modification"); }
    };

    if (!praticien) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Invitations du Dr. {praticien.nom_praticien}</h2>

            <form onSubmit={handleAdd} className="card p-3 mb-4 bg-light shadow-sm">
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

            <table className="table table-hover border">
                <thead className="table-dark">
                    <tr><th>Activité</th><th>Date</th><th>Spécialiste</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {praticien.activites.map(act => (
                        <tr key={act.id_activite_compl}>
                            <td>{act.theme_activite}</td>
                            <td>{act.date_activite}</td>
                            <td>
                                {/* MODE ÉDITION : Si on clique sur Modifier, on affiche une liste déroulante */}
                                {editingId === act.id_activite_compl ? (
                                    <select className="form-select form-select-sm" value={editSpecialiste} onChange={(e) => setEditSpecialiste(e.target.value)}>
                                        <option value="N">Non</option>
                                        <option value="O">Oui</option>
                                    </select>
                                ) : (
                                    act.pivot.specialiste === 'O' ? <span className="badge bg-primary">Oui</span> : <span className="badge bg-secondary">Non</span>
                                )}
                            </td>
                            <td>
                                {/* GESTION DES BOUTONS (Valider VS Modifier) */}
                                {editingId === act.id_activite_compl ? (
                                    <button onClick={() => handleUpdate(act.id_activite_compl)} className="btn btn-success btn-sm me-2">Valider</button>
                                ) : (
                                    <button onClick={() => handleEditClick(act)} className="btn btn-warning btn-sm me-2 text-dark">Modifier</button>
                                )}
                                <button onClick={() => handleDelete(act.id_activite_compl)} className="btn btn-danger btn-sm">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/praticiens/recherche')} className="btn btn-secondary mt-3">Retour à la recherche</button>
        </div>
    );
}

export default InvitationsGestion;