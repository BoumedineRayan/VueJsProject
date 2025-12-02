const express = require('express');
const path = require('path'); // On a besoin de ce module pour gérer les chemins de fichiers
const app = express();
const port = 3000;

// On importe items.js depuis le dossier parent (la racine du projet)
const items = require('./items.js');

// --- C'est la partie la plus importante ---

// On dit à Express de servir les fichiers du dossier 'assets' qui se trouve 
// dans le dossier parent (..) par rapport à 'backend'
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// On fait la même chose pour le CSS et les pages d'info
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/info', express.static(path.join(__dirname, '..', 'info')));


// --- API Endpoints pour votre application Vue ---

let currentIndex = 0;

app.get('/item', (req, res) => {
    res.json({ item: items[currentIndex] });
});

app.get('/item/next', (req, res) => {
    currentIndex = (currentIndex + 1) % items.length;
    res.json({ item: items[currentIndex] });
});

app.get('/item/prev', (req, res) => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    res.json({ item: items[currentIndex] });
});

// On sert votre fichier index.html qui se trouve dans le dossier parent
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// --- Démarrage du serveur ---
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});