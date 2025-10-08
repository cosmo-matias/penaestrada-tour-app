// src/pages/PassageirosPage.jsx
import { useEffect, useState } from 'react';
import { getPassageiros, addPassageiro } from '../services/passageiros.service';
import { Modal } from '../components/common/Modal';
import { PassageiroForm } from '../components/passageiros/PassageiroForm';

export function PassageirosPage() {
    const [passageiros, setPassageiros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal

    useEffect(() => {
        async function fetchPassageiros() {
            // ... função de busca existente, sem alterações ...
            try {
                const data = await getPassageiros();
                setPassageiros(data);
            } catch (error) {
                console.error("Erro ao buscar passageiros:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPassageiros();
    }, []);

    // Função para lidar com o salvamento do novo passageiro
    const handleSavePassageiro = async (novoPassageiro) => {
        try {
            const docRef = await addPassageiro(novoPassageiro);
            // Atualiza a lista na tela sem precisar buscar tudo de novo
            setPassageiros([...passageiros, { ...novoPassageiro, id: docRef.id }]);
            setIsModalOpen(false); // Fecha o modal
        } catch (error) {
            console.error("Erro ao cadastrar passageiro:", error);
            // Adicionar feedback de erro para o usuário aqui
        }
    };

    if (loading) return <p>Carregando passageiros...</p>;

    return (
        <div>
            <h2>Gerenciamento de Passageiros</h2>
            {/* Botão que abre o modal */}
            <button onClick={() => setIsModalOpen(true)}>Cadastrar Novo Passageiro</button>
            <hr />

            {/* Renderização da tabela (código existente) */}
            {passageiros.length === 0 ? (
                <p>Nenhum passageiro cadastrado.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    {/* ... thead e tbody da tabela ... */}
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
                                <button>Editar</button> <button>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Modal de Cadastro */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cadastrar Novo Passageiro"
            >
                <PassageiroForm
                    onSave={handleSavePassageiro}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}