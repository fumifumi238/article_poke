import { GetStaticPaths, GetStaticProps } from "next";
import { createContext, useEffect, useState } from "react";
import seriesData from "../../../json/series.json";
import { Article } from "../../../types/articleTypes";
import { getSeriesData } from "../../../utils/getSeriesData";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";

import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/router";
import { getPokemonRank, Ranking } from "../../../utils/getPokemonRank";

import FormWarning from "../../../components/templates/FormWarning";
import Modal from "@mui/material/Modal";
import { NextSeo } from "next-seo";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DisplaySetting from "../../../components/organisms/DisplaySetting";
import SearchPokemon from "../../../components/atoms/SearchPokemon";
import LoadingButton from "@mui/lab/LoadingButton";
import DisplayArticle from "../../../components/templates/DisplayArticle";
import ControlledAccordions from "../../../components/elements/Accordion/Accordion";

type PathParams = {
  format: string;
  series: string;
  season: string;
};

type PageProps = {
  articles: Article[];
  rankings: Ranking;
  season: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths: { params: PathParams }[] = [];
  for (let series of Object.keys(seriesData)) {
    for (let season of seriesData[series]) {
      paths.push({
        params: {
          format: "single",
          series: `series${series}`,
          season: `season${season}`,
        },
      });
      paths.push({
        params: {
          format: "double",
          series: `series${series}`,
          season: `season${season}`,
        },
      });
    }
  }

  return {
    paths: paths,
    fallback: false, // 上記以外のパスでアクセスした場合は 404 ページにする
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { format, series, season } = context.params as PathParams;

  let articles: Article[] = await getSeriesData(format, series);

  const defaultSeason = season.replace("season", "");

  articles = articles.filter(
    (article) => String(article.season) === defaultSeason
  );
  const rankings = getPokemonRank(articles);

  articles.sort((a, b) => a.rank - b.rank);

  const props: PageProps = {
    articles: articles,
    rankings: rankings,
    season: defaultSeason,
  };

  return { props };
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

type SearchPokemonList = {
  pokemon: string;
  item?: string;
};

export type alreadySearch = {
  [key: number]: {
    articles: Article[];
    searchPokemonList: SearchPokemonList[];
  };
};

const Series = (props: PageProps) => {
  const router = useRouter();
  const { ranks, seasons, format } = router.query;
  const series = String(router.query.series).replace("series", "");
  const season = String(router.query.season).replace("season", "");

  const [defaultSeasons, setDefaultSeasons] = useState<string[]>([season]);

  const [articles, setArticles] = useState<Article[]>(props.articles);
  const [filterArticles, setFilterArticles] = useState<Article[]>(
    articles.slice(0, 20)
  );
  const [rankings, setRankings] = useState<Ranking>(props.rankings);

  const limitPerPage = 30;
  const [offset, setOffset] = useState<number>(20);

  const [rankOpen, setRankOpen] = useState<boolean>(false);
  const [alreadySearch, setAlreadySearch] = useState<alreadySearch>({
    0: { articles: props.articles, searchPokemonList: [] },
  });

  const [rank, setRank] = useState<number[]>([1, 99999]);

  const [loading, setLoading] = useState<boolean>(true);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getArticles = async (
    seasons: string | string[],
    min: number,
    max: number
  ) => {
    let articles: Article[] = await getSeriesData(
      String(format),
      "series" + series
    );

    const hasSeason = (value: number, seasons: string | string[]) => {
      if (typeof seasons === "string") {
        return value === Number(seasons);
      }

      return seasons.indexOf(String(value)) !== -1;
    };

    articles = articles.filter(
      (article) =>
        hasSeason(article.season, seasons) &&
        article.rank >= min &&
        article.rank <= max
    );

    const rankings = getPokemonRank(articles);

    articles.sort((a, b) => a.rank - b.rank);
    articles.sort((a, b) => b.season - a.season);

    onChangeArticle(articles);
    setAlreadySearch({
      0: { articles: articles, searchPokemonList: [] },
    });
    setRankings(rankings);
    setRank([min, max]);

    setDefaultSeasons(typeof seasons === "string" ? [seasons] : seasons);
  };

  useEffect(() => {
    if (router.isReady) {
      setSuccess(false);
      let min = 1;
      let max = 99999;

      if (
        ranks !== undefined &&
        typeof ranks !== "string" &&
        ranks.length === 2
      ) {
        if (
          Number(ranks[0]) >= 1 &&
          Number(ranks[1]) <= 99999 &&
          Number(ranks[0]) <= Number(ranks[1])
        ) {
          min = Number(ranks[0]);
          max = Number(ranks[1]);
        }
      }
      if (seasons !== undefined) {
        getArticles(seasons, min, max);
        console.log("seasons");
      }

      if (
        (props.season !== season && seasons === undefined) ||
        min !== 1 ||
        max !== 99999
      ) {
        getArticles(season, min, max);
        console.log("season");
      }

      setLoading(false);
    }
  }, [router, router.query]);

  const loadArticle = () => {
    setLoading(true);

    setFilterArticles((prevArticles) => [
      ...prevArticles,
      ...articles.slice(offset, offset + limitPerPage),
    ]);

    setOffset((prevOffset) => prevOffset + limitPerPage);

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
    if (articles.length === filterArticles.length) {
      return <></>;
    }

    if (loading) {
      return <CircularProgress />;
    }

    return <Button onClick={loadArticle}>もっと見る</Button>;
  };

  const SearchingArticle = () => {
    if (loading && articles.length !== 0) {
      return <Typography>loading...</Typography>;
    }

    if (articles.length !== 0) {
      return <DisplayArticle articlesProps={filterArticles} />;
    }

    return <Typography>not found</Typography>;
  };

  const onChangeArticle = (data: Article[]) => {
    setArticles(data);
    setFilterArticles(data.slice(0, 20));
    setOffset(20);
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
          title={`Poke Ranker | ポケモンSV シリーズ${series} シーズン${season} 構築記事まとめ`}
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
          {`シーズン${season}`}】 構築記事まとめ
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
          <Button onClick={() => setOpenSetting(!openSetting)}>表示設定</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
          {openSetting && (
            <DisplaySetting
              series={series}
              rank={rank}
              seasons={defaultSeasons}
              format={String(format)}
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
            alreadySearch={alreadySearch}
            setAlreadySearch={setAlreadySearch}
            onChangeArticle={onChangeArticle}
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
        <ControlledAccordions ranking={rankings} />
      </Drawer>
    </>
  );
};

export default Series;
