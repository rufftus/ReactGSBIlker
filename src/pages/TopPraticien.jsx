import React, { useEffect, useState } from 'react';
import { praticienService } from '../services/praticienService';

const TopPraticien = () => {
    const [tops, setTops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTops = async () => {
            try {
                const data = await praticienService.getTopSpecialites();
                setTops(data);
            } catch (error) {
                console.error("Erreur tops:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTops();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Top 5 des Spécialités (Invitations)</h2>
            <p className="text-muted">Spécialités comptant le plus de praticiens invités à des activités.</p>

            {loading ? (
                <div className="text-center">Chargement...</div>
            ) : (
                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Rang</th>
                            <th>Spécialité</th>
                            <th>Nombre de praticiens invités</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tops.map((item, index) => (
                            <tr key={index}>
                                <td><strong>{index + 1}</strong></td>
                                <td>{item.lib_specialite}</td>
                                <td>
                                    <span className="badge bg-success" style={{ fontSize: '1rem' }}>
                                        {item.nb_invites} praticiens
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TopPraticien;