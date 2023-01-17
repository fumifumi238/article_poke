import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import GoogleAdsense from "../src/components/GoogleAdsense";

type Format = "single" | "double";

const Home: NextPage = () => {
  const router = useRouter();

  const redirectToArticle = (format: Format = "single") => {
    router.push(`/article?format=${format}`);
  };

  return (
    <>
      <div>
        <Box
          sx={{
            border: 1,
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            borderRadius: "2px",
            marginTop: 2,
          }}>
          <Box sx={{ width: "95%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  fontFamily: "serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}>
                シリーズ1について
              </Typography>
              <Box sx={{ display: "flex", margin: "0 0 0 auto" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ margin: "4px" }}
                  onClick={() => redirectToArticle()}>
                  シングル
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ margin: "4px" }}
                  onClick={() => redirectToArticle("double")}>
                  ダブル
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "16/9",
                margin: "0 auto",
              }}>
              <Image
                src="/image/rankedBattles/series1.jpg"
                layout="fill"
                alt={"series1"}
                objectFit="contain"
                style={{ textAlign: "center" }}
                onClick={() => redirectToArticle()}
              />
            </Box>
            <Box sx={{ width: "100%", bgcolor: "#00CED1", mt: 1 }}>
              <Box sx={{ width: "99%", bgcolor: "#EEEEEE", marginLeft: "1%" }}>
                <Typography>シリーズ1を使用する期間</Typography>
              </Box>
            </Box>
            <Box>
              <Typography>2022年12月2日(金)~2023年2月1日(水)8:59</Typography>
            </Box>
            <Box sx={{ width: "100%", bgcolor: "#00CED1" }}>
              <Box sx={{ width: "99%", bgcolor: "#EEEEEE", marginLeft: "1%" }}>
                <Typography>シリーズ1のレギュレーション</Typography>
              </Box>
            </Box>
            <Box sx={{ border: "2px solid #EEEEEE", mt: 1 }}>
              <Typography sx={{ paddingLeft: 1 }}>
                使用できるポケモン
              </Typography>
            </Box>
            <Box>
              <Typography>
                パルデア図鑑に登場するポケモンが参加できます。
              </Typography>
              <Typography>
                ※ パラドクスポケモン、及び伝説のポケモンは使用禁止
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};


export default Home;
