import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DisplayArticle from "../../components/templates/DisplayArticle";
import { getData } from "../../lib/api/fetchApi";
import type Article from "../article";

const UserResult = () => {
  const router = useRouter();
  const { twitter } = router.query;

  const [articles, setArticles] = useState<Article[]>([]);
  const [value, setValue] = useState<string>("");
    const [noData, setNoData] = useState<boolean>(false);

    useEffect(() => {
      if (router.isReady) {
        const getArticle = async () => {
          const data = await getData(`/users/${twitter}`);
          if (data.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
          }
          setArticles(data as unknown as Article[]);
        };
        getArticle();
        if (twitter !== undefined) {
          setValue(String(twitter));
        }

      }
    }, [router, twitter]);

  const changeSettingIcon = () => {
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
        <Typography sx={{ fontWeight: "bold" }}>
          <span style={{ color: "green" }}>@{twitter}</span> さんの成績
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "30px",
        }}>
        {noData ? (
          <Typography>not found</Typography>
        ) : (
          <DisplayArticle articles={articles} />
        )}
      </Box>
    </>
  );
};

export default UserResult;
