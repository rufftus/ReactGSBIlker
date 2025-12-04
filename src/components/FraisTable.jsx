import React, { useState, useEffect } from "react";
import { API_URL } from "../services/authService";

import axios from "axios";
import { useAuth } from '../context/AuthContext';
import "../styles/FraisTable.css";

// TODO (question 3): déclarer un composant fonctionnel FraisTable
function FraisTable() {
  const { user, token } = useAuth();
  // TODO (question 4): Déclarer l'état 'frais' avec useState
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const[filterNonNull,setFilterNonNull]=useState(true);
  const[minMontant, setMinMontant] = useState("");

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });// Requête get à l'API à l'url
  //'http://gsb.julliand.etu.lmdsio.com/api/frais/liste/{id_visiteur}'

        setFraisList(response.data);
        // TODO : Met à jour l'état avec les données de l'API

        setLoading(false);
        // TODO : Met fin à l'état de chargement

        } catch (error) {
          console.error('Erreur lors de la récupération des frais:', error);
          setLoading(false);
          // TODO : Arrête le chargement même en cas d'erreur
        }
    };

    fetchFrais(); // Appelle la fonction pour récupérer les données
  }, [user,token]); // Tableau de dépendances vide = exécute une seule fois


  if (loading) return <div><b>Chargement des frais....</b></div>


  const filteredFrais = fraisList
    .filter((f) => !filterNonNull || f.montantvalide !== null)
    .filter((frais) =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm))
    .filter((f) =>
    minMontant==="" || (f.montantvalide !== null && f.montantvalide > Number(minMontant)));

  return (
    <>

    <div className="filter-container">
      <label>
        <input
        type="checkbox"
        checked={filterNonNull}
        onChange={(e) =>setFilterNonNull(e.target.checked)}
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
          onChange={(e) => setSearchTerm(e.target.value)} // Met à jour searchTerm
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
              <th>Nombres de Justificatifs</th>
              <th>Date de modification</th>
              <th>Montant saisi</th>
              <th>Montant validé</th>
            </tr>
          </thead>

          <tbody>
            {filteredFrais.map((frais) => (
              <tr key={frais.id}>
                <td>{frais.id}</td>
                <td>{frais.id_etat}</td>
                <td>{frais.anneemois}</td>
                <td>{frais.id_visiteur}</td>
                <td>{frais.nbjustificatifs}</td>
                <td>{frais.datemodification}</td>
                <td>{/* Montant saisi vide pour l'instant */}</td>
                <td>{frais.montantvalide}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FraisTable;
