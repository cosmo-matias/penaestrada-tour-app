// src/components/layout/MainLayout.jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';
import logo from '../../assets/logoPeNaEstradaTour.png'; // Importe a logo

export function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div>
            <header className="app-header">
                <img src={logo} alt="Pé Na Estrada Tour Logo" className="app-logo" />
                <nav className="nav-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/passageiros">Passageiros</Link>
                    <Link to="/status">Status dos Passeios</Link>
                </nav>
                <button onClick={handleLogout} className="btn btn-secondary">Sair</button>
            </header>
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}