// src/utils/date.js

/**
 * Calcula a idade a partir de uma data de nascimento no formato 'YYYY-MM-DD'.
 * @param {string} dateString - A data de nascimento.
 * @returns {number|string} A idade em anos ou 'N/A' se a data for inválida.
 */
export const calculateAge = (dateString) => {
    if (!dateString) return 'N/A';

    try {
        const birthDate = new Date(dateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    } catch (error) {
        return 'N/A';
    }
};