// src/services/passeios.service.js
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const passeiosCollectionRef = collection(db, 'passeios');

/**
 * Busca e retorna todos os passeios.
 */
export const getPasseios = async () => {
    const data = await getDocs(passeiosCollectionRef);
    // Inicializamos a lotação aqui para garantir que o campo exista
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id, passageirosAlocados: doc.data().passageirosAlocados || [] }));
};

/**
 * Adiciona um novo documento de passeio à coleção.
 * @param {object} novoPasseio - O objeto com os dados do passeio.
 */
export const addPasseio = (novoPasseio) => {
    // Garantimos que o campo de passageiros comece como um array vazio
    const passeioComLotaçaoInicial = {
        ...novoPasseio,
        passageirosAlocados: [],
    };
    return addDoc(passeiosCollectionRef, passeioComLotaçaoInicial);
};

/**
 * Busca um único passeio pelo seu ID.
 */
export const getPasseioById = async (id) => {
    const passeioDoc = doc(db, 'passeios', id);
    const docSnap = await getDoc(passeioDoc);

    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
    } else {
        throw new Error("Passeio não encontrado!");
    }
};

