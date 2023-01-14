import { RefObject, useContext, useEffect, useState } from "react";
import pokeData from "../../json/poke_data.json";
import { PokemonRefContext } from "../templates/RegisterPokemon";
import { hiraToKana } from "../../utils/hiraToKana";
import React from "react";

type PokemonNameForm = {
  addOptionAbility: (value: string) => void;
};

type PokemonRef = RefObject<HTMLInputElement>;

const PokemonNameForm = React.forwardRef(
  (props: PokemonNameForm, ref: PokemonRef) => {
    const { addOptionAbility } = props;
    const [filterPokemonList, setFilterPokemonList] = useState<string[]>([]);
    const [visiblePokemonList, setVisiblePokemonList] =
      useState<boolean>(false);
    const [selectIndex, setSelectIndex] = useState<number>(-1);

    useEffect(() => {
      if (ref.current.value === undefined) {
        ref.current.value = "";
      }
    }, []);

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

    const changeNameForm = (value: string) => {
      addOptionAbility(value);
      setFilterPokemonList([]);
    };

    const keyDown = (e) => {
      if (selectIndex === -1) {
        return;
      }

      if (e.key === "Enter") {
        ref.current.value = filterPokemonList[selectIndex];
        changeNameForm(ref.current.value);
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
        style={{
          height: 18,
          position: "relative",
          top: -3,
        }}
        onBlur={() =>
          setTimeout(() => changeNameForm(ref.current?.value.trim()), 300)
        }>
        <input
          type="text"
          ref={ref}
          placeholder="ポケモン名"
          id="pokemon-name-form"
          autoComplete="off"
          onFocus={() => setVisiblePokemonList(true)}
          onKeyDown={(e) => keyDown(e)}
          onChange={(e) => addpokemonLists(e.target.value.trim())}
          style={{
            background: "#8898a8",
            border: "none",
            color: "white",
            padding: 0,
            fontSize: "13px",
            position: "relative",
            height: 18,
            width: "100%",
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
  }
);

export default PokemonNameForm;
