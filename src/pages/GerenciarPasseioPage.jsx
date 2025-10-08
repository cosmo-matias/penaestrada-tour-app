// src/pages/GerenciarPasseioPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPasseioById } from '../services/passeios.service';
import { SeatMap } from '../components/passeios/SeatMap';

export function GerenciarPasseioPage() {
    const { passeioId } = useParams();
    const [passeio, setPasseio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPasseio = async () => {
            try {
                const data = await getPasseioById(passeioId);
                setPasseio(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPasseio();
    }, [passeioId]);

    if (loading) return <p>Carregando dados do passeio...</p>;
    if (!passeio) return <p>Passeio não encontrado.</p>;

    return (
        <div>
            <h2>Gerenciar: {passeio.nomeDestino}</h2>
            <p>Data: {new Date(passeio.data).toLocaleDateString()}</p>
            <hr />
            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Coluna do Mapa de Assentos */}
                <div style={{ flex: 1 }}>
                    <h3>Mapa de Assentos</h3>
                    <SeatMap
                        capacidade={passeio.transporte.capacidade}
                        passageirosAlocados={passeio.passageirosAlocados}
                    />
                </div>
                {/* Coluna da Lista de Passageiros */}
                <div style={{ flex: 1 }}>
                    <h3>Passageiros Alocados ({passeio.passageirosAlocados?.length || 0})</h3>
                    <ul>
                        {passeio.passageirosAlocados && passeio.passageirosAlocados.map(p => (
                            <li key={p.passageiroId}>
                                Poltrona {p.poltrona}: {p.nome}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}