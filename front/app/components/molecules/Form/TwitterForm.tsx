import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Twitter = {
  twitter: string;
  setTwitter: Dispatch<SetStateAction<string>>;
};

const TwitterForm = ({ twitter, setTwitter }: Twitter) => {
  const onChangeTwitter = (value: string) => {
    const maxTwitterLength = 15;
    if (value.length <= maxTwitterLength) {
      setTwitter(value);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "4px",
        width: "55%",
        minWidth: 240,
      }}>
      <Typography> Twitter:@</Typography>

      <TextField
        placeholder="twitter_id"
        fullWidth
        label="Twitter"
        size="small"
        autoComplete="off"
        value={twitter}
        onChange={(e) => onChangeTwitter(e.target.value)}
      />
    </Box>
  );
};

export default TwitterForm;
