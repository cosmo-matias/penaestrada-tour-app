// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { getPasseios, addPasseio } from '../services/passeios.service';
import { PasseioCard } from '../components/passeios/PasseioCard';
import { Modal } from '../components/common/Modal';
import { PasseioForm } from '../components/passeios/PasseioForm';

export function DashboardPage() {
    const [passeios, setPasseios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            await fetchPasseios(); // Recarrega a lista para mostrar o novo passeio
        } catch (error) {
            console.error("Erro ao cadastrar passeio:", error);
        }
    };

    if (loading) return <p>Carregando passeios...</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Agenda de Passeios</h2>
                <button onClick={() => setIsModalOpen(true)}>Cadastrar Novo Passeio</button>
            </div>
            <hr />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {passeios.length > 0 ? (
                    passeios.map(passeio => <PasseioCard key={passeio.id} passeio={passeio} />)
                ) : (
                    <p>Nenhum passeio cadastrado no momento.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Novo Passeio">
                <PasseioForm onSave={handleSavePasseio} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}