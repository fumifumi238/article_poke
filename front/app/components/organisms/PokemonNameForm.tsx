import { useContext, useEffect, useState } from "react";
import pokeData from "../../json/poke_data.json";
import { PokemonRefContext } from "../templates/RegisterPokemon";

type PokemonNameForm = {
  addOptionAbility: (value: string) => void;
};

const PokemonNameForm = ({ addOptionAbility }: PokemonNameForm) => {
  const [filterPokemonList, setFilterPokemonList] = useState<string[]>([]);
  const [visiblePokemonList, setVisiblePokemonList] = useState<boolean>(false);
  const { pokemonRef } = useContext(PokemonRefContext);
  const [selectIndex, setSelectIndex] = useState<number>(-1);

  useEffect(() => {
    if (
      filterPokemonList.length !== 0 &&
      filterPokemonList[0] !== "not found"
    ) {
      setSelectIndex(0);
    } else {
      setSelectIndex(-1);
    }
  }, [filterPokemonList]);

  const hiraToKana = (text: unknown) => {
    return String(text).replace(/[\u3042-\u3093]/g, (m) =>
      String.fromCharCode(m.charCodeAt(0) + 96)
    );
  };

  const changeNameForm = (value: string) => {
    addOptionAbility(value);
    setFilterPokemonList([]);
  };

  const keyDown = (e) => {
    if (selectIndex === -1) {
      return;
    }

    if (e.key === "Enter") {
      pokemonRef.current.value = filterPokemonList[selectIndex];
      changeNameForm(pokemonRef.current.value);
    }

    if (e.key === "ArrowDown") {
      if (filterPokemonList.length - 1 > selectIndex) {
        setSelectIndex((selectIndex) => selectIndex + 1);
      }
    }

    if (e.key === "ArrowUp") {
      if (selectIndex > 0) {
        setSelectIndex((selectIndex) => selectIndex - 1);
      }
    }
  };

  const addpokemonLists = (value: string) => {
    if (value === "") {
      setFilterPokemonList([]);
      return;
    }

    value = hiraToKana(value);

    const list = [];

    for (let pokemon of Object.keys(pokeData)) {
      if (pokemon.indexOf(value) === 0) {
        list.push(pokemon);
      }

      if (list.length >= 5) {
        break;
      }
    }

    if (list.length === 0) {
      list.push("not found");
    }
    setFilterPokemonList(list);
  };
  return (
    <div
      style={{ width: "100%", maxWidth: 100, marginRight: 0 }}
      onBlur={() => setTimeout(() => setVisiblePokemonList(false), 100)}
      onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        ref={pokemonRef}
        placeholder="ポケモン名"
        id="pokemon-name-form"
        autoComplete="off"
        onFocus={() => setVisiblePokemonList(true)}
        onBlur={(e) => {
          setTimeout(() => changeNameForm(e.target.value.trim()), 300);
        }}
        onKeyDown={(e) => keyDown(e)}
        onChange={(e) => addpokemonLists(e.target.value.trim())}
        style={{
          background: "#8898a8",
          border: "none",
          color: "white",
          marginLeft: 5,
          paddingRight: 0,
          fontSize: "13px",
          width: "100%",
          height: 18,
        }}
      />
      <ul
        style={{
          width: "100%",
          background: "white",
          position: "relative",
          zIndex: 1,
          left: 0,
          top: -18,
          paddingLeft: 0,
          borderRadius: 5,
        }}>
        {visiblePokemonList &&
          filterPokemonList.map((pokemon, index) => (
            <div key={pokemon}>
              <li
                style={{
                  listStyle: "none",
                  fontSize: 16,
                  textAlign: "left",
                  padding: 6,
                  background: `${
                    index === selectIndex ? "lightgrey" : "white"
                  }`,
                }}
                onClick={() => changeNameForm(pokemon)}>
                {pokemon}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default PokemonNameForm;
