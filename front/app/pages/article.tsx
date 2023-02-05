import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import SearchPokemon from "../components/atoms/SearchPokemon";
import ControlledAccordions from "../components/elements/Accordion/Accordion";
import DisplaySetting from "../components/organisms/DisplaySetting";
import DisplayArticle from "../components/templates/DisplayArticle";
import seriesData from "../json/series.json";
import { getData } from "../lib/api/fetchApi";
import { ArticleContext } from "./_app";
import ErrorIcon from "@mui/icons-material/Error";
import Modal from "@mui/material/Modal";
import FormWarning from "../components/templates/FormWarning";

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

type ChangeSettingContext = {
  changeSetting: boolean;
  setChangeSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

type DetailsContext = {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
};

export type alreadySearch = {
  [key: number]: {
    articles: Article[];
    searchIds: (number | string)[];
    searchPokemonList: string[];
  };
};

export const ChangeSettingContext = createContext({} as ChangeSettingContext);
export const PokemonRanksContext = createContext({} as PokemonRanksContext);
export const DetailsContext = createContext({} as DetailsContext);

export const Article: NextPage = () => {
  const limitPerPage = 30;
  const [offset, setOffset] = useState<number>(20);

  const [rankOpen, setRankOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleIds, setArticleIds] = useState<number[]>([]);
  const [alreadySearch, setAlreadySearch] = useState<alreadySearch>({
    0: { articles: [], searchIds: [], searchPokemonList: [] },
  });
  const [currentId, setCurrentId] = useState<number>(0);

  const [ranks, setRanks] = useState<[number, number]>([1, 99999]);
  const seriesDataKeys = Object.keys(seriesData);
  const [series, setSeries] = useState<string>(
    seriesDataKeys[seriesDataKeys.length - 1]
  );
  const [seasons, setSeasons] = useState<string[]>([
    seriesData[series][seriesData[series].length - 1],
  ]);

  const [changeSetting, setChangeSetting] = useState<boolean>(false);

  const [format, setFormat] = useState<string>("single");

  const [details, setDetails] = useState<Details>({});
  const [pokemonRanks, setPokemonRanks] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleLoading, setVisibleLoading] = useState<boolean>(true);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const [noData, setNoData] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { cashArticle, setCashArticle } = useContext(ArticleContext);

  const router = useRouter();
  const query = router.query;

  const changeVisibleLoading = () => {
    if (articles.length === alreadySearch[currentId]?.searchIds?.length) {
      setVisibleLoading(false);
    } else {
      setVisibleLoading(true);
    }
  };

  useEffect(() => {
    changeVisibleLoading();
  }, [articles]);

  const getArticle = async (
    currentSeasons: string[] = seasons,
    currentFormat: string = format,
    currentRanks: number[] = ranks
  ) => {
    setLoading(true);
    const params = {
      seasons: currentSeasons,
      format: currentFormat,
      ranks: currentRanks,
    };

    const cash = currentSeasons + currentFormat + currentRanks;

    let data = [[], []];

    if (cashArticle[cash] === undefined) {
      data = await getData(`/articles/index`, params);
      const copyOfCash = { ...cashArticle };
      copyOfCash[cash] = {
        article: data[0],
        articleIds: data[1],
      };
      setCashArticle(copyOfCash);
    } else {
      data = [cashArticle[cash].article, cashArticle[cash].articleIds];
    }

    setArticles(data[0] as unknown as Article[]);
    setArticleIds(data[1] as unknown as number[]);

    setAlreadySearch({
      0: { articles: data[0], searchIds: data[1], searchPokemonList: [] },
    });

    setLoading(false);

    if (data.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const processQuery = (
        query: string | string[],
        defaultValue: string,
        options: string[],
        setState: (value: React.SetStateAction<string>) => void
      ) => {
        const findOption = options.find((option) => option === query);
        if (findOption === undefined) {
          return defaultValue;
        }

        setState(String(query));

        return query;
      };

      const defaultFormat = "single";
      const formatOptions = ["double", "single"];
      let currentFormat = processQuery(
        query.format,
        defaultFormat,
        formatOptions,
        setFormat
      );

      const ranksQuery = query.ranks;
      let currentRanks = ranks;

      if (
        Array.isArray(ranksQuery) &&
        Number(ranksQuery[0]) >= 1 &&
        Number(ranksQuery[1]) <= 99999 &&
        Number(ranksQuery[0]) < Number(ranksQuery[1])
      ) {
        currentRanks = [Number(ranksQuery[0]), Number(ranksQuery[1])];
        setRanks(currentRanks);
      }

      const seriesToString = String(query.series);
      let currentSeasons = seasons;
      if (seriesData[seriesToString] !== undefined) {
        if (query.seasons === undefined) {
          setSeries(seriesToString);
          currentSeasons = seriesData[seriesToString];
        } else if (typeof query.seasons === "string") {
          currentSeasons = [query.seasons];
        } else {
          currentSeasons = query.seasons;
        }

        setSeasons(currentSeasons);
      }

      getArticle(currentSeasons, String(currentFormat), currentRanks);
      setOffset(20);
      setSuccess(false);
      setChangeSetting(true);
    }
  }, [query, router]);

  const loadArticle = async () => {
    setLoading(true);

    const params = {
      ids: alreadySearch[currentId]?.searchIds?.slice(
        offset,
        offset + limitPerPage
      ),
    };
    const data = await getData(`/articles/load`, params);
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

  const LoadingButton = () => {
    if (!visibleLoading) {
      return <></>;
    }

    if (loading) {
      return <CircularProgress />;
    }

    return <Button onClick={loadArticle}>もっと見る</Button>;
  };

  const SearchingArticle = () => {
    if (loading && articles.length !== 0 && noData) {
      return <Typography>loading...</Typography>;
    }

    if (!noData) {
      return <DisplayArticle articles={articles} />;
    }

    return <Typography>not found</Typography>;
  };

  const searchPokemonByIds = async (
    index: number,
    ids: (string | number)[],
    searchPokemonList: string[]
  ) => {
    setLoading(true);
    const data = await getData("/articles/search_pokemon", {
      ids: ids,
    });
    setOffset(20);

    setCurrentId(index);

    setArticles(data as unknown as Article[]);

    const copyOfAlreadySearch = alreadySearch;
    copyOfAlreadySearch[searchPokemonList.length] = {
      articles: data as unknown as Article[],
      searchIds: ids,
      searchPokemonList: searchPokemonList,
    };

    setAlreadySearch(copyOfAlreadySearch);

    setLoading(false);
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            height: "80%",
            overflow: "scroll",
          }}>
          <FormWarning />
        </Box>
      </Modal>
      <div>
        <NextSeo
          title="Poke Ranker | ポケモンSV シリーズ1 シーズン2 構築記事まとめ"
          description="ポケモンの構築記事が読みたい方はこちら。"
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "16px",
            textAlign: "center",
            margin: 1,
            color: "grey",
          }}>
          【ポケモンSV {format === "single" ? "シングル" : "ダブル"}{" "}
          {seriesData[series].length === seasons.length
            ? `シリーズ${series}`
            : `シーズン
          ${seasons[seasons.length - 1]}`}
          】 構築記事まとめ
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
          <Button onClick={() => setOpenSetting(!openSetting)}>表示設定</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
          {openSetting && (
            <DisplaySetting
              series={series}
              ranks={ranks}
              seasons={seasons}
              format={format}
              success={success}
              setSuccess={setSuccess}
            />
          )}
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            width: "95%",
            maxWidth: 400,
          }}>
          <SearchPokemon
            searchPokemonByIds={searchPokemonByIds}
            articleIds={articleIds}
            alreadySearch={alreadySearch}
            setArticle={setArticles}
            setCurrentId={setCurrentId}
            setOffset={setOffset}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
            }}>
            <Button onClick={() => setModalOpen(true)}>
              <ErrorIcon color="info" />
              <Typography sx={{ color: "gray", borderBottom: 1 }}>
                フォルム違いについて
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
          }}>
          <SearchingArticle />
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
            width: 80,
            height: 80,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#999696",
          }}
          onClick={toggleDrawer(true)}>
          <Image src="/image/ranking.png" width={65} height={65} alt={"rank"} />
          <Typography sx={{ color: "white", paddingBottom: "3px" }}>
            使用率
          </Typography>
        </Fab>
      </div>
      <Drawer open={rankOpen} onClose={toggleDrawer(false)} anchor="right">
        <ChangeSettingContext.Provider
          value={{ changeSetting, setChangeSetting }}>
          <PokemonRanksContext.Provider
            value={{ pokemonRanks, setPokemonRanks }}>
            <DetailsContext.Provider value={{ details, setDetails }}>
              <ControlledAccordions
                articleIds={articleIds}
                counts={articleIds.length}
              />
            </DetailsContext.Provider>
          </PokemonRanksContext.Provider>
        </ChangeSettingContext.Provider>
      </Drawer>
    </>
  );
};

export default Article;
