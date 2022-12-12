import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
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
import { textToNumber } from "../utils/textToNumber";
import { checkPokemons } from "../utils/validation";
import { PokeDetails } from "../types/PokeDetails";

type PokeDetailsContext = {
  pokeDetails: PokeDetails[];
  setPokeDetails: React.Dispatch<React.SetStateAction<PokeDetails[]>>;
};

export const PokeDetailsContext = createContext({} as PokeDetailsContext);

export const initPokemon: PokeDetails = {
  pokemon: "",
  item: "",
  moves: ["", "", "", ""],
  baseStats: [0, 0, 0, 0, 0, 0, 0],
  effortValues: [0, 0, 0, 0, 0, 0, 0],
  ability: "",
  nature: "",
  terastal: "",
};

const Form: NextPage = () => {
  const [format, setFormat] = useState<string>("Single");
  const [rentalCode, setRentalCode] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [existUrlList, setExistUrlList] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [series, setSeries] = useState<string>(
    Object.keys(seriesData)[Object.keys(seriesData).length - 1]
  );
  const [season, setSeason] = useState<string>(seriesData[series][0]);
  const [rank, setRank] = useState<number | string>("");
  const [rate, setRate] = useState<number | string>("");
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentPoke, setCurrentPoke] = useState<number>(0);
  const [pokemonErrors, setPokemonErrors] = useState<string[]>([]);
  const [urlError, setUrlError] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [pokeDetails, setPokeDetails] = useState<PokeDetails[]>(
    new Array(6).fill(initPokemon)
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/get_urls");
      const data = await res.json();
      setExistUrlList(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!open) {
      validationForm();
    }
  }, [open]);

  const onClickCloseButton = (copyOfPokeDetails: PokeDetails[]) => {
    setOpen(false);
    const checkPokemonError = checkPokemons(copyOfPokeDetails);
    if (checkPokemonError.length !== 0) {
      setPokemonErrors(checkPokemonError);
      setDisabledButton(true);
      return;
    }

    setPokemonErrors([]);
  };

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

  const checkUrlError = (value: string) => {
    for (let existUrl of existUrlList) {
      if (value === existUrl) {
        setUrlError("そのURLはすでに存在しています。");
        return;
      }
    }

    setUrlError("");
  };

  const validateRentalCode = () => {
    if (rentalCode.length !== 6 || !rentalCode.match(/^[a-zA-Z0-9]+$/)) {
      setRentalCode("");
      return;
    }

    setRentalCode(rentalCode.toUpperCase());
  };

  const validationForm = () => {
    if (name === "" || title === "" || url === "" || urlError !== "") {
      setDisabledButton(true);
      return;
    }

    const pokemons = pokeDetails.filter(
      (pokeDetail) => pokeDetail.pokemon !== "" && pokeDetail.moves[0] !== ""
    );

    if (pokemons.length < 6) {
      setDisabledButton(true);
      return;
    }

    if (pokemonErrors.length === 0) {
      setDisabledButton(false);
    }
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
          height: 400,
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
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                margin: 1,
              }}>
              <Typography>Format:</Typography>

              <TextField
                select
                label="Format"
                fullWidth
                size="small"
                autoComplete="off"
                value={format}
                onChange={(e) => setFormat(e.target.value)}>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
              </TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                margin: 1,
              }}>
              <Typography>Rental:</Typography>

              <TextField
                placeholder="A1B6CC"
                fullWidth
                label="Rental"
                size="small"
                autoComplete="off"
                value={rentalCode}
                onBlur={validateRentalCode}
                onChange={(e) => setRentalCode(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", margin: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                margin: 0,
                marginX: 1,
              }}>
              <Typography>TN*:</Typography>

              <TextField
                placeholder="スカーレット"
                label="TN*"
                fullWidth
                size="small"
                autoComplete="off"
                value={name}
                onBlur={validationForm}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                margin: 0,
                marginX: 1,
              }}>
              <Typography> Twitter:@</Typography>

              <TextField
                placeholder="twitter_id"
                fullWidth
                label="Twitter"
                size="small"
                autoComplete="off"
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
            <Typography sx={{ fontSize: "16px" }}>Title*:</Typography>
            <TextField
              placeholder="【SV S1】対面ガッサミミドラパ 【最終レート2000 最終1位】"
              label="Title*"
              size="small"
              fullWidth
              autoComplete="off"
              value={title}
              onBlur={validationForm}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
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
              <Typography sx={{ fontSize: "16px" }}>Series*:</Typography>
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
              <Typography sx={{ fontSize: "16px" }}>Season*:</Typography>
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
                autoComplete="off"
                inputMode="numeric"
                sx={{ width: 80 }}
                value={rate}
                onChange={(e) =>
                  textToNumber(e.target.value, "", setRate, 1, 3000)
                }
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
                autoComplete="off"
                inputMode="numeric"
                onChange={(e) =>
                  textToNumber(e.target.value, "", setRank, 1, 100000)
                }
              />
              <Typography sx={{ fontSize: "16px", margin: 1 }}>位</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", margin: 1 }}>
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
                height={40}
                width={40}
              />
            ))}
          </Box>
          <Button onClick={() => setOpen(true)} sx={{ width: "40%" }}>
            ポケモン登録
          </Button>
        </Box>
      </Box>
      <Typography sx={{ textAlign: "center", color: "red" }}>
        *は必須項目です。
      </Typography>
      {pokemonErrors.map((pokemonError) => (
        <Typography
          sx={{ textAlign: "center", color: "red" }}
          key={pokemonError}>
          {pokemonError}
        </Typography>
      ))}
      <Box sx={{ textAlign: "center", margin: 1 }}>
        <Button
          variant="contained"
          size="large"
          disabled={disabledButton}
          onClick={validationForm}
          sx={{ width: "100%", maxWidth: 500 }}>
          この内容で登録する
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <PokeDetailsContext.Provider value={{ pokeDetails, setPokeDetails }}>
          <RegisterPokemon
            onClose={onClickCloseButton}
            currentPoke={currentPoke}
            setCurrentPoke={setCurrentPoke}
          />
        </PokeDetailsContext.Provider>
      </Dialog>
    </>
  );
};

export default Form;
