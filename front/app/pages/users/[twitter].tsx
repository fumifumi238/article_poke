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

type Props = {
  twitter: string;
  articles: Article[];
};

const UserResult = (props: Props) => {
  const router = useRouter();
  const { twitter, articles } = props;
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (twitter !== undefined) {
      setValue(String(twitter));
    }
    setLoading(false);
  }, []);

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
        {!loading && <DisplayArticle articlesProps={articles} />}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const twitter = context.query.twitter;
  const articles = await searchByTwitter(String(twitter));

  const props: Props = {
    twitter: String(twitter),
    articles: articles,
  };
  return {
    props: props,
  };
};

export default UserResult;
