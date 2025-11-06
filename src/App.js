import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import {AuthProvider} from './context/AuthContext.js'


function App() {
  return (
    <BrowserRouter>
    <div >
    <Navbar/>
    </div>

    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
