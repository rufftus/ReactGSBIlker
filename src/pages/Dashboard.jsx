import { useAuth } from '../context/AuthContext';
import FraisTable from '../components/FraisTable';

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1>
                Bienvenue {user?.nom_visiteur}
            </h1>
            <FraisTable />
        </div>
    );
}
