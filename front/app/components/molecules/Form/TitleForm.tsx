import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Title = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  validationForm: () => void;
};

const TitleForm = ({ title, setTitle, validationForm }: Title) => {
  const onChangeTitle = (value: string) => {
    const maxTitleLength = 255;

    if (value.length < maxTitleLength) {
      setTitle(value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
      }}>
      <Typography sx={{ fontSize: "16px" }}>Title*:</Typography>
      <TextField
        placeholder="【SV S1】対面ガッサミミドラパ 【最終レート2000 最終1位】"
        label="Title*"
        size="small"
        fullWidth
        autoComplete="off"
        value={title}
        onBlur={validationForm}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
    </Box>
  );
};

export default TitleForm;
