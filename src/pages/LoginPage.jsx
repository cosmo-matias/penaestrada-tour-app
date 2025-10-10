// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import logo from '../assets/logoPeNaEstradaTour.png'; // Importa a logo

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/'); // Redireciona para o Dashboard após o login
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={logo} alt="Pé Na Estrada Tour Logo" className="app-logo" />
                <h2>Gerenciador de Viagens</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="form-input"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="form-input"
                        required
                    />

                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>

                <p className="login-error">{error}</p>
            </div>
        </div>
    );
}