import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import seriesData from "../../../json/series.json";

type Series = {
  series: string;
  setSeries: Dispatch<SetStateAction<string>>;
  setSeason: Dispatch<SetStateAction<string>>;
};

const SeriesForm = ({ series, setSeries, setSeason }: Series) => {
  const onChangeSeries = (value: string) => {
    setSeries(value);
    setSeason(seriesData[value][seriesData[value].length - 1]);
  };
  const seriesKeys = Object.keys(seriesData);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
        paddingRight: 2,
      }}>
      <Typography sx={{ fontSize: "16px" }}>Series*:</Typography>
      <FormControl size="small">
        <InputLabel variant="standard" htmlFor="Series">
          Series
        </InputLabel>
        <Select
          defaultValue={seriesKeys[seriesKeys.length - 1]}
          value={series}
          onChange={(e) => onChangeSeries(e.target.value)}>
          {seriesKeys.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SeriesForm;
