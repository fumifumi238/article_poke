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

const RentalSearch = () => {
  const router = useRouter();
  const { rental } = router.query;

  const [articles, setArticles] = useState<Article[]>([]);
  const [value, setValue] = useState<string>("");
  const [noData, setNoData] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      const getArticle = async () => {
        const data = await getData(
          `/articles/rental/${String(rental).toUpperCase()}`
        );
        if (data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        setArticles(data as unknown as Article[]);
      };
      getArticle();
      if (rental !== undefined) {
        setValue(String(rental).toUpperCase());
      }
    }
  }, [router, rental]);

  const changeSettingIcon = (value: string) => {
    if (value.length === 6) {
      router.push(`/rental/${value}`);
    }
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
          onSubmit={(e) => {
            value.length !== 6 ? e.preventDefault() : changeSettingIcon(value);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            width: 340,
            maxWidth: "95%",
            margin: 2,
          }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Rental Code"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            inputProps={{ "aria-label": "search rental code" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => changeSettingIcon(value)}>
            <SearchIcon />
          </IconButton>
        </Paper>
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

export default RentalSearch;
