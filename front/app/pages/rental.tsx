import { rentalSeason3 } from "../json/rental/season3";
import typesData from "../json/types.json";
import { changeIcon } from "../utils/changeIcon";
import { getItemIcon } from "../utils/getItemIcon";
import Image from "next/image";
import { NextSeo } from "next-seo";

import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";

import Typography from "@mui/material/Typography";

const Rental = () => {
  const twitterLink = (id: string) => {
    let baseUrl = "https://twitter.com/";
    if (id === "") {
      return "https://twitter.com/home";
    }

    return baseUrl + id;
  };

  return (
    <>
      <NextSeo
        title="Poke Ranker | ポケモンSV シリーズ3レンタル構築まとめ"
        description="ポケモンの構築記事が読みたい方はこちら。"
      />
      <h1 style={{ textAlign: "center" }}>
        ポケモンSV シーズン3 レンタル構築まとめ
      </h1>
      {rentalSeason3.map((rental) => (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          key={rental.rentalCode}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottom: 1,
              width: "95%",
              maxWidth: 400,
              marginLeft: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2,
              }}>
              <Box>
                <Typography>
                  TN:{" "}
                  <span style={{ color: "gray", fontWeight: "bold" }}>
                    {rental.tn}
                  </span>
                </Typography>
              </Box>
              <MuiLink
                href={twitterLink(rental.twitter)}
                target="_blank"
                rel="noopener noreferrer">
                <Box sx={{ paddingTop: 1 }}>
                  <Icon
                    sx={{
                      bgcolor: `${rental.twitter !== "" ? "#1DA1F2" : "grey"}`,
                      borderRadius: 1,
                      marginX: 1,
                    }}>
                    <TwitterIcon sx={{ color: "white" }} />
                  </Icon>
                </Box>
              </MuiLink>
              <Box>
                <Typography>
                  rental:{" "}
                  <span style={{ color: "green" }}>{rental.rentalCode}</span>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {rental.party.map((poke, index) => (
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
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Rental;
