import React from 'react';
import {useParams} from 'react-router-dom';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm';

const FraisHorsForfaitAdd= ()=> {
    const {id} = useParams();

    return (
        <div>
            <FraisHorsForfaitForm idFrais={id} />
        </div>
    );
};

export default FraisHorsForfaitAdd;