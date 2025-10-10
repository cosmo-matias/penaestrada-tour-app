// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PassageirosPage } from './pages/PassageirosPage';
import { LoginPage } from './pages/LoginPage';
import { GerenciarPasseioPage } from './pages/GerenciarPasseioPage';
import { StatusPasseiosPage } from './pages/StatusPasseiosPage';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="passageiros" element={<PassageirosPage />} />
                <Route path="passeio/:passeioId" element={<GerenciarPasseioPage />} />
                <Route path="status" element={<StatusPasseiosPage />} />
            </Route>
        </Routes>
    );
}

export default App;