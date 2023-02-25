import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect } from "react";

import seriesData from "../../../json/series.json";

type Season = {
  series: string;
  season: string;
  setSeason: Dispatch<SetStateAction<string>>;
};

const SeasonForm = ({ series, season, setSeason }: Season) => {
  useEffect(() => {}, [series]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
      }}>
      <Typography sx={{ fontSize: "16px" }}>Season*:</Typography>
      <FormControl size="small">
        <InputLabel variant="standard" htmlFor="Season">
          Season
        </InputLabel>
        <Select
          defaultValue={seriesData[series][0]}
          value={season}
          onChange={(e) => setSeason(e.target.value)}>
          {seriesData[series].map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SeasonForm;
