// src/components/layout/MainLayout.jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';

export function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div>
            <header>
                <h1>Pé Na Estrada Tour</h1>
                <nav>
                    <Link to="/">Dashboard</Link> | <Link to="/passageiros">Passageiros</Link>
                </nav>
                <button onClick={handleLogout}>Sair</button> {/* Botão de Logout */}
            </header>
            <hr />
            <main>
                <Outlet />
            </main>
        </div>
    );
}