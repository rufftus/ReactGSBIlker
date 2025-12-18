import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './pages/FraisEdit.jsx';
import FraisHorsForfait from './pages/FraisHorsForfait';
import FraisHorsForfaitAdd from './pages/FraisHorsForfaitAdd';
import FraisHorsForfaitEdit from './pages/FraisHorsForfaitEdit';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element=
          {<PrivateRoute>
            <Dashboard/>
            </PrivateRoute>}/>

          <Route path="/frais/ajouter" element=
          {<PrivateRoute>
            <FraisAdd/>
            </PrivateRoute>}/>
          
          <Route path="/frais/modifier/:id" element=
          {<PrivateRoute>
            <FraisEdit/>
            </PrivateRoute>}/>

          <Route path="/frais/:id/hors-forfait" element=
          {<PrivateRoute>
            <FraisHorsForfait/>
            </PrivateRoute>}/>
          
          <Route path="/frais/:id/hors-forfait/ajouter" element={<PrivateRoute>
            <FraisHorsForfaitAdd/>
            </PrivateRoute>}/>
          
          <Route path="/frais/:id/hors-forfait/modifier/:idHF" 
          element={<PrivateRoute><FraisHorsForfaitEdit /></PrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;