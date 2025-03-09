// main.js - Electron Ana Süreci
const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store.default();

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
    
    // Menü çubuğunu gizle (opsiyonel)
    mainWindow.setMenuBarVisibility(false);
    
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('notes-updated', store.get('notes', []));
    });
});

ipcMain.on('save-note', (event, note) => {
    let notes = store.get('notes', []);
    notes.push(note);
    store.set('notes', notes);
    event.reply('notes-updated', notes);
});

ipcMain.on('delete-note', (event, index) => {
    let notes = store.get('notes', []);
    notes.splice(index, 1);
    store.set('notes', notes);
    event.reply('notes-updated', notes);
});

// index.html - Vue.js Entegrasyonu
const htmlContent = `
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Not Uygulaması</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.36/dist/vue.global.prod.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Not Uygulaması</h1>
        
        <!-- Not listesi -->
        <div class="notes-list">
            <ul>
                <li v-for="(note, index) in notes" :key="index">
                    <span>{{ note }}</span>
                    <button @click="deleteNote(index)">Sil</button>
                </li>
            </ul>
        </div>

        <!-- Not ekleme bölümü -->
        <div class="note-input-section">
            <textarea v-model="newNote" placeholder="Bir not gir..."></textarea>
            <button class="save-btn" @click="saveNote">Kaydet</button>
        </div>
    </div>
    <script src="renderer.js"></script>
</body>
</html>
`;

// renderer.js - Vue.js ile Frontend İşlevselliği
const jsContent = `
const { ipcRenderer } = require('electron');

const app = Vue.createApp({
    data() {
        return {
            newNote: "",
            notes: []
        };
    },
    methods: {
        saveNote() {
            if (this.newNote.trim() !== "") {
                ipcRenderer.send('save-note', this.newNote);
                this.newNote = "";
            }
        },
        deleteNote(index) {
            ipcRenderer.send('delete-note', index);
        }
    },
    created() {
        ipcRenderer.on('notes-updated', (event, notes) => {
            this.notes = notes;
        });
    }
}).mount("#app");
`;

const fs = require('fs');
fs.writeFileSync('index.html', htmlContent);
fs.writeFileSync('renderer.js', jsContent);
