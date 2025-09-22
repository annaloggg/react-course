import { first151Pokemon, getFullPokedexNumber } from "../utils/index.js"
import { SelectedPokemonContext } from "../App.jsx";
import { useContext, useState } from "react";

export default function SideNav() {

    const { selectedPokemon, setSelectedPokemon } = useContext(SelectedPokemonContext);
    const [searchValue, setSearchValue] = useState('');
    const filteredPokemon = first151Pokemon.filter((element, elementIdx) => {
        
        // if full pokedex number includes the current search value --> return true
        if (getFullPokedexNumber(elementIdx).includes(searchValue)) {return true;}
        
        // if the pokemon name includes the current search value --> return true
        if (element.toLowerCase().includes(searchValue.toLowerCase())) {return true;}

        // otherwise exclude value from array
        return false;
    });

    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input vale={searchValue} onChange={(e) => {
                setSearchValue(e.target.value);
            }}/>
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                return <button key={pokemonIndex} className={'nav-card' + (pokemonIndex === selectedPokemon ? ' nav-card-selected' : ' ')}
                onClick={()=> {setSelectedPokemon(pokemonIndex)}}>
                    <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                    <p>{pokemon}</p>
                </button>
            })}
        </nav>
    )
}