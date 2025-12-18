import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import FraisHorsForfaitTable from '../components/FraisHorsForfaitTable';
import '../styles/FraisHorsForfait.css';

const FraisHorsForfait = () => {
    const { id }= useParams();
    const navigate= useNavigate();

    const [fraisHorsForfaitList, setFraisHorsForfaitList]= useState([]);
    const [loading, setLoading]= useState(true);
    const [total, setTotal]= useState(0);

    const fetchFraisHorsForfaitList= async () => {
        try {
            const token =localStorage.getItem('token');
            
            const response= await axios.get(`http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            setFraisHorsForfaitList(response.data);

            let somme= 0;
            response.data.forEach((fraisHorsForfait) => {
                somme += parseFloat(fraisHorsForfait.montant_fraishorsforfait);
            });
            setTotal(somme);

            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement:", error);
            setLoading(false);
        }
    };

    useEffect(()=> {
        if (id) {
            fetchFraisHorsForfaitList();
        }
    }, [id]);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="frais-hors-forfait-container">
            <h2>Gestion des frais hors forfait</h2>
            
            <FraisHorsForfaitTable 
                idFrais={id}
                fraisHorsForfaitList={fraisHorsForfaitList}
                total={total}
            />
            
            <button 
                className="return-button" 
                onClick={() => navigate(`/frais/modifier/${id}`)}
            >
                Retour
            </button>
        </div>
    );
};

export default FraisHorsForfait;