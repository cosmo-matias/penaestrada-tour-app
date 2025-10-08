// src/components/passeios/PasseioCard.jsx
import { useNavigate } from 'react-router-dom';

function ProgressBar({ value, max }) {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
                <div style={{ width: `${percentage}%`, backgroundColor: '#3D7BA3', height: '10px', borderRadius: '4px' }}></div>
            </div>
        </div>
    );
}

export function PasseioCard({ passeio }) {
    const navigate = useNavigate();
    const cardStyle = { border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' };
    const vagasDisponiveis = passeio.transporte.capacidade - passeio.passageirosAlocados.length;

    const handleGerenciarClick = () => {
        navigate(`/passeio/${passeio.id}`); // Navegar ao clicar
    };

    return (
        <div style={cardStyle}>
            <h3>{passeio.nomeDestino}</h3>
            <p>{passeio.cidadeEstado} - {new Date(passeio.data).toLocaleDateString()}</p>
            <p>
                Lotação: {passeio.passageirosAlocados.length} / {passeio.transporte.capacidade}
                <br/>
                ({vagasDisponiveis} vagas disponíveis)
            </p>
            <ProgressBar value={passeio.passageirosAlocados.length} max={passeio.transporte.capacidade} />
            <button style={{marginTop: '10px'}} onClick={handleGerenciarClick}>Gerenciar</button>
        </div>
    );
}