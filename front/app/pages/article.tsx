import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NextPage } from "next";
import { Suspense, useEffect, useState } from "react";
// import ControlledAccordions from "../components/elements/Accordion/Accordion";
import Image from "next/image";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Article: NextPage = () => {
  type Article = {
    id: number;
    name: string;
    twitter: string;
    url: string;
    rate: number;
    rank: number;
    season: number;
    series: number;
  };

  type Detail = {
    name: string;
    count: number;
  };

  type PokeRank = {
    [pokemon: string]: {
      id: number;
      count: number;
      moves: Detail[];
      terastals: Detail[];
      abilities: Detail[];
      natures: Detail[];
      items: Detail[];
    };
  };

  const [rankOpen, setRankOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState<number>(30);
  const [utilizationRates, setUtilizationRates] = useState<PokeRank>({});
  const [count, setCount] = useState<number>(10);

  const ControlledAccordions = React.lazy(
    () => import("../components/elements/Accordion/Accordion")
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/index?series=1");
      const data = await res.json();
      setArticles(data.articles);
      await hashedPokemons(data.pokemon_ranks, data.items, data.moves);
    };
    getData();
  }, []);

  const hashedPokemons = async (
    pokemons: { pokemon: string; count: number }[],
    items: { item: string; pokemon: string; count: number }[],
    moves: { name: string; pokemon: string; count: number }[]
  ) => {
    const hash: PokeRank = {};
    const a = async () => {
      for (let i = 0; i < pokemons.length; i++) {
        hash[pokemons[i]["pokemon"]] = {
          id: i + 1,
          count: pokemons[i]["count"],
          items: [],
          moves: [],
          terastals: [],
          abilities: [],
          natures: [],
        };
      }
    };


    for (let i = 0; i < items.length; i++) {
      hash[items[i].pokemon]["items"].push({
        name: items[i].item,
        count: items[i].count,
      });
    }
    for (let i = 0; i < moves.length; i++) {
      hash[moves[i].pokemon]["moves"].push({
        name: moves[i].name,
        count: moves[i].count,
      });
    }
    setUtilizationRates(hash);
  };

  const loadArticle = async () => {
    const res = await fetch(
      `http://localhost:3000/articles/index?series=1&offset=${offset}`
    );
    const data = await res.json();
    setArticles((prevData) => [...prevData, ...data.articles]);
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
        <Suspense fallback="loading...">
          <List>
            {Object.keys(utilizationRates).map((poke) => (
              <React.Fragment key={utilizationRates[poke].id}>
                {utilizationRates[poke].id <= count && (
                  <ListItem disablePadding={true}>
                    <ControlledAccordions
                      rank={utilizationRates[poke].id}
                      pokemon={poke}
                      items={utilizationRates[poke].items}
                      moves={utilizationRates[poke].moves}
                    />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
          <button onClick={() => setCount((prev) => prev + 10)}>
            読み込み
          </button>
        </Suspense>
      </Drawer>
      <Fab
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 60,
          height: 60,
        }}
        onClick={toggleDrawer(true)}
      >
        <Image src="/image/ranking.png" width={60} height={60} />
      </Fab>
      <div>
        <button onClick={loadArticle}>loading</button>
      </div>
    </div>
  );
};

export default Article;
