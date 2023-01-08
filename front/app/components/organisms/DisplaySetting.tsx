import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import seriesData from "../../json/series.json";
import { textToNumber } from "../../utils/textToNumber";
import AlertSuccess from "../atoms/AlertSuccess";

type DisplaySetting = {
  series: string;
  ranks: number[];
  seasons: string[];
  format: string;
  version: string;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

const DisplaySetting = ({
  series,
  ranks,
  seasons,
  format,
  version,
  success,
  setSuccess,
}: DisplaySetting) => {
  const router = useRouter();
  const [seriesSetting, setSeriesSetting] = useState<string>(series);

  const [seasonsSetting, setSeasonsSetting] = useState<string[]>(seasons);
  const [ranksSetting, setRanksSetting] = useState<(number | string)[]>(ranks);
  const [formatSetting, setFormatSetting] = useState<string>(format);
  const [versionSetting, setVersionSetting] = useState<string>(version);

  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const [checkList, setCheckList] = useState<boolean[]>(
    new Array(seriesData[series].length).fill(true)
  );

  useEffect(() => {
    if (ranksSetting[0] === "" || ranksSetting[1] === "") {
      setDisabledButton(true);
      return;
    }

    const isEqualSeason = () => {
      const hash = {};

      if (seasons.length !== seasonsSetting.length) {
        return false;
      }

      for (let i = 0; i < seasons.length; i++) {
        if (hash[seasons[i]] === undefined) {
          hash[seasons[i]] = 1;
        } else {
          hash[seasons[i]] += 1;
        }

        if (hash[seasonsSetting[i]] === undefined) {
          hash[seasonsSetting[i]] = 1;
        } else {
          hash[seasonsSetting[i]] += 1;
        }
      }

      const result = Object.values(hash).every((value) => value === 2);
      return result;
    };

    if (
      format === formatSetting &&
      ranks === ranksSetting &&
      version === versionSetting &&
      isEqualSeason() &&
      ranksSetting[0] === ranks[0] &&
      ranksSetting[1] === ranks[1]
    ) {
      setDisabledButton(true);
      return;
    }

    if (
      ranksSetting[0] < 1 ||
      ranksSetting[1] > 99999 ||
      ranksSetting[0] > ranksSetting[1]
    ) {
      setDisabledButton(true);
      return;
    }

    if (seasonsSetting.length === 0) {
      setDisabledButton(true);
      return;
    }

    setDisabledButton(false);
  }, [seasonsSetting, ranksSetting, formatSetting, versionSetting]);

  const onClickSetting = () => {
    setSuccess(true);
    let baseUrl = "/article?";

    const addBaseUrl = (params: string, value: string | number) => {
      baseUrl += `${params}=${value}&`;
    };

    addBaseUrl("format", formatSetting);
    addBaseUrl("ranks", ranksSetting[0]);
    addBaseUrl("ranks", ranksSetting[1]);
    addBaseUrl("version", versionSetting);

    addBaseUrl("series", seriesSetting);
    seasonsSetting.forEach((value) => {
      addBaseUrl("seasons", value);
    });

    router.push(baseUrl);
  };

  const onChangeSeries = (value: string) => {
    setSeriesSetting(value);
    setSeasonsSetting(seriesData[value]);
    setCheckList(new Array(seriesData[value].length).fill(true));
  };

  const onChangeSeasons = (value: string, checked: boolean, index: number) => {
    const copyOfCheckList = [...checkList];
    copyOfCheckList[index] = !checked;
    setCheckList(copyOfCheckList);

    if (!checked) {
      setSeasonsSetting((season) => [...season, value]);
      return;
    }
    const selectSeasons: string[] = seasonsSetting.filter(
      (season: string) => season !== value
    );

    setSeasonsSetting(selectSeasons);
  };

  const onChangeMin = (value: string) => {
    const setMin = (num: number | string) => {
      const copyOfRanksSetting = [...ranksSetting];
      copyOfRanksSetting[0] = num;
      setRanksSetting(copyOfRanksSetting);
    };
    textToNumber(value, "", setMin, 1, 99999);
  };

  const onChangeMax = (value: string) => {
    const setMax = (num: number | string) => {
      const copyOfRanksSetting = [...ranksSetting];
      copyOfRanksSetting[1] = num;
      setRanksSetting(copyOfRanksSetting);
    };
    textToNumber(value, "", setMax, 1, 99999);
  };

  const Message = <strong>反映中です。しばらくお待ちください。</strong>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {success && <AlertSuccess modalOpen={success} message={Message} />}

      <Box
        sx={{
          border: 1,
          width: "95%",
          maxWidth: 400,
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingY: 1,
        }}>
        <Box>
          <FormControl sx={{ margin: 1 }}>
            <InputLabel id="demo-simple-select-label">Series</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={seriesSetting}
              label="Series"
              onChange={(e) => onChangeSeries(e.target.value)}>
              {Object.keys(seriesData).map((value) => (
                <MenuItem value={value} key={value}>
                  Series {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ margin: 1 }}>
            <InputLabel id="demo-simple-select-label">Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formatSetting}
              label="Format"
              onChange={(e) => setFormatSetting(e.target.value)}>
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="double">Double</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormGroup
              row={true}
              sx={{ display: "flex", justifyContent: "center" }}>
              {seriesData[seriesSetting].map((value: string, index: number) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={checkList[index]}
                      onChange={() =>
                        onChangeSeasons(value, checkList[index], index)
                      }
                    />
                  }
                  label={`Season ${value}`}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center" }}>Ranking</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box sx={{ display: "flex", alignItems: "center", margin: 1 }}>
              <TextField
                id="outlined-basic"
                label="min"
                variant="outlined"
                value={ranksSetting[0]}
                sx={{ margin: 1 }}
                onChange={(e) => onChangeMin(e.target.value)}
                autoComplete="off"
              />
              <Typography>位</Typography>
            </Box>
            <Typography sx={{ margin: 1, fontWeight: "bold" }}>～</Typography>
            <Box sx={{ display: "flex", alignItems: "center", margin: 1 }}>
              <TextField
                id="outlined-basic"
                label="max"
                variant="outlined"
                value={ranksSetting[1]}
                sx={{ margin: 1 }}
                onChange={(e) => onChangeMax(e.target.value)}
                autoComplete="off"
              />
              <Typography>位</Typography>
            </Box>
          </Box>
        </Box>
        <Button onClick={onClickSetting} disabled={disabledButton}>
          設定
        </Button>
      </Box>
    </Box>
  );
};

export default DisplaySetting;
