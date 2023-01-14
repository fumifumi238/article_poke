import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ItemForm from "../components/organisms/ItemForm";
import PokemonNameForm from "../components/organisms/PokemonNameForm";
import poke_data from "../json/poke_data.json";
import items from "../json/items.json";

const Stats = () => {
  const router = useRouter();
  const query = router.query;

  const itemRef = useRef<HTMLInputElement>(null);
  const pokemonRef = useRef<HTMLInputElement>(null);
  const [currntPokemon, setCurrentPokemon] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [ability, setAbility] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (router.isReady) {
      const { pokemon, item } = query;
      if (poke_data[String(pokemon)] !== undefined) {
        pokemonRef.current.value = String(pokemon);
        setCurrentPokemon(String(pokemon));
        setAbility(poke_data[String(pokemon)].abilities[0]);
        setBaseStats(poke_data[String(pokemon)].baseStats);
      }

      if (items[String(item)] !== undefined) {
        itemRef.current.value = String(item);
        setCurrentItem(String(item));
      }
    }
  }, [router, query]);

  const addOptionAbility = (pokemon: string) => {
    if (poke_data[pokemon] === undefined) {
      pokemonRef.current.value = "";
      setCurrentPokemon("");
      return;
    }

    setCurrentPokemon(pokemon);
    setAbility(poke_data[pokemon].abilities[0]);
    setBaseStats(poke_data[pokemon].baseStats);
  };

  const searchPokemon = () => {};
  return (
    <>
      <div>
        <div>
          <div style={{ padding: "4px" }}>
            <PokemonNameForm
              addOptionAbility={addOptionAbility}
              ref={pokemonRef}
            />
            <ItemForm ref={itemRef} />
            <p>種族値:{baseStats.join(",")}</p>
            <p>{ability}</p>
          </div>
        </div>
        <button onClick={() => searchPokemon()}>型検索</button>
      </div>
    </>
  );
};

export default Stats;
