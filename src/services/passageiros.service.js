// src/services/passageiros.service.js
import { collection, getDocs, addDoc  } from 'firebase/firestore';

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