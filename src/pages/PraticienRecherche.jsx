import React, { useState, useEffect } from "react";
import { API_URL } from "../services/authService";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import "../styles/FraisTable.css"; // On réutilise le même CSS pour garder le même design

function PraticienTable() {
  const { token } = useAuth();
  const navigate = useNavigate();

  // Les states adaptés aux praticiens
  const [praticienList, setPraticienList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [minCoef, setMinCoef] = useState("");

  // Récupération des données depuis l'API Laravel
  useEffect(() => {
    const fetchPraticiens = async () => {
      try {
        // Appel de la route que tu as définie dans routes/api.php
        const response = await axios.get(`${API_URL}praticiens/recherche`, {
          headers: { Authorization: `Bearer ${token}` }, // Au cas où tu la sécurises plus tard avec Sanctum
        });
        setPraticienList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des praticiens:', error);
        setLoading(false);
      }
    };
    fetchPraticiens(); 
  }, [token]); 

  // Affichage pendant le chargement
  if (loading) return <div><b>Chargement des praticiens....</b></div>

  // Logique de filtrage (même principe que pour les frais)
  const filteredPraticiens = praticienList
    // 1. Filtre par recherche texte (Nom, Prénom ou Ville)
    .filter((praticien) => {
        const nom = praticien.nom_praticien ? praticien.nom_praticien.toLowerCase() : "";
        const prenom = praticien.prenom_praticien ? praticien.prenom_praticien.toLowerCase() : "";
        const ville = praticien.ville_praticien ? praticien.ville_praticien.toLowerCase() : "";
        const search = searchTerm.toLowerCase();
        
        return nom.includes(search) || prenom.includes(search) || ville.includes(search);
    })
    // 2. Filtre par coefficient de notoriété minimum (équivalent du montant minimum)
    .filter((praticien) =>
      minCoef === "" || (praticien.coef_notoriete !== null && Number(praticien.coef_notoriete) >= Number(minCoef))
    );

  return (
    <>
      {/* --- ZONE DE FILTRES --- */}
      <div className="filter-min-montant">
        <label>
          Coefficient de notoriété minimum :{" "}
          <input
            type="number"
            placeholder="Ex: 300"
            value={minCoef}
            onChange={(e) => setMinCoef(e.target.value)}
            min="0"
          />
        </label>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* --- TABLEAU D'AFFICHAGE --- */}
      <div className="frais-table-container">
        <h2>Liste des Praticiens</h2>

        <table className="frais-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Adresse</th>
              <th>Code Postal</th>
              <th>Ville</th>
              <th>Coef. Notoriété</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPraticiens.map((praticien) => (
              <tr key={praticien.id_praticien}>
                <td>{praticien.id_praticien}</td>
                <td><b>{praticien.nom_praticien}</b></td>
                <td>{praticien.prenom_praticien}</td>
                <td>{praticien.adresse_praticien}</td>
                <td>{praticien.cp_praticien}</td>
                <td>{praticien.ville_praticien}</td> 
                <td>
                    {/* Affiche le coef ou un tiret s'il n'y en a pas */}
                    {praticien.coef_notoriete ? <span style={{color: 'green'}}>{praticien.coef_notoriete}</span> : '-'}
                </td>

                <td>
                  {/* Bouton d'action (exemple de redirection si tu crées une page de détails plus tard) */}
                  <button 
                    onClick={() => navigate(`/praticiens/details/${praticien.id_praticien}`)}
                    className="edit-button"
                    style={{ backgroundColor: '#17a2b8', color: 'white' }}>
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
            
            {/* Message si aucun résultat */}
            {filteredPraticiens.length === 0 && (
                <tr>
                    <td colSpan="8" style={{textAlign: "center", padding: "15px"}}>
                        Aucun praticien trouvé avec ces critères.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PraticienTable;