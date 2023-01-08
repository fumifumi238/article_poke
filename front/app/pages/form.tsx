import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import AlertSuccess from "../components/atoms/AlertSuccess";
import FormatForm from "../components/molecules/Form/FormatForm";
import NameForm from "../components/molecules/Form/NameForm";
import RankForm from "../components/molecules/Form/RankForm";
import RateForm from "../components/molecules/Form/RateForm";
import RentalForm from "../components/molecules/Form/RentalForm";
import SeasonForm from "../components/molecules/Form/SeasonForm";
import SeriesForm from "../components/molecules/Form/SeriesForm";
import TitleForm from "../components/molecules/Form/TitleForm";
import TwitterForm from "../components/molecules/Form/TwitterForm";
import UrlForm from "../components/molecules/Form/UrlForm";
import PartyInfo from "../components/organisms/PartyInfo";
import RegisterPokemon from "../components/templates/RegisterPokemon";
import pokeData from "../json/poke_data.json";
import seriesData from "../json/series.json";
import { postData } from "../lib/api/fetchApi";
import { PokeDetails } from "../types/PokeDetails";
import { changeIcon } from "../utils/changeIcon";
import { checkPokemons } from "../utils/validation";

// TODO: 保存時のエラーとエラーメッセージ

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
  individualValues: [31, 31, 31, 31, 31, 31],
  ability: "",
  nature: "",
  terastal: "",
};

const Form: NextPage = () => {
  const router = useRouter();
  const [format, setFormat] = useState<string>("single");
  const [rental, setRental] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [series, setSeries] = useState<string>(
    Object.keys(seriesData)[Object.keys(seriesData).length - 1]
  );

  const [season, setSeason] = useState<string>(
    seriesData[series][seriesData[series].length - 1]
  );
  const [rank, setRank] = useState<number | string>("");
  const [rate, setRate] = useState<number | string>("");
  const [title, setTitle] = useState<string>("");

  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [currentPoke, setCurrentPoke] = useState<number>(0);
  const [pokemonErrors, setPokemonErrors] = useState<string[]>([]);

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [pokeDetails, setPokeDetails] = useState<PokeDetails[]>(
    new Array(6).fill(initPokemon)
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (!openRegister) {
      validationForm();
    }
  }, [openRegister]);

  const onClickCloseButton = (copyOfPokeDetails: PokeDetails[]) => {
    setOpenRegister(false);
    const checkPokemonError = checkPokemons(copyOfPokeDetails);
    if (checkPokemonError.length !== 0) {
      setPokemonErrors(checkPokemonError);
      setDisabledButton(true);
      return;
    }

    setPokemonErrors([]);
  };

  const openConfirmButton = () => {
    const copyOfPokeDetails = [...pokeDetails];
    for (let pokeDetail of copyOfPokeDetails) {
      if (pokeDetail.terastal === "") {
        pokeDetail.terastal = pokeData[pokeDetail.pokemon].types[0];
      }
    }
    setPokeDetails(copyOfPokeDetails);
    setOpenConfirm(true);
  };

  const handleSubmit = async () => {
    const params = {
      name: name,
      twitter: twitter,
      title: title,
      url: url,
      rate: rate,
      rank: rank !== "" ? rank : 99999,
      rental: rental,
      season: season,
      series: series,
      format: format,
      parties: pokeDetails,
    };

    const res = await postData("/articles/create", params);
    const data = await res;
    if (data.status !== 200) {
      console.log(data.message);
    } else {
      console.log("成功しました。");
      setModalOpen(true),
        setTimeout(() => {
          router.push("/article");
        }, 500);
    }
  };

  const validationForm = () => {
    if (name === "" || title === "" || url === "" || urlError) {
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

  const submitArticle = () => {
    validationForm();
    if (!disabledButton) {
      handleSubmit();
    }
  };

  const Message = (
    <strong>
      記事が投稿されました。 <br />
      承認までしばらくお待ちください。
    </strong>
  );

  return (
    <>
      <AlertSuccess modalOpen={modalOpen} message={Message} />

      <Box
        sx={{
          minWidth: 240,
          maxWidth: 500,
          width: "95%",
          border: 1,
          margin: "0 auto",
          marginTop: 1,
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
              paddingTop: 1,
              flexWrap: "wrap",
            }}>
            <FormatForm format={format} setFormat={setFormat} />
            <RentalForm rental={rental} setRental={setRental} />
          </Box>
          <Box
            sx={{
              display: "flex",
              margin: 0,
              flexWrap: "wrap",
            }}>
            <NameForm
              tn={name}
              setName={setName}
              validationForm={validationForm}
            />
            <TwitterForm twitter={twitter} setTwitter={setTwitter} />
          </Box>
          <TitleForm
            title={title}
            setTitle={setTitle}
            validationForm={validationForm}
          />
          <UrlForm
            url={url}
            setUrl={setUrl}
            validationForm={validationForm}
            setError={setUrlError}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 40,
              margin: 1,
            }}>
            <SeriesForm
              series={series}
              setSeries={setSeries}
              setSeason={setSeason}
            />
            <SeasonForm series={series} season={season} setSeason={setSeason} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 40,
              marginBottom: 1,
            }}>
            <RateForm rate={rate} setRate={setRate} />
            <RankForm rank={rank} setRank={setRank} />
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
          <Button onClick={() => setOpenRegister(true)} sx={{ width: "40%" }}>
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
          onClick={openConfirmButton}
          sx={{ width: "100%", maxWidth: 500 }}>
          この内容で登録する
        </Button>
      </Box>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        fullScreen
        maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              width: "100%",
              maxWidth: 600,
              flexWrap: "wrap",
              height: "90vh",
              maxHeight: 600,
              overflow: "scroll",
            }}>
            {pokeDetails.map((party, index) => (
              <Box sx={{ width: "50%" }} key={index}>
                <PartyInfo party={party} />
              </Box>
            ))}
          </Box>
          <Box>
            <Typography sx={{ color: "green" }}>
              この内容でよろしいですか？
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button sx={{ margin: 1 }} onClick={submitArticle}>
                はい
              </Button>
              <Button sx={{ margin: 1 }} onClick={() => setOpenConfirm(false)}>
                いいえ
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        fullScreen>
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
