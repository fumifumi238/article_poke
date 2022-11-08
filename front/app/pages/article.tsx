import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import ControlledAccordions from "../components/elements/Accordion/Accordion";
import Image from "next/image";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Pokemon = {
  pokemon: string;
  count: number;
};

type Article = {
  id: number;
  user_name: string;
  twitter: string;
  title: string;
  url: string;
  rate: number;
  rank: number;
  season: number;
  // series: number;
};
export type Types = {
  name: string;
  count: number;
};
export type Details = {
  [pokemon: string]: {
    items: Types[];
    moves: Types[];
    terastals: Types[];
    ablities: Types[];
    natures: Types[];
  };
};

type PokemonRanksContext = {
  pokemonRanks: Pokemon[];
  setPokemonRanks: React.Dispatch<React.SetStateAction<Pokemon[]>>;
};

type ClicksearchContext = {
  clickSearch: boolean;
  setClickSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

type DetailsContext = {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
};

export const ClickSearchContext = createContext({} as ClicksearchContext);
export const PokemonRanksContext = createContext({} as PokemonRanksContext);
export const DetailsContext = createContext({} as DetailsContext);

export const Article: NextPage = () => {
  const [rankOpen, setRankOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterArticles, setFilterArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState<number>(30);
  const [ranks, setRanks] = useState<[number, number]>([1, 10000]);
  const [seasons, setSeasons] = useState<number[]>([1, 2]);
  const [clickSearch, setClickSearch] = useState<boolean>(true);

  const [details, setDetails] = useState<Details>({});
  const [pokemonRanks, setPokemonRanks] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/index?series=1");
      const data = await res.json();
      setArticles(data);
      setFilterArticles(data.slice(0, 30));
      setLoading(true);
    };
    getData();
    console.log("article");
  }, []);

  const loadArticle = async () => {
    setFilterArticles((prevData) => [
      ...prevData,
      ...articles.slice(offset, offset + 30),
    ]);
    setOffset((prevOffset) => prevOffset + 30);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setRankOpen(open);
    };

  return (
    <div>
      <Drawer open={rankOpen} onClose={toggleDrawer(false)} anchor="right">
        <ClickSearchContext.Provider value={{ clickSearch, setClickSearch }}>
          <PokemonRanksContext.Provider
            value={{ pokemonRanks, setPokemonRanks }}>
            <DetailsContext.Provider value={{ details, setDetails }}>
              <ControlledAccordions seasons={seasons} ranks={ranks} />
            </DetailsContext.Provider>
          </PokemonRanksContext.Provider>
        </ClickSearchContext.Provider>
      </Drawer>

      <button
        onClick={() => {
          setClickSearch(true);
          setDetails({});
        }}>
        Search botton
      </button>

      {loading ? (
        filterArticles.map((filterArticle) => (
          <div key={filterArticle.id}>
            <p>
              user:{filterArticle.user_name} @{filterArticle.twitter}
            </p>
            <p>
              rate:{filterArticle.rate} rank:{filterArticle.rank} article:
              {filterArticle.season}
            </p>
            <a href={filterArticle.url}>title:{filterArticle.title}</a>
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
      <div>
        <button onClick={loadArticle}>loading</button>
      </div>
      <Fab
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 60,
          height: 60,
        }}
        onClick={toggleDrawer(true)}>
        <Image src="/image/ranking.png" width={60} height={60} />
      </Fab>
    </div>
  );
};

export default Article;
