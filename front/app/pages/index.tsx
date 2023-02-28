import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Rule from "../components/templates/Rule";
import PageInfo from "../components/templates/PageInfo";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";

import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { getCurrentSeason } from "../utils/getCurrentSeason";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Format = "single" | "double";

const Home: NextPage = () => {
  const router = useRouter();
  const statsDiscriptions = [
    "・ポケモン名を入力すると、そのポケモンが使われている記事の努力値、持ち物、性格の一覧が見れます。",
  ];
  const formDiscriptions = [
    "・構築記事の投稿ができます。努力値は必須ではないですが、入力していただければ、記事一覧のページや型検索から努力値がわかります。",
    "・性格はチェックボタン(☑)を押しても変えれます。",
    "・Twitter idを入力するとシーズンごとの成績が見れます。",
  ];

  const articleDiscriptions = [
    "・タイトル名をクリックすると、構築記事に飛べます。",
    "・詳細をクリックすると、技や努力値が見れます。",
    "・使用率をクリックすると、ポケモンやテラスタルの採用率が見れます。",
    "・表示設定から順位、フォーマット(シングルかダブル)、シーズンの変更ができます。",
    "・入力欄にポケモン名を区切って入れると、そのポケモンが入っている構築が出ます。",
    "・トレーナー名をクリックすると、その人のシーズンごとの成績が見れます。",
  ];

  const { currentSeason, currentSeries } = getCurrentSeason();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Box>
        <Rule series="2" />
        <Box
          sx={{
            border: 1,
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
            marginY: 2,
            flexDirection: "column",
          }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "gray", margin: 1 }}>
            構築記事一覧
          </Typography>
          <Accordion
            sx={{
              border: 1,
              width: "100%",
              borderRadius: "5px",
              margin: "0 auto",
            }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header">
              <Typography
                sx={{
                  width: "33%",
                  flexShrink: 0,
                  marginLeft: 1,
                  fontFamily: "Arial",
                }}>
                Series1
              </Typography>
              <Typography sx={{ color: "text.secondary", fontFamily: "Arial" }}>
                Season1 ~ Season2
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Rule series="1" />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box
          sx={{
            border: 1,
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
            marginY: 2,
          }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                bgcolor: "#689BCD",
                color: "white",
                fontFamily: "fantasy",
                paddingLeft: 2,
              }}>
              Pages
            </Typography>
            <PageInfo
              icon={<ArticleIcon sx={{ height: 40, width: 40 }} />}
              value="構築記事一覧"
              url={`/single/series${currentSeries}/season${currentSeason}`}
              imageSrc="/image/pageInfo/article.jpg"
              discriptions={articleDiscriptions}
            />
            <PageInfo
              icon={<CreateIcon sx={{ height: 40, width: 40 }} />}
              value="構築記事投稿"
              url="/form"
              imageSrc="/image/pageInfo/form.png"
              discriptions={formDiscriptions}
            />
            <PageInfo
              icon={<TroubleshootIcon sx={{ height: 40, width: 40 }} />}
              value="型検索"
              url="/stats"
              imageSrc="/image/pageInfo/stats.png"
              discriptions={statsDiscriptions}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
