// src/pages/DashboardPage.jsx
import { useEffect, useState, useMemo } from 'react';
import { PasseioCard } from '../components/passeios/PasseioCard';
import { Modal } from '../components/common/Modal';
import { PasseioForm } from '../components/passeios/PasseioForm';
import { getPasseios, addPasseio, updatePasseio } from '../services/passeios.service';

export function DashboardPage() {
    const [passeios, setPasseios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchPasseios = async () => {
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
        fetchPasseios();
    }, []);

    const handleSavePasseio = async (novoPasseio) => {
        try {
            await addPasseio(novoPasseio);
            setIsModalOpen(false);
            await fetchPasseios();
        } catch (error) {
            console.error("Erro ao cadastrar passeio:", error);
        }
    };

    const handleUpdateStatus = async (passeioId, status) => {
        if (!window.confirm(`Tem certeza que deseja marcar este passeio como "${status}"?`)) {
            return;
        }
        try {
            await updatePasseio(passeioId, { status });
            setPasseios(prevPasseios => prevPasseios.filter(p => p.id !== passeioId));
        } catch (error) {
            console.error("Erro ao atualizar status do passeio:", error);
        }
    };

    const filteredAndSortedPasseios = useMemo(() => {
        return passeios
            // ===== CORREÇÃO IMPORTANTE AQUI =====
            // Primeiro, filtramos para mostrar apenas passeios "Em Andamento".
            // `!p.status` garante que passeios antigos (sem o campo status) também apareçam.
            .filter(p => !p.status || p.status === 'Em Andamento')
            // =====================================
            .filter(passeio => { // Depois, aplicamos o filtro de data
                if (!startDate && !endDate) return true;
                const passeioDate = new Date(passeio.data + 'T00:00:00');
                const start = startDate ? new Date(startDate + 'T00:00:00') : null;
                const end = endDate ? new Date(endDate + 'T00:00:00') : null;
                if (start && end) return passeioDate >= start && passeioDate <= end;
                if (start) return passeioDate >= start;
                if (end) return passeioDate <= end;
                return true;
            })
            .sort((a, b) => new Date(a.data) - new Date(b.data)); // Ordena do mais recente para o mais antigo
    }, [passeios, startDate, endDate]);

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    if (loading) return <p>Carregando passeios...</p>;

    return (
        <div>
            <div className="page-header">
                <h2>Agenda de Passeios</h2>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    Cadastrar Novo Passeio
                </button>
            </div>

            <div className="filter-container">
                <div className="filter-group">
                    <label htmlFor="startDate">De:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="endDate">Até:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button onClick={handleClearFilters} className="btn btn-secondary" style={{alignSelf: 'flex-end'}}>
                    Limpar
                </button>
            </div>

            <div className="card-grid">
                {filteredAndSortedPasseios.length > 0 ? (
                    filteredAndSortedPasseios.map(passeio => <PasseioCard key={passeio.id} passeio={passeio} onStatusChange={handleUpdateStatus} />)
                ) : (
                    <p>Nenhum passeio agendado para os filtros selecionados.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Novo Passeio">
                <PasseioForm onSave={handleSavePasseio} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}