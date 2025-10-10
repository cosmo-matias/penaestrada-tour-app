// src/pages/GerenciarPasseioPage.jsx
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getPasseioById, updatePasseio } from '../services/passeios.service';
import { getPassageiros } from '../services/passageiros.service';
import { SeatMap } from '../components/passeios/SeatMap';
import { Modal } from '../components/common/Modal';
import { AlocacaoForm } from '../components/passeios/AlocacaoForm';
import { calculateAge } from '../utils/date';
import { generatePassengerListPDF } from '../services/report.service';

export function GerenciarPasseioPage() {
    const { passeioId } = useParams();
    const [passeio, setPasseio] = useState(null);
    const [todosPassageiros, setTodosPassageiros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalMode, setModalMode] = useState('closed');
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedAllocation, setSelectedAllocation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const passeioData = await getPasseioById(passeioId);
                const passageirosData = await getPassageiros();
                setPasseio(passeioData);
                setTodosPassageiros(passageirosData);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        fetchData();
    }, [passeioId]);

    const handleSeatSelect = (seatNumber, alocacao) => {
        // (código original sem alterações)
        setSelectedSeat(seatNumber);
        if (alocacao) {
            setSelectedAllocation(alocacao);
            setModalMode('managing');
        } else {
            setModalMode('allocating');
        }
    };

    const handleSaveAlocacao = async ({ responsavel, criancaDeColo, localDeEmbarque }) => {
        // (código original sem alterações)
        const novaAlocacao = {
            poltrona: selectedSeat,
            passageiroId: responsavel.id,
            criancaDeColo: criancaDeColo ? { passageiroId: criancaDeColo.id } : null,
            localDeEmbarque,
        };
        const passageirosJaAlocadosIds = (passeio.passageirosAlocados || []).flatMap(p => [p.passageiroId, p.criancaDeColo?.passageiroId]).filter(Boolean);
        if (passageirosJaAlocadosIds.includes(responsavel.id)) { alert('Este passageiro já está alocado neste passeio!'); return; }
        if (criancaDeColo && passageirosJaAlocadosIds.includes(criancaDeColo.id)) { alert('A criança de colo selecionada já está alocada neste passeio!'); return; }
        const passageirosAlocadosAtualizado = [...(passeio.passageirosAlocados || []), novaAlocacao];
        try {
            await updatePasseio(passeioId, { passageirosAlocados: passageirosAlocadosAtualizado });
            setPasseio({ ...passeio, passageirosAlocados: passageirosAlocadosAtualizado });
            closeModal();
        } catch (error) { console.error("Erro ao salvar alocação:", error); }
    };

    const handleUnallocate = async () => {
        // (código original sem alterações)
        if (!selectedAllocation) return;
        const passageirosAlocadosAtualizado = passeio.passageirosAlocados.filter(p => p.passageiroId !== selectedAllocation.passageiroId);
        try {
            await updatePasseio(passeioId, { passageirosAlocados: passageirosAlocadosAtualizado });
            setPasseio({ ...passeio, passageirosAlocados: passageirosAlocadosAtualizado });
            closeModal();
        } catch (error) { console.error("Erro ao desalocar passageiro:", error); }
    };

    const closeModal = () => {
        // (código original sem alterações)
        setModalMode('closed');
        setSelectedSeat(null);
        setSelectedAllocation(null);
    };

    const passageirosMap = useMemo(() => new Map(todosPassageiros.map(p => [p.id, p])), [todosPassageiros]);

    const listaExibicaoPassageiros = useMemo(() => {
        // (código original sem alterações, EXCETO a remoção da função handleGenerateReport)
        if (!passeio?.passageirosAlocados || passageirosMap.size === 0) return [];
        const listaPlana = [];
        passeio.passageirosAlocados.forEach(aloc => {
            const responsavel = passageirosMap.get(aloc.passageiroId);
            if (responsavel) {
                listaPlana.push({
                    id: responsavel.id, poltrona: aloc.poltrona, nome: responsavel.nomeCompleto,
                    idade: calculateAge(responsavel.dataNascimento), contato: responsavel.celular,
                    localDeEmbarque: aloc.localDeEmbarque,
                    tipo: 'Responsável',
                    rg: responsavel.rg,
                    cpf: responsavel.cpf
                });
            }
            if (aloc.criancaDeColo) {
                const crianca = passageirosMap.get(aloc.criancaDeColo.passageiroId);
                if (crianca) {
                    listaPlana.push({
                        id: crianca.id, poltrona: aloc.poltrona, nome: crianca.nomeCompleto,
                        idade: calculateAge(crianca.dataNascimento), contato: '-',
                        localDeEmbarque: aloc.localDeEmbarque,
                        tipo: 'Criança de Colo',
                        rg: crianca.rg,
                        cpf: crianca.cpf
                    });
                }
            }
        });
        return listaPlana.sort((a, b) => a.poltrona - b.poltrona);
    }, [passeio, passageirosMap]);

    // =====> FUNÇÃO MOVIDA PARA O LUGAR CORRETO <=====
    const handleGenerateReport = () => {
        if (listaExibicaoPassageiros.length === 0) {
            alert('Não há passageiros alocados para gerar o relatório.');
            return;
        }
        generatePassengerListPDF(passeio, listaExibicaoPassageiros);
    };

    if (loading) return <p>Carregando dados...</p>;
    if (!passeio) return <p>Passeio não encontrado.</p>;

    const passageirosAlocadosIds = (passeio.passageirosAlocados || []).flatMap(p => [p.passageiroId, p.criancaDeColo?.passageiroId]).filter(Boolean);
    const passageirosDisponiveis = todosPassageiros.filter(p => !passageirosAlocadosIds.includes(p.id));

    return (
        <div>
            <h2>Gerenciar: {passeio.nomeDestino}</h2>

            <div className="management-grid"> {/* Nosso novo container Flexbox */}

                {/* Card 1: Mapa de Assentos (com espaço reduzido) */}
                <div className="management-card seat-map-container">
                    <div className="card-header">
                        <h3>Mapa de Assentos</h3>
                    </div>
                    <SeatMap
                        capacidade={passeio.transporte.capacidade}
                        passageirosAlocados={passeio.passageirosAlocados}
                        onSeatSelect={handleSeatSelect}
                    />
                </div>

                {/* Card 2: Lista de Passageiros (com espaço ampliado) */}
                <div className="management-card passenger-list-container">
                    <div className="card-header">
                        <h3>Passageiros no Ônibus ({listaExibicaoPassageiros.length})</h3>
                        {/* Botão com estilo secundário para não ser a ação principal */}
                        <button onClick={handleGenerateReport} className="btn btn-secondary">
                            Gerar Relatório
                        </button>
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Pol.</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Contato</th>
                            <th>Embarque</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaExibicaoPassageiros.map(p => (
                            <tr key={p.id}>
                                <td>{p.poltrona}</td>
                                <td>{p.nome} {p.tipo === 'Criança de Colo' && <em>(Colo)</em>}</td>
                                <td>{typeof p.idade === 'number' ? `${p.idade} ${p.idade === 1 ? 'ano' : 'anos'}` : p.idade}</td>
                                <td>{p.contato}</td>
                                <td>{p.localDeEmbarque}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* O Modal não precisa de alterações */}
            <Modal
                isOpen={modalMode !== 'closed'}
                onClose={closeModal}
                title={modalMode === 'allocating' ? `Alocar - Poltrona ${selectedSeat}` : `Gerenciar - Poltrona ${selectedSeat}`}
            >
                {modalMode === 'allocating' && (
                    <AlocacaoForm
                        passageirosDisponiveis={passageirosDisponiveis}
                        locaisDeEmbarque={passeio.locaisEmbarque || []}
                        onSave={handleSaveAlocacao}
                        onCancel={closeModal}
                    />
                )}
                {modalMode === 'managing' && selectedAllocation && (
                    <div>
                        <p><strong>Passageiro:</strong> {passageirosMap.get(selectedAllocation.passageiroId)?.nomeCompleto}</p>
                        {selectedAllocation.criancaDeColo && <p><strong>Acompanhante:</strong> {passageirosMap.get(selectedAllocation.criancaDeColo.passageiroId)?.nomeCompleto}</p>}
                        <hr/>
                        <button onClick={handleUnallocate} className="btn btn-danger">Desalocar Passageiro</button>
                        <button onClick={closeModal} className="btn btn-secondary" style={{marginLeft: '10px'}}>Cancelar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}