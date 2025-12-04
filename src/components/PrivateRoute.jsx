import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const {token,loading} = useAuth();
    if(loading){

        return <div>Chargement.....</div>;
    }

    return token ? children : <Navigate to="/login" />;
}
