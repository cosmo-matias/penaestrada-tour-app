// src/pages/StatusPasseiosPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { getPasseios, updatePasseio } from '../services/passeios.service'; // 1. Importa updatePasseio

export function StatusPasseiosPage() {
    const [passeios, setPasseios] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllPasseios = async () => {
        setLoading(true);
        try {
            const data = await getPasseios();
            setPasseios(data);
        } catch (error) {
            console.error("Erro ao buscar passeios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPasseios();
    }, []);

    // 2. NOVA FUNÇÃO PARA ATUALIZAR O STATUS
    const handleStatusChange = async (passeioId, newStatus) => {
        try {
            await updatePasseio(passeioId, { status: newStatus });
            // Recarrega a lista para refletir a mudança visualmente
            await fetchAllPasseios();
        } catch (error) {
            console.error("Erro ao atualizar o status:", error);
        }
    };

    // Lógica de separação (sem alterações)
    const { passeiosEmAndamento, passeiosRealizados, passeiosCancelados } = useMemo(() => {
        const sortFunction = (a, b) => new Date(a.data) - new Date(b.data);
        return {
            passeiosEmAndamento: passeios.filter(p => !p.status || p.status === 'Em Andamento').sort(sortFunction),
            passeiosRealizados: passeios.filter(p => p.status === 'Realizado').sort(sortFunction),
            passeiosCancelados: passeios.filter(p => p.status === 'Cancelado').sort(sortFunction),
        };
    }, [passeios]);

    if (loading) return <p>Carregando...</p>;

    // 3. Componente StatusList ATUALIZADO para incluir o dropdown
    const StatusList = ({ title, data }) => (
        <div className="status-column">
            <h3>{title} ({data.length})</h3>
            <ul className="status-list">
                {data.length > 0 ? (
                    data.map(p => (
                        <li key={p.id} className="status-item">
                            <div className="status-item-details">
                                <strong>{p.nomeDestino}</strong>
                                <span>{new Date(p.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                            </div>

                            {/* DROPDOWN PARA ALTERAR O STATUS */}
                            <select
                                className="status-select"
                                value={p.status || 'Em Andamento'}
                                onChange={(e) => handleStatusChange(p.id, e.target.value)}
                            >
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Realizado">Realizado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </li>
                    ))
                ) : (
                    <li className="status-item-empty">Nenhum passeio nesta categoria.</li>
                )}
            </ul>
        </div>
    );

    return (
        <div>
            <div className="page-header">
                <h2>Status dos Passeios</h2>
            </div>
            <div className="status-page-grid">
                <StatusList title="Em Andamento" data={passeiosEmAndamento} />
                <StatusList title="Realizados" data={passeiosRealizados} />
                <StatusList title="Cancelados" data={passeiosCancelados} />
            </div>
        </div>
    );
}