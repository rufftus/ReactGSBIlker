import React, { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import "../styles/FraisTable.css";

function FraisTable() {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [minMontant, setMinMontant] = useState(""); // Étape 8

  // Simulation chargement
  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <p>Chargement des frais...</p>;
  }

  // ----------------------------
  // FILTRAGES (Étapes 4, 6 et 8)
  // ----------------------------

  let filteredFrais = fraisList;

  // Étape 6 → case à cocher : afficher uniquement les montants validés
  if (filterNonNull) {
    filteredFrais = filteredFrais.filter(
      (frais) => frais.montantvalide !== null
    );
  }

  // Étape 4 → recherche texte
  filteredFrais = filteredFrais.filter(
    (frais) =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm)
  );

  // Étape 8 → montant minimum
  if (minMontant !== "") {
    filteredFrais = filteredFrais.filter(
      (frais) =>
        frais.montantvalide !== null &&
        frais.montantvalide >= parseFloat(minMontant)
    );
  }

  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      {/* Étape 6 : case à cocher */}
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
          />
          Afficher uniquement les montants validés
        </label>
      </div>

      {/* Étape 4 : champ de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Étape 8 : champ montant minimum */}
      <div className="search-container">
        <input
          type="number"
          placeholder="Montant validé minimum..."
          value={minMontant}
          onChange={(e) => setMinMontant(e.target.value)}
        />
      </div>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Justificatifs</th>
            <th>Date Modification</th>
            <th>Montant Validé</th>
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
              <td>{frais.montantvalide ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FraisTable;
