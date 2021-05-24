const express = require('express');
const fs = require("fs")
const notes = require("./db/db.json")
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

const router = express.Router()

router.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
router.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')))



app.use(router)

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
