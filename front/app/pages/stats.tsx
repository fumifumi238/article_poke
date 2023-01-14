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
      effort: number[];
    }[];
  };

  const itemRef = useRef<HTMLInputElement>(null);
  const pokemonRef = useRef<HTMLInputElement>(null);
  const [ability, setAbility] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [results, setResults] = useState<Result>({});
  const [nodata, setNodata] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const { pokemon, item } = query;
      if (poke_data[String(pokemon)] !== undefined) {
        pokemonRef.current.value = String(pokemon);
        setAbility(poke_data[String(pokemon)].abilities[0]);
        setBaseStats(poke_data[String(pokemon)].baseStats);
      }

      if (items[String(item)] !== undefined) {
        itemRef.current.value = String(item);
      }
    }
  }, [router, query]);

  const addOptionAbility = (pokemon: string) => {
    if (poke_data[pokemon] === undefined) {
      pokemonRef.current.value = "";
      return;
    }

    setAbility(poke_data[pokemon].abilities[0]);
    setBaseStats(poke_data[pokemon].baseStats);
  };

  const searchPokemon = async () => {
    if (poke_data[pokemonRef.current?.value] === undefined) {
      setNodata(true);
    }
    const params = {
      pokemon: pokemonRef.current?.value,
      item: itemRef.current?.value,
    };

    type Data = {
      id: number;
      pokemon: string;
      item: string;
      nature: string;
      url: string;
      individual: string | number[];
      effort: string | number[];
    };
    const data = (await getData(
      "/parties/search_pokemon_and_item",
      params
    )) as unknown as Data;

    console.log(data);

    if (Object.keys(data).length === 0) {
      setNodata(true);
    } else {
      setNodata(false);
    }
    const lists: Result = {};
    for (let item of Object.keys(data)) {
      const DistinctLists = [];
      const hash = {};
      for (let i = 0; i < item.length; i++) {
        const currentData: Data = data[item][i];
        if (
          currentData.individual !== undefined &&
          currentData.effort !== undefined &&
          hash[String(currentData.individual)] === undefined
        ) {
          hash[String(currentData.individual)] = i;
          currentData.individual = String(currentData.individual)
            .split(",")
            .map((d: string) => Number(d));

          currentData.effort = String(currentData.effort)
            .split(",")
            .map((d: string) => Number(d));

          DistinctLists.push(currentData);
        }
        lists[item] = DistinctLists;
      }
    }
    setResults(lists);
  };
  return (
    <>
      <div>
        <div>
          <div style={{ padding: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
              }}>
              <div style={{ position: "relative", width: 200, height: 40 }}>
                <PokemonNameForm
                  addOptionAbility={addOptionAbility}
                  ref={pokemonRef}
                />
              </div>
              <div>
                <p>@</p>
              </div>
              <div
                style={{
                  position: "relative",
                  width: 200,
                  height: 40,
                  top: 3,
                }}>
                <ItemForm ref={itemRef} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => searchPokemon()}
                style={{ width: "50vw", maxWidth: 400, height: 40 }}>
                型検索
              </button>
            </div>
            <p>種族値:{baseStats.join(",")}</p>
            <p>{ability}</p>
          </div>
        </div>

        {nodata && <p>not found</p>}
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
                    <p>性格: {result.nature}</p>
                    <div>
                      <div style={{ display: "flex" }}>
                        <p>個体値:</p>
                        <p>{result.individual[0]}-</p>
                        <p>{result.individual[1]}-</p>
                        <p>{result.individual[2]}-</p>
                        <p>{result.individual[3]}-</p>
                        <p>{result.individual[4]}-</p>
                        <p>{result.individual[5]}</p>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <p>努力値: </p>
                        <p>{result.effort[0]}-</p>
                        <p>{result.effort[1]}-</p>
                        <p>{result.effort[2]}-</p>
                        <p>{result.effort[3]}-</p>
                        <p>{result.effort[4]}-</p>
                        <p>{result.effort[5]}</p>
                      </div>
                    </div>

                    <a href={result.url}>記事</a>
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
