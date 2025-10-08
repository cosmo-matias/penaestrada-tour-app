// src/services/passageiros.service.js
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc  } from 'firebase/firestore';

import { db } from './firebase';

// Referência para a coleção 'passageiros' no Firestore
const passageirosCollectionRef = collection(db, 'passageiros');

/**
 * Busca e retorna todos os passageiros da coleção.
 * Cada passageiro retornado incluirá seu ID.
 */
export const getPassageiros = async () => {
    const data = await getDocs(passageirosCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

/**
 * Adiciona um novo documento de passageiro à coleção.
 * @param {object} novoPassageiro - O objeto com os dados do passageiro.
 * @returns {Promise<DocumentReference>} A referência ao novo documento criado.
 */
export const addPassageiro = (novoPassageiro) => {
    return addDoc(passageirosCollectionRef, novoPassageiro);
};

/**
 * Atualiza um documento de passageiro existente.
 * @param {string} id - O ID do passageiro a ser atualizado.
 * @param {object} passageiroData - O objeto com os novos dados.
 */
export const updatePassageiro = (id, passageiroData) => {
    const passageiroDoc = doc(db, 'passageiros', id);
    return updateDoc(passageiroDoc, passageiroData);
};

/**
 * Exclui um documento de passageiro.
 * @param {string} id - O ID do passageiro a ser excluído.
 */
export const deletePassageiro = (id) => {
    const passageiroDoc = doc(db, 'passageiros', id);
    return deleteDoc(passageiroDoc);
};