import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Url = {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<boolean>>;
  validationForm: () => void;
};

const UrlForm = ({ url, setUrl, validationForm, setError }: Url) => {
  const [existUrlList, setExistUrlList] = useState<string[]>([]);
  const [urlError, setUrlError] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/get_exist_url");
      const data = await res.json();
      setExistUrlList(data);
    };
    getData();
  }, []);

  const checkUrlError = (value: string) => {
    let error = "";
    const validUrl = /https?:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+/;

    if (!value.match(validUrl)) {
      error = "無効なURLです。";
    }

    for (let existUrl of existUrlList) {
      if (value === existUrl) {
        error = "そのURLはすでに存在しています。";
      }
    }

    if (urlError !== error) {
      setUrlError(error);
      if (error === "") {
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
      }}>
      <Typography sx={{ fontSize: "16px" }}>URL*:</Typography>
      <TextField
        placeholder="https://hatenablog.com/"
        label="URL*"
        size="small"
        autoComplete="off"
        fullWidth
        value={url}
        error={urlError !== ""}
        helperText={urlError}
        onChange={(e) => {
          setUrl(e.target.value), checkUrlError(e.target.value);
        }}
        onBlur={validationForm}
      />
    </Box>
  );
};

export default UrlForm;
