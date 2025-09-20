import { createContext } from "react";
import Header from "./components/Header";
import  PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";
import { useState } from "react";

export const SelectedPokemonContext = createContext(null);

export default function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <>
      <Header />
      <SelectedPokemonContext
      value={{selectedPokemon, setSelectedPokemon}}>
      <SideNav />
      <PokeCard />
      </SelectedPokemonContext>
      </>
  )
}

