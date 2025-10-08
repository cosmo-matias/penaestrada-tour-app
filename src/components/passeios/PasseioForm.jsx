// src/components/passeios/PasseioForm.jsx
import { useState } from 'react';

const locaisEmbarqueOptions = ["Capim", "Olho D'água", "Cuité de Mamanguape", "Sapé", "Mamanguape", "São Paulo"];
const transporteOptions = [
    { label: "Ônibus 50 Lugares", capacidade: 50 },
    { label: "Ônibus 46 Lugares", capacidade: 46 },
    { label: "Micro-ônibus 30 Lugares", capacidade: 30 },
    { label: "Van 20 Lugares", capacidade: 20 },
];

export function PasseioForm({ onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nomeDestino: '',
        cidadeEstado: '',
        data: '',
        horarioSaida: '',
        horarioRetorno: '',
        valor: '',
        locaisEmbarque: [],
        transporte: transporteOptions[0], // Padrão
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTransporteChange = (e) => {
        const selectedOption = transporteOptions.find(opt => opt.label === e.target.value);
        setFormData(prev => ({ ...prev, transporte: selectedOption }));
    };

    const handleLocaisChange = (e) => {
        const { options } = e.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFormData(prev => ({ ...prev, locaisEmbarque: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Adicione os outros campos aqui seguindo o mesmo padrão */}
            <input name="nomeDestino" value={formData.nomeDestino} onChange={handleChange} placeholder="Nome do Destino" required />
            <input name="cidadeEstado" value={formData.cidadeEstado} onChange={handleChange} placeholder="Cidade/Estado" required />
            <input name="data" type="date" value={formData.data} onChange={handleChange} required />
            <input name="valor" type="number" value={formData.valor} onChange={handleChange} placeholder="Valor R$" required />

            <label>Transporte:</label>
            <select value={formData.transporte.label} onChange={handleTransporteChange}>
                {transporteOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
            </select>

            <label>Locais de Embarque (segure Ctrl/Cmd para selecionar vários):</label>
            <select multiple name="locaisEmbarque" value={formData.locaisEmbarque} onChange={handleLocaisChange} required>
                {locaisEmbarqueOptions.map(local => <option key={local} value={local}>{local}</option>)}
            </select>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Salvar Passeio</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
}