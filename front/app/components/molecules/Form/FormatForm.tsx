import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Format = {
  format: string;
  setFormat: Dispatch<SetStateAction<string>>;
};

const FormatForm = ({ format, setFormat }: Format) => {
  const onChangeFormat = (value: string) => {
    setFormat(value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "4px",
      }}>
      <Typography>Format:</Typography>

      <TextField
        select
        label="Format"
        fullWidth
        size="small"
        autoComplete="off"
        value={format}
        onChange={(e) => onChangeFormat(e.target.value)}>
        <MenuItem value="single" id="single">
          Single
        </MenuItem>
        <MenuItem value="double" id="double">
          Double
        </MenuItem>
      </TextField>
    </Box>
  );
};

export default FormatForm;
