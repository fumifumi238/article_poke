import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import pokeData from "../../json/poke_data.json";
import itemData from "../../json/items.json";
import { alreadySearch } from "../../pages/[format]/[series]/[season]";
import { Article } from "../../types/articleTypes";

type SearchPokemon = {
  alreadySearch: alreadySearch;
  setAlreadySearch: Dispatch<SetStateAction<alreadySearch>>;
  onChangeArticle: (articles: Article[]) => void;
};

type SearchPokemonList = {
  pokemon: string;
  item?: string;
};

const SearchPokemon = ({
  alreadySearch,
  setAlreadySearch,
  onChangeArticle,
}: SearchPokemon) => {
  const [searchPokemonList, setSearchPokemonList] = useState<
    SearchPokemonList[]
  >([]);

  const pokemonRef = useRef<HTMLInputElement>(null);

  const isEqualArray = (a: SearchPokemonList[], b: SearchPokemonList[]) => {
    if (a.length !== b.length || a.length === 0) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i].pokemon !== b[i].pokemon) {
        return false;
      }

      if (a[i].item !== b[i].item) {
        return false;
      }
    }

    return true;
  };

  const searchByPokemonItem = (
    articles: Article[],
    pokemon: string,
    item: string | undefined
  ) => {
    const filterArticles: Article[] = [];

    for (let article of articles) {
      for (let poke of article.party) {
        if (poke.pokemon.includes(pokemon) && item === undefined) {
          filterArticles.push(article);
          continue;
        }

        if (poke.pokemon.includes(pokemon) && poke.item === item) {
          filterArticles.push(article);
          continue;
        }
      }
    }

    return filterArticles;
  };

  useEffect(() => {
    if (searchPokemonList.length === 0) {
      onChangeArticle(alreadySearch[0].articles);
      return;
    }

    const listLength = searchPokemonList.length;

    console.log(alreadySearch[listLength - 1]?.articles, listLength - 1);

    if (alreadySearch[listLength] !== undefined) {
      const isEqual = isEqualArray(
        alreadySearch[listLength].searchPokemonList,
        searchPokemonList
      );
      if (isEqual) {
        onChangeArticle(alreadySearch[listLength].articles);
        return;
      }
    }

    if (listLength >= 2 && alreadySearch[listLength - 1] !== undefined) {
      const isEqual = isEqualArray(
        alreadySearch[listLength - 1].searchPokemonList,
        searchPokemonList.slice(0, listLength - 1)
      );
      if (isEqual) {
        const articles = alreadySearch[listLength - 1].articles;
        const filterArticles = searchByPokemonItem(
          articles,
          searchPokemonList[listLength - 1].pokemon,
          searchPokemonList[listLength - 1].item
        );

        const copyOfAlreadySearch = { ...alreadySearch };
        copyOfAlreadySearch[listLength] = {
          articles: filterArticles,
          searchPokemonList: searchPokemonList,
        };

        setAlreadySearch(copyOfAlreadySearch);
        onChangeArticle(filterArticles);
        return;
      }
    }

    const search: alreadySearch = { [0]: alreadySearch[0] };
    const arr: SearchPokemonList[] = [];

    for (let i = 0; i < searchPokemonList.length; i++) {
      const articles = search[i].articles;
      const filterArticles = searchByPokemonItem(
        articles,
        searchPokemonList[i].pokemon,
        searchPokemonList[i].item
      );
      arr.push({
        pokemon: searchPokemonList[i].pokemon,
        item: searchPokemonList[i].item,
      });
      search[i + 1] = { articles: filterArticles, searchPokemonList: arr };
    }

    console.log(search[searchPokemonList.length].articles);

    setAlreadySearch(search);

    onChangeArticle(search[searchPokemonList.length].articles);
  }, [searchPokemonList]);

  const addSearchPokemonList = () => {
    const pokemonsList: SearchPokemonList[] = [];
    const pokemons = pokemonRef.current?.value;

    if (pokemons === "") {
      return;
    }

    const splitPokemons = pokemons.replace(/\s+/g, " ").split(" ");
    for (let pokemon of splitPokemons) {
      pokemon = pokemon.replace("＠", "@");
      if (pokemon.indexOf("@") === -1 && pokeData[pokemon] !== undefined) {
        pokemonsList.push({ pokemon: pokemon });
      }

      if (pokemon.indexOf("@") !== -1) {
        let poke = pokemon.substring(0, pokemon.indexOf("@"));
        let item = pokemon.substring(pokemon.indexOf("@") + 1, pokemon.length);

        if (pokeData[poke] !== undefined && itemData[item] !== undefined) {
          pokemonsList.push({ pokemon: poke, item: item });
        }

        if (pokeData[poke] !== undefined && itemData[item] === undefined) {
          pokemonsList.push({ pokemon: poke });
        }
      }
    }

    if (pokemonsList.length !== searchPokemonList.length) {
      setSearchPokemonList(pokemonsList);
      return;
    }

    for (let i = 0; i < pokemonsList.length; i++) {
      if (
        pokemonsList[i].pokemon !== searchPokemonList[i].pokemon ||
        pokemonsList[i].item !== searchPokemonList[i].item
      ) {
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
