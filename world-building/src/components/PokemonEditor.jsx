import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonEditor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/pokemon')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (index, field, value) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };

  const handleSave = () => {
    axios.post('http://localhost:3001/api/savePokemon', data)
      .then(response => console.log('Data saved:', response.data))
      .catch(error => console.error('Error saving data:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Data Editor</h1>

      {data.map((pokemon, index) => (
        <div key={index} className="bg-gray-800 rounded-md p-4 mb-4">
          <div>
            <strong>{pokemon.pkmn}</strong>
            <div className="flex flex-wrap">

              {/* STAGE FILTER */}
              <div key={`stage-${index}`} className="mr-4 mb-2">
                <span className="mr-2">Stage:</span>
                {[0, 1, 2, 3].map(stage => (
                  <label key={`stage-${index}-${stage}`} className="inline-flex items-center mr-2">

                    <input type="radio" name={`stage-${index}`} value={stage} checked={pokemon.stage === stage} onChange={() => handleChange(index, 'stage', stage)} className="hidden" />

                    <span className={`w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center ${pokemon.stage === stage ? 'bg-gray-500' : ''}`}>
                      <span className="hidden"></span>
                    </span>

                    <span className="ml-2">{stage}</span>
                  </label>
                ))}
              </div>

              {/*  CATEGORY FILTER */}
              <div key={`cat-${index}`} className="mr-4 mb-2">
                <span className="mr-2">Category:</span>
                {['prey', 'predator', 'omni'].map(cat => (
                  <label key={`stage-${index}-${cat}`} className="inline-flex items-center mr-2">

                    <input type="radio" name={`cat-${index}`} value={cat} checked={pokemon.cat === cat} onChange={() => handleChange(index, 'cat', cat)} className="hidden" />

                    <span className={`w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center ${pokemon.cat === cat ? 'bg-gray-500' : ''}`}>
                      <span className="hidden"></span>
                    </span>

                    <span className="ml-2 capitalize">{cat}</span>
                  </label>
                ))}
              </div>


              {/* LINEUP FILTER  */}
              <div className="mr-4 mb-2">
                <span className="mr-2">Lineup:</span>
                { // only applicable for not index 0 .. edge case filter
                index > 0 && (
                  <label className="inline-flex items-center mr-2">
                    <input 
                      type="radio" 
                      name={`lineup-${index}`} 
                      value={data[index - 1].lineup} 
                      checked={pokemon.lineup === data[index - 1].lineup} 
                      onChange={() => handleChange(index, 'lineup', data[index - 1].lineup)} 
                      className="hidden" />
              
                    <span className={`px-2 py-1 rounded-lg border ${pokemon.lineup === data[index - 1].lineup ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {data[index - 1].lineup}
                    </span>

                  </label>
                )}
                { // only applicable for not index 0 .. edge case filter
                index > 0 && (
                  <label className="inline-flex items-center mr-2">
                    <input 
                      type="radio" 
                      name={`lineup-${index}`} 
                      value={data[index - 1].pkmn} 
                      checked={pokemon.lineup === data[index - 1].pkmn} 
                      onChange={() => handleChange(index, 'lineup', data[index - 1].pkmn)} 
                      className="hidden" />

                    <span className={`px-2 py-1 rounded-lg border ${pokemon.lineup === data[index - 1].pkmn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {data[index - 1].pkmn}
                    </span>

                  </label>
                )}
                <label className="inline-flex items-center mr-2">
                  <input 
                    type="radio" 
                    name={`lineup-${index}`} 
                    value={pokemon.pkmn} 
                    checked={pokemon.lineup === pokemon.pkmn} 
                    onChange={() => handleChange(index, 'lineup', pokemon.pkmn)} 
                    className="hidden" />

                  <span className={`px-2 py-1 rounded-lg border ${pokemon.lineup === pokemon.pkmn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {pokemon.pkmn}
                  </span>

                </label>
              </div>


              {/* HABITAT FILTERS */}
              <div>
                <span className="mr-2">Habitat:</span>
                {['field', 'forest', 'water'].map(habitat => (
                  <label key={`stage-${index}-${habitat}`} className="inline-flex items-center mr-2">

                    <input type="radio" name={`habitat-${index}`} value={habitat} checked={pokemon.habitat === habitat} onChange={() => handleChange(index, 'habitat', habitat)} className="hidden" />

                    <span className={`w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center ${pokemon.habitat === habitat ? 'bg-gray-500' : ''}`}>
                      <span className="hidden"></span>
                    </span>

                    <span className="ml-2 capitalize">{habitat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded " onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default PokemonEditor;
