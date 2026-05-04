// src/services/praticienService.js

const API_URL = 'http://127.0.0.1:8000/api';

// Récupérer le token depuis le stockage local (LocalStorage)
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

export const praticienService = {
    // Fonctionnalité 1 : Recherche de praticiens
    getAll: async (nom = '', typeId = '') => {
        const response = await fetch(`${API_URL}/praticiens/recherche?nom=${nom}&id_type_praticien=${typeId}`, {
            headers: getAuthHeader()
        });
        return await response.json();
    },

    // Fonctionnalité 3 : Liste des spécialités et praticiens par spécialité
    getSpecialites: async () => {
        const response = await fetch(`${API_URL}/specialites`, {
            headers: getAuthHeader()
        });
        return await response.json();
    },

    getPraticiensBySpecialite: async (idSpecialite) => {
        const response = await fetch(`${API_URL}/praticiens/specialite/${idSpecialite}`, {
            headers: getAuthHeader()
        });
        return await response.json();
    },

    // Fonctionnalité 4 : Top 5 spécialités
    getTopSpecialites: async () => {
        const response = await fetch(`${API_URL}/praticiens/top-specialites`, {
            headers: getAuthHeader()
        });
        return await response.json();
    },

    // Récupérer les types de praticiens (pour le menu déroulant de recherche)
    getTypes: async () => {
        const response = await fetch(`${API_URL}/praticiens/types`, {
            headers: getAuthHeader()
        });
        return await response.json();
    }
};