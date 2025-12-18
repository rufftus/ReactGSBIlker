import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/authService';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm';

const FraisHorsForfaitEdit= ()=> {
    const {id, idHF } = useParams();
    const [fraisHF, setFraisHF]= useState(null);
    const [loading, setLoading]= useState(true);

    useEffect(()=> {
        const fetchOneFraisHF= async ()=> {
            try {
                const token= localStorage.getItem('token');
                const response= await axios.get(`${API_URL}fraisHF/${idHF}`, {
                    headers: {Authorization: `Bearer ${token}` }
                });
                setFraisHF(response.data);
            } catch (error) {
                console.error("Erreur récupération:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOneFraisHF();
    }, [idHF]);

    if (loading) return <div>Chargement...</div>;

    return (
        <div>
            {fraisHF && <FraisHorsForfaitForm idFrais={id} fraisHF={fraisHF} />}
        </div>
    );
};

export default FraisHorsForfaitEdit;