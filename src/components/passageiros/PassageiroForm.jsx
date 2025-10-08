// src/components/passageiros/PassageiroForm.jsx
import { useState, useEffect } from 'react';

export function PassageiroForm({ onSave, onCancel, initialData = null }) {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        celular: '',
    });

    // Se 'initialData' for fornecido (modo de edição), preenche o formulário
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Limpa o formulário se não houver dados iniciais (modo de criação)
            setFormData({ nomeCompleto: '', cpf: '', celular: '' });
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome Completo:</label>
                <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
            </div>
            <div>
                <label>CPF:</label>
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
            </div>
            <div>
                <label>Celular:</label>
                <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
            </div>
        </form>
    );
}