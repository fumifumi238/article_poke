import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DisplayArticle from "../../components/templates/DisplayArticle";
import { Article } from "../../types/articleTypes";
import { searchByTwitter } from "../../utils/searchByTwitter";

const UserResult = () => {
  const router = useRouter();
  const { twitter } = router.query;
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (router.isReady) {
      if (twitter !== undefined) {
        setValue(String(twitter));
        getArticle(String(twitter));
      }
      setLoading(false);
    }
  }, [router, twitter]);

  const getArticle = async (twitter: string) => {
    const data = await searchByTwitter(twitter);
    setArticles(data);
  };

  const changeSettingIcon = () => {
    if (value.length === 0) {
      return;
    }
    router.push(`/users/${value}`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Paper
          component="form"
          onSubmit={changeSettingIcon}
          sx={{
            display: "flex",
            alignItems: "center",
            width: 340,
            maxWidth: "95%",
            margin: 2,
          }}>
          <Typography sx={{ ml: 2, fontWeight: "bold" }}>@</Typography>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Twitter Id"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputProps={{ "aria-label": "search twitter id" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={changeSettingIcon}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            @{twitter}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>さんの成績</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "30px",
        }}>
        {loading ? <p>wait...</p> : <DisplayArticle articlesProps={articles} />}
      </Box>
    </>
  );
};

export default UserResult;
