// src/components/common/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/auth.service';

export function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // O onAuthStateChanged é um "ouvinte". Ele nos diz em tempo real se o usuário está logado ou não.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Se existe um usuário, ele está autenticado
                setIsAuthenticated(true);
            } else {
                // Se não, ele não está autenticado
                setIsAuthenticated(false);
            }
            // Terminamos de verificar, então paramos de carregar
            setIsLoading(false);
        });

        // Limpa o "ouvinte" quando o componente é desmontado
        return () => unsubscribe();
    }, []);

    // Enquanto estivermos verificando a autenticação, mostramos uma mensagem de carregamento
    if (isLoading) {
        return <div>Verificando autenticação...</div>;
    }

    // Se a verificação terminou e o usuário está autenticado, renderiza a página solicitada
    if (isAuthenticated) {
        return <Outlet />; // <Outlet /> representa as rotas filhas (Dashboard, etc.)
    }

    // Se a verificação terminou e o usuário NÃO está autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
}