import { first151Pokemon, getFullPokedexNumber } from "../utils/index.js"
import { SelectedPokemonContext, SideMenuContext } from "../App.jsx";
import { useContext, useState } from "react";

export default function SideNav({handleCloseMenu}) {

    const { selectedPokemon, setSelectedPokemon } = useContext(SelectedPokemonContext);
    const { showSideMenu } = useContext(SideMenuContext);
    const [searchValue, setSearchValue] = useState('');
    const filteredPokemon = first151Pokemon.filter((element, elementIdx) => {

        // if full pokedex number includes the current search value --> return true
        if (getFullPokedexNumber(elementIdx).includes(searchValue)) { return true; }

        // if the pokemon name includes the current search value --> return true
        if (element.toLowerCase().includes(searchValue.toLowerCase())) { return true; }

        // otherwise exclude value from array
        return false;
    });

    return (
        <nav className= {' ' + (showSideMenu ? " open" : ' ')}>
            <div className={'header ' + (showSideMenu ? " open" : ' ')}>
                <button className="open-nav-button" onClick={handleCloseMenu}>
                    <i className ="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <div className="search-container">
                <input placeholder="E.g. 001 or Bulbasaur" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                }} />
                <button onClick={()=> {setSearchValue('')}}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            {filteredPokemon.map((pokemon) => {
                const actualPokemonIndex = first151Pokemon.indexOf(pokemon);
                return <button key={actualPokemonIndex} className={'nav-card' + (actualPokemonIndex === selectedPokemon ? ' nav-card-selected' : ' ')}
                    onClick={() => {
                        setSelectedPokemon(actualPokemonIndex);
                        handleCloseMenu();
                    }}>
                    <p>{getFullPokedexNumber(actualPokemonIndex)}</p>
                    <p>{pokemon}</p>
                </button>
            })}
        </nav>
    )
}