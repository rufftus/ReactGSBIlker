import { createContext, useContext, useState, useEffect} from 'react';
import { logout, signIn, getAuthToken, getCurrentUser } from "../services/authService"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = getCurrentUser(); // Renommé pour éviter la confusion avec le state 'user'
    const recoveredToken = getAuthToken();

    if (recoveredUser && recoveredToken) {
      setUser(recoveredUser);
      setToken(recoveredToken);
    }
    
    // IMPORTANT : On arrête le chargement dans tous les cas, 
    // qu'on ait trouvé un utilisateur ou non.
    setLoading(false); 
    
  }, []);

  const loginUser = async (login, password) => {
    const data = await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.access_token);
    return data;
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}