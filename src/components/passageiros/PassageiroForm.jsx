// src/components/passageiros/PassageiroForm.jsx
import { useState } from 'react';

export function PassageiroForm({ onSave, onCancel }) {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');
    // ... Adicione aqui os outros estados para os demais campos (RG, endereço, etc.)

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Adicionar validação dos campos
        const novoPassageiro = {
            nomeCompleto,
            cpf,
            celular,
            // ... outros campos
        };
        onSave(novoPassageiro);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Por enquanto, vamos criar apenas os campos principais */}
            <div>
                <label>Nome Completo:</label>
                <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
            </div>
            <div>
                <label>CPF:</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div>
                <label>Celular:</label>
                <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
            </div>
        </form>
    );
}