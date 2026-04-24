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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPraticien = async () => {
      try {
        const response = await axios.get(`${API_URL}praticiens/recherche`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPraticienList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        setLoading(false);
      }
    };
    fetchPraticien(); 
  }, [token]); 
  
  const handleDelete = async (id) => {
      if (!window.confirm('Supprimer ce praticien ?')) return;
      try {
          await axios.delete(`${API_URL}praticiens/suppr`, {
              headers: { Authorization: `Bearer ${token}` },
              data: { id_praticien: id } 
          });
          setPraticienList(praticienList.filter((p) => p.id_praticien !== id));
      } catch (error) {
          alert("Erreur lors de la suppression");
      }
  };

  if (loading) return <div><b>Chargement des praticiens....</b></div>

  const filteredPraticien = praticienList.filter((p) => {
    const search = searchTerm.toLowerCase();
    const nom = (p.nom_praticien).toLowerCase();    
    return nom.includes(search);
  });

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un praticien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="frais-table-container">
        <h2>Liste des Praticiens</h2>
        <table className="frais-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Spécialité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPraticien.map((p, index) => (
              <tr key={`${p.id_praticien}-${index}`}>
                <td>{p.id_praticien}</td>
                <td>{p.prenom_praticien}</td>
                <td>{p.nom_praticien}</td>
                <td>{p.adresse_praticien}</td>
                <td>{p.lib_specialite || 'Généraliste'}</td>
                <td>
                  <button onClick={() => navigate(`/praticien/modifier/${p.id_praticien}`)} className="edit-button">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(p.id_praticien)} className="delete-button" style={{ marginLeft: '5px', backgroundColor: '#dc3545', color: 'white' }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PraticienTable;