import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ControlledAccordions from "../components/elements/Accordion/Accordion";
import Image from "next/image";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import React from "react";

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

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/index?series=1");
      const data = await res.json();
      setArticles(data.articles);
      hashedPokemons(data.pokemon_ranks, data.items, data.moves);
    };
    getData();
    console.log(utilizationRates);
  }, []);

  const hashedPokemons = (
    pokemons: { pokemon: string; count: number }[],
    items: { item: string; pokemon: string; count: number }[],
    moves: { name: string; pokemon: string; count: number }[]
  ) => {
    const hash: PokeRank = {};
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
    // for (let i = 0; i < items.length; i++) {
    //   hash[items[i].pokemon]["items"].push({
    //     name: items[i].item,
    //     count: items[i].count,
    //   });
    // }
    // const setData = (details: SetData[], type: string) => {
    //   for (let i = 0; i < details.length; i++) {
    //     hash[details[i].pokemon][type].push({
    //       name: items[i].item,
    //       count: items[i].count,
    //     });
    //   }
    // };

    // setData(items, "items");
    setUtilizationRates(hash);
    console.log(utilizationRates);
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
        <List>
          {Object.keys(utilizationRates).map((poke) => (
            <React.Fragment key={utilizationRates[poke].id}>
              {utilizationRates[poke].id <= 30 && (
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
        {/* <ul>
        {articles.map((article) => (
          <div key={article.id}>
            <li>
              <p>id:{article.id}</p>
              <p>name:{article.name}</p>
              <p>twitter:@{article.twitter}</p>
              <p>url:{article.url}</p>
              <p>rate:{article.rate}</p>
              <p>rank:{article.rank}</p>
            </li>
          </div>
        ))}
      </ul> */}
        <button onClick={loadArticle}>loading</button>
      </div>
    </div>
  );
};

export default Article;
