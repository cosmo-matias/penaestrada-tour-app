// src/components/passeios/AlocacaoForm.jsx
import { useState, useMemo } from 'react';

export function AlocacaoForm({ passageirosDisponiveis, locaisDeEmbarque, onSave, onCancel }) {
    const [responsavel, setResponsavel] = useState(null);
    const [criancaDeColo, setCriancaDeColo] = useState(null);
    const [levaCrianca, setLevaCrianca] = useState(false);
    const [localDeEmbarque, setLocalDeEmbarque] = useState('');

    const [buscaResponsavel, setBuscaResponsavel] = useState('');
    const [buscaCrianca, setBuscaCrianca] = useState('');

    const responsaveisFiltrados = useMemo(() => {
        if (!buscaResponsavel) return [];
        return passageirosDisponiveis.filter(p =>
            p.id !== criancaDeColo?.id && p.nomeCompleto.toLowerCase().includes(buscaResponsavel.toLowerCase())
        );
    }, [buscaResponsavel, passageirosDisponiveis, criancaDeColo]);

    const criancasFiltradas = useMemo(() => {
        if (!buscaCrianca) return [];
        return passageirosDisponiveis.filter(p =>
            p.id !== responsavel?.id && p.nomeCompleto.toLowerCase().includes(buscaCrianca.toLowerCase())
        );
    }, [buscaCrianca, passageirosDisponiveis, responsavel]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!responsavel) { alert('Por favor, selecione um passageiro responsável.'); return; }
        if (!localDeEmbarque) { alert('Por favor, selecione o local de embarque.'); return; }
        onSave({
            responsavel,
            criancaDeColo: levaCrianca ? criancaDeColo : null,
            localDeEmbarque,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
                <label>Buscar Passageiro Responsável:</label>
                {responsavel ? (
                    <div>
                        <strong>{responsavel.nomeCompleto}</strong>
                        <button type="button" onClick={() => setResponsavel(null)} style={{ marginLeft: '10px' }}>Alterar</button>
                    </div>
                ) : (
                    <>
                        {/* ===== CAMPO DE BUSCA RESTAURADO ===== */}
                        <input
                            type="text"
                            value={buscaResponsavel}
                            onChange={(e) => setBuscaResponsavel(e.target.value)}
                            placeholder="Digite para buscar..."
                            style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                        {responsaveisFiltrados.length > 0 && (
                            <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}>
                                {responsaveisFiltrados.slice(0, 5).map(p => ( // Mostra apenas os 5 primeiros resultados
                                    <li key={p.id} onClick={() => { setResponsavel(p); setBuscaResponsavel(''); }} style={{ cursor: 'pointer', padding: '8px' }}>
                                        {p.nomeCompleto}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>

            <div>
                <input type="checkbox" checked={levaCrianca} onChange={(e) => setLevaCrianca(e.target.checked)} />
                <label> Leva criança de colo?</label>
            </div>

            {levaCrianca && (
                <div>
                    <label>Buscar Criança de Colo:</label>
                    {criancaDeColo ? (
                        <div>
                            <strong>{criancaDeColo.nomeCompleto}</strong>
                            <button type="button" onClick={() => setCriancaDeColo(null)} style={{ marginLeft: '10px' }}>Alterar</button>
                        </div>
                    ) : (
                        <>
                            {/* ===== CAMPO DE BUSCA RESTAURADO ===== */}
                            <input
                                type="text"
                                value={buscaCrianca}
                                onChange={(e) => setBuscaCrianca(e.target.value)}
                                placeholder="Digite para buscar..."
                                style={{ width: '100%', boxSizing: 'border-box' }}
                            />
                            {criancasFiltradas.length > 0 && (
                                <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}>
                                    {criancasFiltradas.slice(0, 5).map(p => (
                                        <li key={p.id} onClick={() => { setCriancaDeColo(p); setBuscaCrianca(''); }} style={{ cursor: 'pointer', padding: '8px' }}>
                                            {p.nomeCompleto}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            )}

            <div>
                <label>Local de Embarque:</label>
                <select value={localDeEmbarque} onChange={(e) => setLocalDeEmbarque(e.target.value)} required style={{ width: '100%', padding: '5px' }}>
                    <option value="">-- Selecione o local --</option>
                    {locaisDeEmbarque.map(local => <option key={local} value={local}>{local}</option>)}
                </select>
            </div>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Alocar Passageiro</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
            </div>
        </form>
    );
}