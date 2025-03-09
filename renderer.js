
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
