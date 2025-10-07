// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PassageirosPage } from './pages/PassageirosPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="passageiros" element={<PassageirosPage />} />
            </Route>
        </Routes>
    );
}

export default App;