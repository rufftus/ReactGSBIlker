import React from 'react';
import {useNavigate} from 'react-router-dom';

const FraisHorsForfaitTable= ({fraisHorsForfaitList, total, idFrais, onDelete }) => {
    const navigate= useNavigate();

    return (
        <div>
            <table className="frais-hors-forfait-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Libellé</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fraisHorsForfaitList.map((hf) => (
                        <tr key={hf.id_fraishorsforfait}>
                            <td>{hf.date_fraishorsforfait}</td>
                            <td>{hf.montant_fraishorsforfait} €</td>
                            <td>{hf.lib_fraishorsforfait}</td>
                            <td>
                                <button 
                                    className="edit-button"
                                    onClick={() => navigate(`/frais/${idFrais}/hors-forfait/modifier/${hf.id_fraishorsforfait}`)}
                                    style={{ marginRight: '5px' }}>
                                    Modifier
                                </button>
                                
                                <button 
                                    className="delete-button"
                                    style={{ backgroundColor: '#dc3545' }}
                                    onClick={() => onDelete(hf.id_fraishorsforfait)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="total">
                Total : {total} €
            </div>

                <button 
                    onClick={() => navigate(`/frais/${idFrais}/hors-forfait/ajouter`)}
                    style={{ backgroundColor: '#28a745', marginRight: '10px' }}>
                    Ajouter
                </button>
            </div>
    );
};

export default FraisHorsForfaitTable;