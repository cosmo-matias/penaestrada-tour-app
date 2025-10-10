// src/components/passageiros/PassageiroForm.jsx
import { useState, useEffect } from 'react';
import { useMask } from '@react-input/mask';
import { BRAZILIAN_STATES } from '../../utils/brazilianStates'; // <-- Nova importação

export function PassageiroForm({ onSave, onCancel, initialData = null }) {
    const initialFormState = {
        nomeCompleto: '', dataNascimento: '', rg: '', cpf: '', celular: '',
        logradouro: '', numero: '', bairro: '', cidade: '', estado: '', cep: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    const cpfInputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
    const celularInputRef = useMask({ mask: '(__) _____-____', replacement: { _: /\d/ } });
    const cepInputRef = useMask({ mask: '_____-___', replacement: { _: /\d/ } });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialFormState, ...initialData });
        } else {
            setFormData(initialFormState);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4>Dados Pessoais</h4>
            <input type="text" name="nomeCompleto" placeholder="Nome Completo" value={formData.nomeCompleto} onChange={handleChange} required />
            <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} required />
            <input type="text" name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} required />
            <input ref={cpfInputRef} name="cpf" placeholder="CPF" value={formData.cpf} onInput={handleChange} required />
            <input ref={celularInputRef} name="celular" placeholder="Celular" value={formData.celular} onInput={handleChange} required />

            <h4 style={{ marginTop: '15px' }}>Endereço</h4>
            <input ref={cepInputRef} name="cep" placeholder="CEP" value={formData.cep} onInput={handleChange} />
            <input type="text" name="logradouro" placeholder="Logradouro (Rua, Av.)" value={formData.logradouro} onChange={handleChange} />
            <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} />
            <input type="text" name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} />
            <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} />

            {/* ===== CAMPO DE ESTADO ALTERADO ===== */}
            <select name="estado" value={formData.estado} onChange={handleChange}>
                <option value="">Selecione o Estado</option>
                {BRAZILIAN_STATES.map((state) => (
                    <option key={state.sigla} value={state.sigla}>
                        {state.nome}
                    </option>
                ))}
            </select>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
            </div>
        </form>
    );
}