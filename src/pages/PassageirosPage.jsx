// src/pages/PassageirosPage.jsx
import { useEffect, useState } from 'react';
import { getPassageiros, addPassageiro, updatePassageiro, deletePassageiro } from '../services/passageiros.service';
import { Modal } from '../components/common/Modal';
import { PassageiroForm } from '../components/passageiros/PassageiroForm';

export function PassageirosPage() {
    const [passageiros, setPassageiros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPassageiro, setEditingPassageiro] = useState(null); // Estado para controlar a edição

    // Função para buscar dados (sem alterações)
    async function fetchPassageiros() {
        try {
            const data = await getPassageiros();
            setPassageiros(data);
        } catch (error) {
            console.error("Erro ao buscar passageiros:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPassageiros();
    }, []);

    // Abre o modal para criar um novo passageiro
    const handleCreate = () => {
        setEditingPassageiro(null);
        setIsModalOpen(true);
    };

    // Abre o modal para editar um passageiro existente
    const handleEdit = (passageiro) => {
        setEditingPassageiro(passageiro);
        setIsModalOpen(true);
    };

    // Função para salvar (criação ou edição)
    const handleSave = async (passageiroData) => {
        try {
            if (editingPassageiro) {
                // Lógica de atualização
                await updatePassageiro(editingPassageiro.id, passageiroData);
                await fetchPassageiros(); // Recarrega os dados para ver a atualização
            } else {
                // Lógica de criação
                await addPassageiro(passageiroData);
                await fetchPassageiros(); // Recarrega os dados para ver o novo item
            }
            closeModal();
        } catch (error) {
            console.error("Erro ao salvar passageiro:", error);
        }
    };

    // Função para deletar
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este passageiro?")) {
            try {
                await deletePassageiro(id);
                setPassageiros(passageiros.filter(p => p.id !== id)); // Atualização otimizada da UI
            } catch (error) {
                console.error("Erro ao excluir passageiro:", error);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPassageiro(null);
    };

    if (loading) return <p>Carregando passageiros...</p>;

    return (
        <div>
            <div className="page-header">
                <h2>Gerenciamento de Passageiros</h2>
                <button onClick={handleCreate} className="btn btn-primary">Cadastrar Novo Passageiro</button>
            </div>
            <hr />
            <table className="table">
                <thead>
                <tr>
                    <th>Nome Completo</th>
                    <th>CPF</th>
                    <th>Celular</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {passageiros.map((passageiro) => (
                    <tr key={passageiro.id}>
                        <td>{passageiro.nomeCompleto}</td>
                        <td>{passageiro.cpf}</td>
                        <td>{passageiro.celular}</td>
                        <td>
                            <button onClick={() => handleEdit(passageiro)} className="btn btn-secondary">Editar</button>
                            <button onClick={() => handleDelete(passageiro.id)} className="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={editingPassageiro ? "Editar Passageiro" : "Cadastrar Novo Passageiro"}
                >
                    <PassageiroForm
                        onSave={handleSave}
                        onCancel={closeModal}
                        initialData={editingPassageiro}
                    />
                </Modal>
            )}
        </div>
    );
}