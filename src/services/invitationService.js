// src/services/invitationService.js
const API_URL = 'http://127.0.0.1:8000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

export const invitationService = {
    // Récupérer les invitations d'un praticien
    getByPraticien: async (idPraticien) => {
        const response = await fetch(`${API_URL}/invitations/praticien/${idPraticien}`, {
            headers: getAuthHeader()
        });
        return await response.json();
    },

    // Supprimer une invitation
    delete: async (idActivite, idPraticien) => {
        const response = await fetch(`${API_URL}/invitations/${idActivite}/${idPraticien}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return await response.json();
    },

    // Récupérer toutes les activités (pour le formulaire d'ajout)
    getActivites: async () => {
        const response = await fetch(`${API_URL}/activites`, {
            headers: getAuthHeader()
        });
        return await response.json();
    }
};