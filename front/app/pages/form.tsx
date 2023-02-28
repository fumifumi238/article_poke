import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import AlertSuccess from "../components/atoms/AlertSuccess";
import FormatForm from "../components/molecules/Form/FormatForm";
import NameForm from "../components/molecules/Form/NameForm";
import RankForm from "../components/molecules/Form/RankForm";
import RateForm from "../components/molecules/Form/RateForm";
import RentalForm from "../components/molecules/Form/RentalForm";
import TitleForm from "../components/molecules/Form/TitleForm";
import TwitterForm from "../components/molecules/Form/TwitterForm";
import UrlForm from "../components/molecules/Form/UrlForm";
import PartyInfo from "../components/organisms/PartyInfo";
import RegisterPokemon from "../components/templates/RegisterPokemon";
import pokeData from "../json/poke_data.json";
import seriesData from "../json/series.json";
import { postData } from "../lib/api/fetchApi";
import { Article, Party } from "../types/articleTypes";
import { PokeDetails } from "../types/PokeDetails";
import { changeIcon } from "../utils/changeIcon";
import { checkPokemons } from "../utils/validation";
import emailjs from "@emailjs/browser";

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
  const series: string =
    Object.keys(seriesData)[Object.keys(seriesData).length - 1];
  const season: string = seriesData[series][seriesData[series].length - 1];
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

  const [waitSendMail, setWaitSendMail] = useState<boolean>(false);

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
    setWaitSendMail(true);
    const party = [];
    for (let i = 0; i < pokeDetails.length; i++) {
      const hash = {
        id: i + 1,
        pokemon: pokeDetails[i].pokemon,
        item: pokeDetails[i].item,
        ability: pokeDetails[i].ability,
        nature: pokeDetails[i].nature,
        terastal: pokeDetails[i].terastal,
        moves: pokeDetails[i].moves.filter((move) => move !== ""),
        effortValues: pokeDetails[i].effortValues.slice(0, 6),
        individualValues: pokeDetails[i].individualValues,
      };
      party.push(hash);
    }

    const body = {
      tn: name,
      twitter: twitter,
      title: title,
      url: url,
      rate: rate,
      rank: rank !== "" ? rank : 99999,
      rental: rental,
      season: season,
      format: format,
      party: party,
    };

    const addText = () => {
      let text = "";
      text += "{";
      text += `
    tn: "${body.tn}",
    twitter: "${body.twitter}",
    url: "${body.url}",
    title: "${body.title}",
    rate: ${body.rate},
    rank: ${body.rank},
    season: ${body.season},
    rental: "${body.rental}",
    format: "${body.format}",
    `;

      text += "party: [\n";

      for (let i = 0; i < body.party.length; i++) {
        let moves = "";
        for (let j = 0; j < body.party[i].moves.length; j++) {
          if (j >= 3) {
            moves += `"${body.party[i].moves[j]}"`;
          } else {
            moves += `"${body.party[i].moves[j]}",`;
          }
        }
        text += `{
        id: ${i + 1},
        pokemon: "${body.party[i].pokemon}",
        item: "${body.party[i].item}",
        ability: "${body.party[i].ability}",
        nature: "${body.party[i].nature}",
        terastal: "${body.party[i].terastal}",
        moves: [${moves}],
        effortValues: [${body.party[i].effortValues}],
        individualValues: [${body.party[i].individualValues}],
      },\n`;
      }

      text += "]\n},";
      return text;
    };

    const mailText = addText();

    const templateVariables = {
      email: "tarou@example.com",
      name: "poke-ranker",
      message: mailText,
    };

    console.log(mailText);

    const data = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVISE_ID,
      process.env.NEXT_PUBLIC_TEMPLETE_ID,
      templateVariables,
      process.env.NEXT_PUBLIC_USER_ID
    );

    setWaitSendMail(false);

    if (data.status !== 200) {
      console.log(data.text);
    } else {
      console.log("成功しました。");
      setModalOpen(true),
        setTimeout(() => {
          router.push(`/${format}/series${series}/season${season}`);
        }, 200);
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
      <NextSeo
        title="Poke Ranker | ポケモンSV構築記事投稿フォーム"
        description="構築記事を投稿したい方はこちら"
      />
      <AlertSuccess modalOpen={modalOpen} message={Message} />
      <Box sx={{ margin: 1 }}>
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontSize: "16px", color: "grey" }}>
          Season{season} 構築記事投稿フォーム
        </Typography>
      </Box>
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
              height: 40,
              marginY: 1,
            }}>
            <RateForm rate={rate} setRate={setRate} />
            <RankForm rank={rank} setRank={setRank} />
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
                alt={pokeDetail.pokemon}
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
              <Button
                sx={{ margin: 1 }}
                onClick={submitArticle}
                disabled={waitSendMail}>
                はい
              </Button>
              <Button
                sx={{ margin: 1 }}
                onClick={() => setOpenConfirm(false)}
                disabled={waitSendMail}>
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
