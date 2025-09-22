import { createContext } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";
import { useState } from "react";

export const SelectedPokemonContext = createContext(null);
export const SideMenuContext = createContext(false);

export default function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu);
  }
  
  function handleCloseMenu() {
    setShowSideMenu(false);
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SelectedPokemonContext
        value={{ selectedPokemon, setSelectedPokemon }}>
        <SideMenuContext
          value={{ showSideMenu }}>
          <SideNav
            handleCloseMenu={handleCloseMenu}
          />
        </SideMenuContext>
        <PokeCard />
      </SelectedPokemonContext>
    </>
  )
}

