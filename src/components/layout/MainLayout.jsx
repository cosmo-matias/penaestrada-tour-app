// src/components/layout/MainLayout.jsx
import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
    return (
        <div>
            <header>
                <h1>Pé Na Estrada Tour</h1>
                <nav>
                    <Link to="/">Dashboard</Link> | <Link to="/passageiros">Passageiros</Link>
                </nav>
            </header>
            <hr />
            <main>
                <Outlet /> {/* O conteúdo da página atual será renderizado aqui */}
            </main>
        </div>
    );
}