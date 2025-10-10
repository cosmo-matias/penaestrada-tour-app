import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // ===== ADICIONE ESTA SEÇÃO AQUI =====
    // Define a base como um caminho relativo.
    // Isso é crucial para que o Electron encontre os arquivos JS e CSS.
    base: './',
    // ======================================
});