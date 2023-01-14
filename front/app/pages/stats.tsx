import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ItemForm from "../components/organisms/ItemForm";
import PokemonNameForm from "../components/organisms/PokemonNameForm";
import poke_data from "../json/poke_data.json";
import items from "../json/items.json";
import { getData } from "../lib/api/fetchApi";

const Stats = () => {
  const router = useRouter();
  const query = router.query;

  type Result = {
    [key: string]: {
      id: number;
      pokemon: string;
      item: string;
      nature: string;
      url: string;
      individual: number[];
      effort: number;
    }[];
  };

  const itemRef = useRef<HTMLInputElement>(null);
  const pokemonRef = useRef<HTMLInputElement>(null);
  const [currentPokemon, setCurrentPokemon] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [ability, setAbility] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [results, setResults] = useState<Result>({});

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

  const searchPokemon = async () => {
    const params = {
      pokemon: currentPokemon,
      item: currentItem,
    };
    const data = await getData("/parties/search_pokemon_and_item", params);
    const lists: Result = {};
    for (let key of Object.keys(data)) {
      const DistinctLists = [];
      const hash = {};
      for (let i = 0; i < key.length; i++) {
        const currentData = { ...data[key][i] };
        if (hash[currentData.individual] === undefined) {
          hash[currentData.individual] = i;
          currentData.individual = currentData.individual
            ?.split(",")
            .map((d: string) => Number(d));

          currentData.effort = currentData.effort
            ?.split(",")
            .map((d: string) => Number(d));

          DistinctLists.push(currentData);
        }
        lists[key] = DistinctLists;
      }
    }
    setResults(lists);
  };
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
        <div>
          {Object.keys(results).map((nature) => (
            <div key={nature}>
              <p>{nature}</p>
              <div>
                {results[nature].map((result) => (
                  <div key={result.id}>
                    <p>
                      {result.pokemon}@{result.item}
                    </p>
                    <p>個体値: {result.individual}</p>
                    <p>努力値: {result.effort}</p>
                    <p>参考URL:{result.url}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stats;
