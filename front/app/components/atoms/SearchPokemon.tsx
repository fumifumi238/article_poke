import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import defferentFormsPokemons from "../../json/differentFormPokemons.json";
import pokeData from "../../json/poke_data.json";
import { getData } from "../../lib/api/fetchApi";
import Article, { alreadySearch } from "../../pages/article";
import { isEqualArray } from "../../utils/isEqualArray";

type SearchPokemon = {
  articleIds: number[];
  alreadySearch: alreadySearch;
  setArticle: Dispatch<SetStateAction<Article[]>>;
  setCurrentId: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  searchPokemonByIds: (
    index: number,
    ids: (string | number)[],
    searchPokemonList: string[]
  ) => void;
};

const SearchPokemon = ({
  articleIds,
  alreadySearch,
  setArticle,
  setCurrentId,
  setOffset,
  searchPokemonByIds,
}: SearchPokemon) => {
  type ResultList = {
    [key: string]: number[];
  };

  const [resultlist, setResultList] = useState<ResultList>({});
  const [searchPokemonList, setSearchPokemonList] = useState<string[]>([]);

  const pokemonRef = useRef<HTMLInputElement>(null);
  const valuesOrderByRank = (ranks: number[], values: (number | string)[]) => {
    const arr = [];

    const valuesRank = {};
    for (let value of values) {
      valuesRank[value] = 1;
    }

    for (let rank of ranks) {
      if (valuesRank[rank] !== undefined) {
        arr.push(rank);
      }
    }

    return arr;
  };

  useEffect(() => {
    pokemonRef.current.value = "";
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
    setOffset(20);
    if (searchPokemonList.length === 0) {
      setArticle(alreadySearch[0].articles);
      setCurrentId(0);
      return;
    }
    let hash: { [key: string]: number } = {};

    for (let i = 0; i < searchPokemonList.length; i++) {
      let lists = searchPokemon(searchPokemonList[i]);

      for (let list of lists) {
        if (hash[list] === undefined) {
          hash[list] = 1;
        } else {
          hash[list] += 1;
        }
      }
    }

    let values = Object.keys(hash).filter(
      (key) => hash[key] === searchPokemonList.length
    );

    values = valuesOrderByRank(articleIds, values);

    const equalArray =
      alreadySearch[searchPokemonList.length]?.searchPokemonList !== undefined
        ? isEqualArray(
            searchPokemonList,
            alreadySearch[searchPokemonList.length].searchPokemonList
          )
        : false;

    if (!equalArray) {
      searchPokemonByIds(searchPokemonList.length, values, searchPokemonList);
    } else {
      setArticle(alreadySearch[searchPokemonList.length].articles);
    }
  }, [searchPokemonList]);

  const searchPokemon = (pokemon: string) => {
    const articles: number[] = [];

    if (
      resultlist[pokemon] === undefined &&
      defferentFormsPokemons[pokemon] === undefined
    ) {
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
      return;
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
      placeholder="サーフゴー　ドラパルト etc...(半角で区切って検索)"
      style={{ width: "100%", height: 40 }}
    />
  );
};

export default SearchPokemon;
