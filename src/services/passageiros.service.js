// src/services/passageiros.service.js
import { collection, getDocs } from 'firebase/firestore';
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