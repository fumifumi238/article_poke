import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import rule from "../../json/rule.json";
import seriesData from "../../json/series.json";

type Rule = {
  series: string;
};

type Format = "single" | "double";

const Rule = ({ series }: Rule) => {
  const router = useRouter();
  const iconUrl = `/image/rankedBattles/series${series}.jpg`;

  const redirectToArticle = (format: Format = "single", seasons?: string) => {
    let url = `/article?format=${format}&series=${series}`;
    if (seasons !== undefined) {
      url += `&seasons=${seasons}`;
    }
    router.push(url);
  };
  return (
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
            シリーズ{series}について
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
            src={iconUrl}
            layout="fill"
            alt={`series${series}`}
            objectFit="contain"
            style={{ textAlign: "center" }}
            onClick={() => redirectToArticle()}
          />
        </Box>
        <Box sx={{ width: "100%", bgcolor: "#00CED1", mt: 1 }}>
          <Box sx={{ width: "99%", bgcolor: "#EEEEEE", marginLeft: "1%" }}>
            <Typography>シリーズ{series}を使用する期間</Typography>
          </Box>
        </Box>
        <Box>
          <Typography>{rule[series].term}</Typography>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "#00CED1" }}>
          <Box sx={{ width: "99%", bgcolor: "#EEEEEE", marginLeft: "1%" }}>
            <Typography>シリーズ{series}のレギュレーション</Typography>
          </Box>
        </Box>
        <Box sx={{ border: "2px solid #EEEEEE", mt: 1 }}>
          <Typography sx={{ paddingLeft: 1 }}>使用できるポケモン</Typography>
        </Box>
        <Box>
          {rule[series].regulation.map((word: string) => (
            <Typography key={word}>{word}</Typography>
          ))}
        </Box>
        <Box>
          <Box sx={{ width: "100%", bgcolor: "#00CED1" }}>
            <Box sx={{ width: "99%", bgcolor: "#EEEEEE", marginLeft: "1%" }}>
              <Typography>シリーズ{series}の構築記事</Typography>
            </Box>
          </Box>
          {["single", "double"].map((form: Format) => (
            <Box key={form}>
              {seriesData[series].map((num: string) => (
                <Button
                  key={num}
                  onClick={() => redirectToArticle(form, num)}
                  color="info">
                  <Typography key={num}>
                    SV シーズン{num} {form === "single" ? "シングル" : "ダブル"}{" "}
                    構築記事まとめ
                  </Typography>
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Rule;
