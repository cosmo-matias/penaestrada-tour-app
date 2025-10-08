// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PassageirosPage } from './pages/PassageirosPage';
import { LoginPage } from './pages/LoginPage';
import { GerenciarPasseioPage } from './pages/GerenciarPasseioPage';
// Futuramente, criaremos o componente ProtectedRoute
// Por enquanto, vamos deixar as rotas abertas para montar a estrutura

function App() {
    return (
        <Routes>
            {/* Rota de Login é pública */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rotas protegidas dentro do Layout Principal */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="passageiros" element={<PassageirosPage />} />
                <Route path="passeio/:passeioId" element={<GerenciarPasseioPage />} />
            </Route>
        </Routes>
    );
}



export default App;