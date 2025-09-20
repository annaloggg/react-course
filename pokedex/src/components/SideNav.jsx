import { first151Pokemon, getFullPokedexNumber } from "../utils/index.js"
import { SelectedPokemonContext } from "../App.jsx";
import { useContext, useState } from "react";

export default function SideNav() {

    const { selectedPokemon, setSelectedPokemon } = useContext(SelectedPokemonContext);
    const [searchValue, setSearchValue] = useState();

    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return <button key={pokemonIndex} className={'nav-card' + (pokemonIndex === selectedPokemon ? ' nav-card-selected' : ' ')}
                onClick={()=> {setSelectedPokemon(pokemonIndex)}}>
                    <p>{getFullPokedexNumber(pokemonIndex)}</p>
                    <p>{pokemon}</p>
                </button>
            })}
        </nav>
    )
}