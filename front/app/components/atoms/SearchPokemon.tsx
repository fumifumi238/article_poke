import { useEffect, useRef, useState } from "react";
import defferentFormsPokemons from "../../json/differentFormPokemons.json";
import pokeData from "../../json/poke_data.json";
import { getData } from "../../lib/api/fetchApi";

type SearchPokemon = {
  searchPokemonByIds: (ids: (number | string)[]) => void;
  articleIds: number[];
};

const SearchPokemon = ({ searchPokemonByIds, articleIds }: SearchPokemon) => {
  type ResultList = {
    [key: string]: number[];
  };
  const [resultlist, setResultList] = useState<ResultList>({});
  const [searchIds, setSearchIds] = useState<(number | string)[]>([]);
  const [searchPokemonList, setSearchPokemonList] = useState<string[]>([]);
  const [alreadySearch, setAlreadySearch] = useState<{
    [key: number]: string[];
  }>({ 0: [""] });

  const pokemonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getArticleData = async () => {
      // どの記事にどのポケモンがいるかを返す。検索用
      const params = {
        ids: articleIds,
      };
      const pokemonPerArticle = await getData(
        "/parties/pokemon_per_article",
        params
      );

      setResultList(pokemonPerArticle as unknown as ResultList);
    };

    getArticleData();
  }, [articleIds]);

  useEffect(() => {
    if (searchPokemonList.length === 0) {
      return;
    }
    let hash: { [key: string]: number } = {};

    console.log(searchPokemonList);

    for (let i = 0; i < searchPokemonList.length; i++) {
      let lists = searchPokemon(searchPokemonList[i]);
      if (lists.length === 0) {
        console.log("no result");
      }

      for (let list of lists) {
        if (hash[list] === undefined) {
          hash[list] = 1;
        } else {
          hash[list] += 1;
        }
      }
    }

    const values = Object.keys(hash).filter(
      (key) => hash[key] === searchPokemonList.length
    );

    setSearchIds(values);
  }, [searchPokemonList]);

  useEffect(() => {
    searchPokemonByIds(searchIds);
  }, [searchIds]);

  const searchPokemon = (pokemon: string) => {
    const articles: number[] = [];

    if (resultlist[pokemon] === undefined) {
      return [];
    }
    if (defferentFormsPokemons[pokemon] !== undefined) {
      for (let poke of defferentFormsPokemons[pokemon]) {
        const ids: number[] = resultlist[poke];
        if (ids !== undefined) {
          articles.push(...ids);
        }
      }
    } else {
      articles.push(...resultlist[pokemon]);
    }

    const articleIdsToSet = new Set(articles);

    return Array.from(articleIdsToSet);
  };

  const addSearchPokemonList = () => {
    const pokemonsList = [];
    const pokemons = pokemonRef.current?.value;

    if (pokemons === "") {
    }

    const splitPokemons = pokemons.replace(/\s+/g, " ").split(" ");
    for (let pokemon of splitPokemons) {
      if (pokeData[pokemon] !== undefined) {
        pokemonsList.push(pokemon);
      }
    }

    if (pokemonsList.length !== searchPokemonList.length) {
      setSearchPokemonList(pokemonsList);
      return;
    }

    for (let i = 0; i < pokemonsList.length; i++) {
      if (pokemonsList[i] !== searchPokemonList[i]) {
        setSearchPokemonList(pokemonsList);
        return;
      }
    }
  };

  return (
    <input
      type="text"
      ref={pokemonRef}
      onChange={addSearchPokemonList}
      placeholder="サーフゴー ドドゲザン　ドラパルト"
      style={{ width: "100%", height: 40 }}
    />
  );
};

export default SearchPokemon;
