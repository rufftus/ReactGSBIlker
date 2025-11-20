import React, { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import "../styles/FraisTable.css";

// TODO (question 3): déclarer un composant fonctionnel FraisTable
function FraisTable() {

  // TODO (question 4): Déclarer l'état 'frais' avec useState
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const[filterNonNull,setFilterNonNull]=useState(true);
  const[minMontant, setMinMontant] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);
  }, []);

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
