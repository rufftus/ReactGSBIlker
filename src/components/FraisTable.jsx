import React, { useState, useEffect } from "react";
import { API_URL } from "../services/authService";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
// 1. IMPORT NÉCESSAIRE POUR LA NAVIGATION
import { useNavigate } from 'react-router-dom'; 
import "../styles/FraisTable.css";

function FraisTable() {
  const { user, token } = useAuth();
  
  // 2. DÉCLARATION DU HOOK DE NAVIGATION
  const navigate = useNavigate();

  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(false); 
  const [minMontant, setMinMontant] = useState("");

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setFraisList(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Erreur lors de la récupération des frais:', error);
        setLoading(false);
      }
    };

    fetchFrais(); 
  }, [user, token]); 


  if (loading) return <div><b>Chargement des frais....</b></div>


  const filteredFrais = fraisList
    .filter((f) => !filterNonNull || f.montantvalide !== null)
    .filter((frais) =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm))
    .filter((f) =>
      minMontant === "" || (f.montantvalide !== null && f.montantvalide > Number(minMontant)));

  return (
    <>
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
          />
          Afficher seulement les frais avec un montant validé
        </label>
      </div>

      <div className="filter-min-montant">
        <label>
          Montant validé minimum :{" "}
          <input
            type="number"
            placeholder="Ex: 100"
            value={minMontant}
            onChange={(e) => setMinMontant(e.target.value)}
            min="0"
          />
        </label>
      </div>


      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois, ID visiteur ou montant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="frais-table-container">
        <h2>Liste des Frais</h2>

        <table className="frais-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Etat</th>
              <th>Année-Mois</th>
              <th>ID Visiteur</th>
              <th>Nb Justificatifs</th>
              <th>Date modif.</th>
              <th>Montant saisi</th>
              <th>Montant validé</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredFrais.map((frais) => (
              <tr key={frais.id_frais}>
                <td>{frais.id_frais}</td>
                <td>{frais.id_etat}</td>
                <td>{frais.anneemois}</td>
                <td>{frais.id_visiteur}</td>
                <td>{frais.nbjustificatifs}</td>
                <td>{frais.datemodification}</td>

                <td>{frais.montant} €</td> 

                <td>{frais.montantvalide || frais.montant} </td>

                <td>
                  <button 
                    onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                    className="edit-button"
                  >
                    Modifier
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

export default FraisTable;