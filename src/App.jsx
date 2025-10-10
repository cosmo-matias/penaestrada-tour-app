// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PassageirosPage } from './pages/PassageirosPage';
import { LoginPage } from './pages/LoginPage';
import { GerenciarPasseioPage } from './pages/GerenciarPasseioPage';
import { StatusPasseiosPage } from './pages/StatusPasseiosPage';
import { ProtectedRoute } from './components/common/ProtectedRoute'; // 1. IMPORTA O GUARDA

function App() {
    return (
        <Routes>
            {/* A rota de login continua pública, fora da proteção */}
            <Route path="/login" element={<LoginPage />} />

            {/* 2. ROTA DE PROTEÇÃO */}
            {/* Qualquer rota DENTRO deste elemento será verificada pelo ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="passageiros" element={<PassageirosPage />} />
                    <Route path="status" element={<StatusPasseiosPage />} />
                    <Route path="passeio/:passeioId" element={<GerenciarPasseioPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;