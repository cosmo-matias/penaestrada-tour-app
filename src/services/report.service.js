// src/services/report.service.js

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logoRelat.png';

export const generatePassengerListPDF = (passeioData, passengerListData) => {
    const doc = new jsPDF();

    // ===== CORREÇÃO DA LOGO =====
    // Para manter a proporção, definimos a largura e deixamos a altura como 0.
    // O jsPDF calculará a altura automaticamente.
    doc.addImage(logo, 'PNG', 10, 10, 30, 0);

    doc.setFontSize(18);
    doc.text('Relatório de Passageiros', 70, 18);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const dataFormatada = new Date(passeioData.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    doc.text(`Destino: ${passeioData.nomeDestino}`, 45, 25);
    doc.text(`Data: ${dataFormatada}`, 45, 30);
    doc.text(`Horários: ${passeioData.horarioSaida}h - ${passeioData.horarioRetorno}h`, 45, 35);

    doc.setLineWidth(0.5);
    doc.line(10, 38, 200, 38);


    // ===== ATUALIZAÇÃO DAS COLUNAS E DADOS DA TABELA =====
    const head = [['Pol.', 'Nome Completo', 'Contato', 'RG', 'CPF', 'Embarque']];

    const body = passengerListData.map(p => {
        const nome = p.tipo === 'Criança de Colo' ? `${p.nome} (Colo)` : p.nome;
        return [
            p.poltrona,
            nome,
            p.contato || '-', // Garante que não apareça 'undefined'
            p.rg || '-',
            p.cpf || '-',
            p.localDeEmbarque,
        ];
    });

    autoTable(doc, {
        head: head,
        body: body,
        startY: 45,
        theme: 'grid',
        headStyles: {
            fillColor: [61, 123, 163]
        }
    });

    const fileNameSafeDestino = passeioData.nomeDestino.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Relatorio_${fileNameSafeDestino}_${dataFormatada}.pdf`);
};