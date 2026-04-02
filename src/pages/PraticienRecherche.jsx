import React, { useState, useEffect } from "react";
import {API_URL } from "../services/authService";
import axios from "axios";
import {useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom'; 
import "../styles/FraisTable.css";

function PraticienTable() {
  const {user, token }= useAuth();
  const navigate = useNavigate();

  const [praticienList, setPraticienList]= useState([]);
  const [loading, setLoading]= useState(true);
  const [searchTerm, setSearchTerm]= useState("");
  const [filterNonNull, setFilterNonNull]= useState(false); 

  useEffect(()=> {
    const fetchPraticien = async () => {
      try {
        const response = await axios.get(`${API_URL}praticiens/recherche/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPraticienList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de la liste des praticiens:', error);
        setLoading(false);
      }
    };
    fetchPraticien(); 
  }, [user, token]); 

  const handleDelete= async (id) => {
      if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce praticien?')) return;

      try {
          await axios.delete(`${API_URL}praticiens/suppr`, {
              headers: {Authorization: `Bearer ${token}`},
              data: {id_praticien: id} 
          });
          
          setPraticienList(praticienList.filter((praticien)=> praticien.id_praticien !== id));
      } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          alert("Erreur lors de la suppression du praticien");
      }
  };

  if (loading) return <div><b>Chargement des praticiens....</b></div>

  const filteredPraticien = praticienList
    .filter((p)=> !filterNonNull || p.montantvalide !== null)
    .filter((praticien)=>
      praticien.nom_praticien.includes(searchTerm));

  return (
    <>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois..."
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
              <th>Prenom praticien</th>
              <th>Nom praticien</th>
              <th>Adresse praticien</th>
            </tr>
          </thead>

          <tbody>
            {filteredPraticien.map((praticien) => (
              <tr key={praticien.id_praticien}>
                <td>{praticien.nom_praticien}</td>
                <td>{praticien.prenom_praticien}</td>
                <td>{praticien.adresse_praticien}</td>
                <td>
                  <button 
                    onClick={() => navigate(`/frais/modifier/${praticien.id_praticien}`)}
                    className="edit-button">
                    Modifier
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(praticien.id_praticien)}
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

export default PraticienTable;