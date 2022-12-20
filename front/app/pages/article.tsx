import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useRef, useState } from "react";
import ControlledAccordions from "../components/elements/Accordion/Accordion";
import DisplayArticle from "../components/templates/DisplayArticle";
import seriesData from "../json/series.json";
import { getData } from "../lib/api/fetchApi";

type Pokemon = {
  pokemon: string;
  count: number;
};
type Party = {
  pokemon: string;
  item: string;
  terastal: string;
};

export type Article = {
  id: number;
  tn: string;
  twitter: string;
  title: string;
  url: string;
  rate: number;
  rank: number;
  season: number;
  rental: string | null;
  party: Party[];
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
  type Version = "sv";
  type Format = "single" | "double";
  type ResultList = {
    [key: string]: number[];
  };
  const limitPerPage = 30;

  const [rankOpen, setRankOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  // const [filterArticles, setFilterArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [ranks, setRanks] = useState<[number, number]>([1, 10000]);
  const seriesDataKeys = Object.keys(seriesData);
  const [series, setSeries] = useState<string>(
    seriesDataKeys[seriesDataKeys.length - 1]
  );
  const [seasons, setSeasons] = useState<number[]>(seriesData[series]);
  const [selectSeasons, setSelectSeasons] = useState<number[]>();
  const [clickSearch, setClickSearch] = useState<boolean>(false);

  // TODO: colimnの追加
  const [version, setVersion] = useState<Version>("sv");
  const [format, setFormat] = useState<Format>("single");

  const [details, setDetails] = useState<Details>({});
  const [pokemonRanks, setPokemonRanks] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleLoading, setVisibleLoading] = useState<boolean>(true);

  const [resultlist, setResultList] = useState<ResultList[]>([]);
  const [searchPokemonList, setSearchPokemonList] = useState<string[]>([]);
  const pokemonRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const query = router.query;

  const changeVisibleLoading = (data: string) => {
    if (data.length < limitPerPage) {
      setVisibleLoading(false);
    } else {
      setVisibleLoading(true);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (query.format === "double") {
        setFormat("double");
      }

      if (query.version === "sv") {
        setVersion("sv");
      }

      const seriesToString = String(query.series);
      if (seriesData[seriesToString] !== undefined) {
        setSeries(seriesToString);
      }
    }
  }, [query, router]);

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      const params = {
        seasons: seasons,
        offset: offset,
        version: version,
        format: format,
      };
      const data = await getData(`/articles/index`, params);
      changeVisibleLoading(data);

      setArticles(data as unknown as Article[]);
      setLoading(false);

      const pokemonPerArticle = await getData("/parties/pokemon_per_article");
      setResultList(pokemonPerArticle as unknown as ResultList[]);
    };
    getArticle();
    setClickSearch(true);
  }, []);

  const loadArticle = async () => {
    setLoading(true);
    const params = {
      seasons: seasons,
      offset: offset + limitPerPage,
      version: version,
      format: format,
    };
    const data = await getData(`/articles/index`, params);
    changeVisibleLoading(data);
    setOffset((prevOffset) => prevOffset + limitPerPage);
    setArticles((prevArticles) => [
      ...prevArticles,
      ...(data as unknown as Article[]),
    ]);
    setLoading(false);
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

  const searchPokemon = async () => {
    if (resultlist[pokemonRef.current?.value] !== undefined) {
      const params = {
        ids: resultlist[pokemonRef.current.value],
      };
      const data = await getData("/articles/search_pokemon", params);
      changeVisibleLoading(data);
      setArticles(data as unknown as Article[]);
    }
  };

  const LoadingButton = () => {
    if (!visibleLoading) {
      return <></>;
    }

    if (loading) {
      return <CircularProgress />;
    }

    return <Button onClick={loadArticle}>もっと見る</Button>;
  };

  return (
    <>
      <div>
        <Typography sx={{ textAlign: "center" }}>Poke Ranker</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              border: 1,
              width: "95%",
              maxWidth: 300,
              borderRadius: "10px",
            }}>
            <input type="text" ref={pokemonRef} />
            <button onClick={() => searchPokemon()}>ポケモン検索</button>
            <FormControl>
              <FormLabel>Series{series}</FormLabel>
              <FormGroup row={true}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Season1"
                />
                <FormControlLabel control={<Checkbox />} label="Season2" />
              </FormGroup>
            </FormControl>
            <Button
              onClick={() => {
                setClickSearch(true);
                setDetails({});
              }}>
              検索
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
          }}>
          <DisplayArticle articles={articles} />
        </Box>
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
          <LoadingButton />
        </Box>
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
    </>
  );
};

export default Article;
