import React, { useState, useEffect } from "react";
import {API_URL } from "../services/authService";
import axios from "axios";
import {useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom'; 
import "../styles/FraisTable.css";

function FraisTable() {
  const {user, token }= useAuth();
  const navigate = useNavigate();

  const [fraisList, setFraisList]= useState([]);
  const [loading, setLoading]= useState(true);
  const [searchTerm, setSearchTerm]= useState("");
  const [filterNonNull, setFilterNonNull]= useState(false); 
  const [minMontant, setMinMontant]= useState("");

  useEffect(()=> {
    const fetchFrais = async () => {
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleDelete= async (id) => {
      if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce frais?')) return;

      try {
          await axios.delete(`${API_URL}frais/suppr`, {
              headers: {Authorization: `Bearer ${token}`},
              data: {id_frais: id} 
          });
          
          setFraisList(fraisList.filter((frais)=> frais.id_frais !== id));
      } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          alert("Erreur lors de la suppression du frais");
      }
  };

  if (loading) return <div><b>Chargement des frais....</b></div>

  const filteredFrais = fraisList
    .filter((f)=> !filterNonNull || f.montantvalide !== null)
    .filter((frais)=>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm))
    .filter((f) =>
      minMontant=== "" || (f.montantvalide !== null && f.montantvalide > Number(minMontant)));

  return (
    <>
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e)=> setFilterNonNull(e.target.checked)}
          />
          Afficher seulement les frais avec un montant valide
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
          placeholder="Rechercher par année-mois..."
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
              <th>Nb Justif.</th>
              <th>Montant saisi</th>
              <th>Montant validé</th>
              <th>Actions</th>
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
                <td>{frais.montant} €</td> 
                <td>{frais.montantvalide || '-'} </td>

                <td>
                  <button 
                    onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                    className="edit-button">
                    Modifier
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(frais.id_frais)}
                    className="delete-button"
                    style={{ marginLeft: '5px', backgroundColor: '#dc3545', color: 'white' }}>
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

export default FraisTable;