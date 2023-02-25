import ArticleIcon from "@mui/icons-material/Article";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { getCurrentSeason } from "../../utils/getCurrentSeason";

const ArticleIconButton = () => {
  const router = useRouter();

  const { currentSeries, currentSeason } = getCurrentSeason();

  const redirectToArticle = () => {
    router.push(`/single/series${currentSeries}/season${currentSeason}`);
  };

  return (
    <Fab
      color="primary"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80px",
        height: "80px",
      }}>
      <ArticleIcon
        onClick={redirectToArticle}
        sx={{ width: "50px", height: "50px", mt: 2 }}
      />
      <Typography
        sx={{ color: "white", mb: 2, fontSize: "13px", fontWeight: "bold" }}>
        構築記事
      </Typography>
    </Fab>
  );
};

export default ArticleIconButton;
