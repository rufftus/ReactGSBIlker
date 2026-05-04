import React, { useEffect, useState } from 'react';
import { praticienService } from '../services/praticienService';

const PraticienSpecialite = () => {
    const [specialites, setSpecialites] = useState([]);
    const [praticiens, setPraticiens] = useState([]);
    const [selectedSpe, setSelectedSpe] = useState('');

    useEffect(() => {
        const loadSpe = async () => {
            const data = await praticienService.getSpecialites();
            setSpecialites(data);
        };
        loadSpe();
    }, []);

    const handleSearch = async (e) => {
        const id = e.target.value;
        setSelectedSpe(id);
        if (id) {
            const data = await praticienService.getPraticiensBySpecialite(id);
            setPraticiens(data);
        } else {
            setPraticiens([]);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Praticiens par Spécialité</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Sélectionnez une spécialité :</label>
                    <select className="form-select" value={selectedSpe} onChange={handleSearch}>
                        <option value="">-- Choisir --</option>
                        {specialites.map(s => (
                            <option key={s.id_specialite} value={s.id_specialite}>
                                {s.lib_specialite}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {praticiens.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {praticiens.map(p => (
                        <div className="col" key={p.id_praticien}>
                            <div className="card h-100 border-info">
                                <div className="card-body">
                                    <h5 className="card-title">Dr. {p.nom_praticien} {p.prenom_praticien}</h5>
                                    <p className="card-text">
                                        {p.adresse_praticien}<br />
                                        {p.cp_praticien} {p.ville_praticien}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : selectedSpe && (
                <p className="text-center mt-4">Aucun praticien trouvé pour cette spécialité.</p>
            )}
        </div>
    );
};

export default PraticienSpecialite;