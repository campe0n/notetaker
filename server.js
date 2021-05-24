const express = require('express');
const fs = require("fs")
const db = require("./db/db.json")
const path = require('path');
const uniqid = require('uniqid')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

const router = express.Router()

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')))

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"))
    const newNotes = req.body;
    notes.id = uniqid();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

app.use(router)

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
