// electron/main.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Esta variável do Electron nos diz se o app está empacotado ou em modo de desenvolvimento
const isDev = !app.isPackaged;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    // Cria a janela do navegador.
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        // O Vite copia o ícone da pasta 'public' para a raiz da 'dist' durante o build.
        // Este caminho busca o ícone no local correto após o empacotamento.
        icon: path.join(__dirname, '../dist/icon.ico')
    });

    // Abre o DevTools apenas se estivermos em modo de desenvolvimento.
    // Para o usuário final, as ferramentas não irão aparecer.
    if (isDev) {
        win.webContents.openDevTools();
    }

    // Carrega o arquivo index.html da pasta 'dist'.
    win.loadFile(path.join(__dirname, '../dist/index.html'));

    // Remove o menu superior (File, Edit, View...) no app final (produção).
    if (!isDev) {
        win.setMenu(null);
    }
}

// Este método será chamado quando o Electron tiver finalizado
// a inicialização e estiver pronto para criar janelas do navegador.
app.whenReady().then(createWindow);

// Encerra o aplicativo quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // No macOS, é comum recriar uma janela no aplicativo quando o
    // ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});