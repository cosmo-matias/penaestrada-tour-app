// src/components/passeios/PasseioCard.jsx
import { useNavigate } from 'react-router-dom';

function ProgressBar({ value, max }) {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}

export function PasseioCard({ passeio, onStatusChange }) {
    const navigate = useNavigate();
    const vagasDisponiveis = passeio.transporte.capacidade - passeio.passageirosAlocados.length;

    const handleGerenciarClick = () => {
        navigate(`/passeio/${passeio.id}`); // Navegar ao clicar
    };

    return (
        <div className="card">
            <h3>{passeio.nomeDestino}</h3>
            <p>{passeio.cidadeEstado} - {new Date(passeio.data).toLocaleDateString()}</p>
            <p>
                Lotação: {passeio.passageirosAlocados.length} / {passeio.transporte.capacidade}
                <br/>
                ({vagasDisponiveis} vagas disponíveis)
            </p>
            <ProgressBar value={passeio.passageirosAlocados.length} max={passeio.transporte.capacidade} />
            <button className="btn btn-primary" style={{marginTop: '15px', width: '100%'}} onClick={handleGerenciarClick}>Gerenciar</button>

            {/* ===== NOVOS BOTÕES DE STATUS AQUI ===== */}
            <div className="card-actions">
                <button onClick={() => onStatusChange(passeio.id, 'Realizado')} className="btn-status btn-realizado">
                    Realizado
                </button>
                <button onClick={() => onStatusChange(passeio.id, 'Cancelado')} className="btn-status btn-cancelado">
                    Cancelado
                </button>
            </div>

        </div>
    );
}