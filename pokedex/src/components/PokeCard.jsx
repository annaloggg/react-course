import { useContext, useEffect } from "react";
import { SelectedPokemonContext } from "../App";
import TypeCard from './TypeCard';
import { useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import Modal from "./Modal";

export default function PokeCard() {

    const { selectedPokemon } = useContext(SelectedPokemonContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } =
        data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false; }
        if (['versions', 'other'].includes(val)) { return false; }
        return true;
    })

    function compareFn(a, b) {
        if (a?.move.name < b?.move.name) {
            return -1;
        } else if (b?.move.name < a?.move.name) {
            return 1;
        }
        return 0;
    }

    async function fetchMoveData(move, moveURL) {
        if (loadingSkill || !localStorage || !moveURL) { return; }

        // check cache for move
        let c = {};
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'));
        }

        // case: move is stored in cache
        if (move in c) {
            setSkill(c[move]);
            console.log("found skill in cache");
            return;
        }

        // case: move not in cache --> fetch !
        try {
            setLoadingSkill(true);
            const res = await fetch(moveURL);
            const moveData = await res.json();
            console.log('fetched move from API', moveData);
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name = 'firered-leafgreen'
            })[0]?.flavor_text;

            const skillData = {
                name: move,
                description: description
            }

            setSkill(skillData);
            c[move] = skillData;
            localStorage.setItem('pokemon-moves', JSON.stringify(c));

        } catch (err) {
            console.log(err);
        } finally {
            setLoadingSkill(false);
        }
    }

    // whenever we change pokemon we need to fetch new information
    useEffect(() => {

        // if loading, exit logic
        if (loading || !localStorage) { return; }

        // check cache for available information--> withold from doing API call
        // 1. define the cache
        let cache = {};     // define cache as empty obj since localStorage is JSON formatted
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }

        // 2. check if the selected pokemon is in the cache, otherwise, fetch from API
        if (selectedPokemon in cache) {
            // read from cache
            setData(cache[selectedPokemon]);
            console.log("found skill in cache");
            return;         // got what we came for >:3
        }

        // nothing in the cache :( --> need to fetch from API!

        // 3. If we fetch from API --> save info to cache to save the information to the cache for next time
        async function fetchPokemonData() {
            setLoading(true);
            try {
                const baseURL = 'https://pokeapi.co/api/v2/';
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon);
                const finalURL = baseURL + suffix;

                const res = await fetch(finalURL);
                const pokemonData = await res.json();
                setData(pokemonData);
                console.log("fetched pokemon data from API");

                // 4. update cache !
                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex', JSON.stringify(cache));

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonData();

    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className='poke-card'>
            {skill && (<Modal handleCloseModal={() => { setSkill(null) }}>
                <div>
                    <h6 className="skill-name">Name</h6>
                    <h2>{skill.name.replaceAll('-', ' ')}</h2>
                    <br/>
                    <div>
                        <h6>Description</h6>
                        <p>{skill.description}</p>
                    </div>
                </div>
            </Modal>)}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} />
            <div className="img-container">
                {imgList.map((spriteURL, spriteIndex) => {
                    const imgURL = sprites[spriteURL];
                    return (
                        <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteURL}`} />
                    )
                })}
            </div>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj;
                    return (
                        <div key={statIndex} className="'stat-item">
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className='pokemon-move-grid'>
                {moves.sort(compareFn).map((moveObj, moveIndex) => {
                    return (
                        <button className='button-card pokemon-move'
                            key={moveIndex} onClick={() => {fetchMoveData(moveObj?.move.name, moveObj?.move.url)}}>
                            <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>

    )
}