// src/pages/PassageirosPage.jsx
import { useEffect, useState } from 'react';
import { getPassageiros } from '../services/passageiros.service';

export function PassageirosPage() {
    const [passageiros, setPassageiros] = useState([]); // Estado para armazenar a lista
    const [loading, setLoading] = useState(true); // Estado para controlar o feedback de carregamento

    useEffect(() => {
        // Função para buscar os dados
        async function fetchPassageiros() {
            try {
                const data = await getPassageiros();
                setPassageiros(data);
            } catch (error) {
                console.error("Erro ao buscar passageiros:", error);
                // Aqui você poderia adicionar um estado para exibir uma mensagem de erro na tela
            } finally {
                setLoading(false);
            }
        }

        fetchPassageiros();
    }, []); // O array vazio [] garante que isso rode apenas uma vez, quando o componente montar

    if (loading) {
        return <p>Carregando passageiros...</p>;
    }

    return (
        <div>
            <h2>Gerenciamento de Passageiros</h2>
            <button>Cadastrar Novo Passageiro</button>
            <hr />

            {passageiros.length === 0 ? (
                <p>Nenhum passageiro cadastrado.</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
        </div>
    );
}