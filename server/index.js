const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

const pokemonDataPath = path.join(__dirname, 'pokemonData.json');

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Route to fetch Pokémon data
app.get('/api/pokemon', (req, res) => {
  fs.readFile(pokemonDataPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Failed to read data:', err);
      return res.status(500).json({ error: 'Failed to read data.' });
    }
    const jsonData = data.replace(/const pokemonData = |export default pokemonData;\s*$/g, '').trim();
    try {
      res.json(JSON.parse(jsonData));
    } catch (parseErr) {
      console.error('Failed to parse data:', parseErr);
      res.status(500).json({ error: 'Failed to parse data.' });
    }
  });
});

// Route to save changes to Pokémon data
app.post('/api/savePokemon', (req, res) => {
  const newData = JSON.stringify(req.body, null, 2);
  fs.writeFile(pokemonDataPath, newData, (err) => {
    if (err) {
      console.error('Failed to save data:', err);
      return res.status(500).json({ error: 'Failed to save data.' });
    }
    res.json({ success: true });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
