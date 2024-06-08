import axios from "axios";
import { useState , useEffect } from "react";


export default function Card({ shiny = false, filters }) {
    const shine = (shiny && "shiny") || (!shiny && "normal")

    const [pokemonList, setPokemonList] = useState([]);

    // fetching
    useEffect(() => {
      axios.get('http://localhost:3001/api/pokemon')
        .then(response => setPokemonList(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    // fetching 
    const filteredPokemonList = pokemonList.filter(pokemon => {
      if (filters.cat && pokemon.cat !== filters.cat) return false;
      if (filters.habitat && pokemon.habitat !== filters.habitat) return false;
      if (filters.stage !== null && pokemon.stage !== filters.stage) return false;
      return true;
    });

    return (
        <div className="flex flex-wrap justify-center ml-8 mt-4" >       
            {filteredPokemonList.map((item, index) => (
                    <div title={`${item.pkmn.toLowerCase()}-${shine}`} key={index*10+0} className="Card-item  w-[120px] h-[120px]">
                    <img   src={`https://img.pokemondb.net/sprites/black-white/anim/${shine}/${item.pkmn.toLowerCase()}.gif`} 
                    className="Card-link" 
                    alt={item.pkmn} 
                    onError={(e) => { e.target.src = `https://projectpokemon.org/images/${shine}-sprite/${item.pkmn.toLowerCase()}.gif`; 
                    if (item.pkmn === "Grubbin" || item.pkmn === "Charjabug" || item.pkmn === "Bounsweet"){e.target.style.height = '30px';}
                    else{ e.target.style.height='60px';}
                 }}/>
                </div>
            ))}
        </div>
    );
}
