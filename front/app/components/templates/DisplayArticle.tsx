import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import typesData from "../../json/types.json";
import type { Article } from "../../pages/article";
import { changeIcon } from "../../utils/changeIcon";
import { getItemIcon } from "../../utils/getItemIcon";
import Party from "./Party";

type DisplayArticle = {
  articles: Article[];
};

const DisplayArticle = ({ articles }: DisplayArticle) => {
  const [modalOpen, setModalOpen] = useState<number>(0);
  const twitterLink = (id: string) => {
    let baseUrl = "https://twitter.com/";
    if (id === "") {
      return "https://twitter.com/home";
    }

    return baseUrl + id;
  };

  type UserLink = {
    twitter: string;
    tn: string;
  };

  const UserLink = ({ twitter, tn }: UserLink) => {
    if (twitter === "") {
      return <Typography>{tn}</Typography>;
    }

    return (
      <NextLink href={`/users/${twitter}`}>
        <a>
          <Typography>{tn}</Typography>
        </a>
      </NextLink>
    );
  };

  return (
    <>
      <Modal open={0 !== modalOpen} onClose={() => setModalOpen(0)}>
        <Box>
          <Party id={modalOpen} setModalOpen={setModalOpen} />
        </Box>
      </Modal>
      <Box sx={{ margin: 1 }}>
        {articles.map((article) => (
          <Box
            key={article.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottom: 1,
              width: "95%",
              maxWidth: 500,
              marginLeft: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Box sx={{ marginRight: 1 }}>
                <Typography>
                  {article.rank !== 99999 ? article.rank : "XX"}位
                </Typography>
              </Box>
              <Box sx={{ marginRight: 1 }}>
                <Typography>
                  {article.rate !== null ? article.rate : "XXXX"}pt
                </Typography>
              </Box>
              <Box>
                <UserLink twitter={article.twitter} tn={article.tn} />
              </Box>
              <MuiLink
                href={twitterLink(article.twitter)}
                target="_blank"
                rel="noopener noreferrer">
                <Box sx={{ paddingTop: 1 }}>
                  <Icon
                    sx={{
                      bgcolor: `${article.twitter !== "" ? "#1DA1F2" : "grey"}`,
                      borderRadius: 1,
                      marginX: 1,
                    }}>
                    <TwitterIcon sx={{ color: "white" }} />
                  </Icon>
                </Box>
              </MuiLink>
              <Box
                sx={{ paddingTop: 1 }}
                onClick={() => setModalOpen(article.id)}>
                <Image
                  src={`/image/ball/pokemonball.png`}
                  alt="party"
                  width={25}
                  height={25}></Image>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 1,
                paddingBottom: 2,
              }}>
              <MuiLink
                href={article.url}
                target="_blank"
                rel="noopener noreferrer">
                {article.title}
              </MuiLink>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {article.party.map((poke, index) => (
                <Box key={index} sx={{ position: "relative", width: 50 }}>
                  <Box sx={{ position: "relative", zindex: 0 }}>
                    <Image
                      src={`/image/${changeIcon(poke.pokemon)}`}
                      alt={poke.pokemon}
                      height={40}
                      width={40}></Image>
                  </Box>
                  <Box
                    sx={{ position: "absolute", zindex: 1, left: 25, top: 25 }}>
                    <Image
                      src={getItemIcon(poke.item)}
                      alt={poke.item}
                      height={20}
                      width={20}></Image>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      zindex: 1,
                      left: -10,
                      top: -15,
                    }}>
                    <Image
                      src={`/image/teraIcon/${typesData[poke.terastal]}.png`}
                      alt={typesData[poke.terastal]}
                      height={20}
                      width={20}></Image>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ paddingX: 1, width: "40%" }}>
                Season:{article.season}
              </Typography>
              <Typography sx={{ width: "60%" }}>
                RentalCode:{" "}
                <span style={{ color: "green" }}>{article.rental}</span>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default DisplayArticle;
