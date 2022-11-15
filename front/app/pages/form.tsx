import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { createContext, useState } from "react";
import { postData } from "../lib/api/client";
import seriesData from "../json/series.json";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import RegisterPokemon from "../components/templates/RegisterPokemon";
import Image from "next/image";
import { changeIcon } from "../utils/changeIcon";

type PokeDetails = {
  pokemon: string;
  item: string;
  ability: string;
  moves: string[];
  baseStats: number[];
  nature: string;
  terastal: string;
};

type PokeDetailsContext = {
  pokeDetails: PokeDetails[];
  setPokeDetails: React.Dispatch<React.SetStateAction<PokeDetails[]>>;
};

export const PokeDetailsContext = createContext({} as PokeDetailsContext);

const Form: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [series, setSeries] = useState<string>(
    Object.keys(seriesData)[Object.keys(seriesData).length - 1]
  );
  const [season, setSeason] = useState<string>(seriesData[series][0]);
  const [rank, setRank] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentPoke, setCurrentPoke] = useState<number>(0);

  const initPokemon: PokeDetails = {
    pokemon: "",
    item: "",
    moves: new Array(4),
    baseStats: [0, 0, 0, 0, 0, 0, 0],
    ability: "",
    nature: "",
    terastal: "",
  };
  const [pokeDetails, setPokeDetails] = useState<PokeDetails[]>(
    new Array(6).fill(initPokemon)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData("/articles/create", {
      name: name,
      twitter: twitter,
      title: title,
      url: url,
      rate: rate,
      rank: rank,
      season: season,
      series: series,
    });
    const data = await res;
    if (data.status !== 200) {
      console.log(data.message);
    } else {
      console.log("成功しました。");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeSeries = (value: string) => {
    setSeries(value);
    setSeason(seriesData[value][0]);
  };
  return (
    <>
      <Box
        sx={{
          minWidth: 240,
          maxWidth: 500,
          width: "95%",
          border: 1,
          height: 340,
          margin: "0 auto",
          marginTop: "20px",
        }}>
        <Box
          sx={{
            width: "90%",
            border: 1,
            height: "80%",
            margin: 3,
            marginBottom: 0,
          }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", paddingTop: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                margin: 1,
              }}>
              <Typography> TN:</Typography>

              <TextField
                placeholder="スカーレット"
                label="TN"
                fullWidth
                size="small"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                margin: 1,
              }}>
              <Typography> Twitter:@</Typography>

              <TextField
                placeholder="twitter_id"
                fullWidth
                label="Twitter"
                size="small"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: 1,
            }}>
            <Typography sx={{ fontSize: "16px" }}>Title:</Typography>
            <TextField
              placeholder="タイトル"
              label="Title"
              size="small"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: 1,
            }}>
            <Typography sx={{ fontSize: "16px" }}>URL:</Typography>
            <TextField
              placeholder="https://hatenablog.com/"
              label="URL"
              size="small"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 40,
              margin: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: 1,
                paddingRight: 2,
              }}>
              <Typography sx={{ fontSize: "16px" }}>Series:</Typography>
              <FormControl size="small">
                <InputLabel variant="standard" htmlFor="Series">
                  Series
                </InputLabel>
                <Select
                  defaultValue={
                    Object.keys(seriesData)[Object.keys(seriesData).length - 1]
                  }
                  value={series}
                  onChange={(e) => onChangeSeries(e.target.value)}>
                  {Object.keys(seriesData).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: 1,
              }}>
              <Typography sx={{ fontSize: "16px" }}>Season:</Typography>
              <FormControl size="small">
                <InputLabel variant="standard" htmlFor="Season">
                  Season
                </InputLabel>
                <Select
                  defaultValue={seriesData[series][0]}
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}>
                  {seriesData[series].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 40,
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: 1,
              }}>
              <Typography sx={{ fontSize: "16px" }}>Rate:</Typography>
              <TextField
                placeholder="2000"
                label="Rate"
                size="small"
                type="tel"
                sx={{ width: 80 }}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: 1,
              }}>
              <Typography sx={{ fontSize: "16px" }}>Rank:</Typography>
              <TextField
                placeholder="1"
                label="Rank"
                size="small"
                type="tel"
                sx={{ width: 60 }}
                value={rank}
                onChange={(e) => setRank(Number(e.target.value))}
              />
              <Typography sx={{ fontSize: "16px", margin: 1 }}>位</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "60%",
              display: "flex",
              alignItems: "center",
              marginLeft: 3,
            }}>
            {pokeDetails.map((pokeDetail, index) => (
              <Image
                key={index}
                src={`/image/${changeIcon(pokeDetail.pokemon)}`}
                height={25}
                width={25}
              />
            ))}
          </Box>
          <Button onClick={() => setOpen(true)} sx={{ width: "40%" }}>
            ポケモン登録
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <PokeDetailsContext.Provider value={{ pokeDetails, setPokeDetails }}>
          <RegisterPokemon
            onClose={handleClose}
            currentPoke={currentPoke}
            setCurrentPoke={setCurrentPoke}
          />
        </PokeDetailsContext.Provider>
      </Dialog>
    </>
  );
};

export default Form;
