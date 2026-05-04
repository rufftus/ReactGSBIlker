import React, { useState, useEffect } from "react";
import { API_URL } from "../services/authService";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/FraisTable.css";

function PraticienTable() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [praticienList, setPraticienList] = useState([]);
  const [types, setTypes] = useState([]); // Pour le filtre Type
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        // On récupère les praticiens et les types en parallèle
        const [resPraticiens, resTypes] = await Promise.all([
          axios.get(`${API_URL}praticiens/recherche`, { headers }),
          axios.get(`${API_URL}praticiens/types`, { headers })
        ]);
        setPraticienList(resPraticiens.data);
        setTypes(resTypes.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div><b>Chargement des praticiens....</b></div>

  // Filtrage par Nom ET par Type (Mission 7)
  const filteredPraticien = praticienList.filter((p) => {
    const matchNom = p.nom_praticien.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = selectedType === "" || p.id_type_praticien.toString() === selectedType;
    return matchNom && matchType;
  });

  return (
    <div className="container mt-4">
      <h2>Recherche de Praticiens</h2>

      <div className="row mb-4 bg-light p-3 rounded shadow-sm">
        <div className="col-md-5">
          <input
            type="text" className="form-control"
            placeholder="Rechercher par nom..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <select className="form-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">-- Tous les types --</option>
            {types.map(t => (
              <option key={t.id_type_praticien} value={t.id_type_praticien}>{t.lib_type_praticien}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="frais-table-container">
        <table className="frais-table">
          <thead>
            <tr>
              <th>Nom / Prénom</th>
              <th>Ville</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPraticien.map((p) => (
              <tr key={p.id_praticien}>
                <td>{p.nom_praticien} {p.prenom_praticien}</td>
                <td>{p.ville_praticien}</td>
                <td>{p.type_praticien?.lib_type_praticien || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => navigate(`/invitations/${p.id_praticien}`)}
                    className="btn btn-info btn-sm">
                    Gérer les Invitations
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PraticienTable;