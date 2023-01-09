import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import pokeData from "../../json/poke_data.json";
import typesData from "../../json/types.json";
import { changeIcon } from "../../utils/changeIcon";
import { getItemIcon } from "../../utils/getItemIcon";
import { getNatureToNumber } from "../../utils/nature";
import ShowMove from "../atoms/ShowMove";
import ShowHPStats from "../molecules/ShowHPStats";
import ShowStats from "../molecules/ShowStats";

type Pokemon = {
  pokemon: string;
  item: string;
  ability: string;
  nature: string;
  terastal: string;
  moves: string[];
  effortValues: number[];
  individualValues: number[];
  baseStats?: number[];
};

type Party = {
  party: Pokemon;
};

const PartyInfo = ({ party }: Party) => {
  const baseStats: number[] = party.baseStats
    ? party.baseStats
    : pokeData[party.pokemon].baseStats;
  const natureToNumber: number[] = getNatureToNumber(party.nature);
  return (
    <Box sx={{ height: "100%", border: 1 }}>
      <Box sx={{ height: "60%", width: "100%", display: "flex" }}>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            border: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <ShowHPStats
            baseStats={baseStats[0]}
            effortValue={party.effortValues[0]}
            individualValue={party.individualValues[0]}
          />
          {["A", "B", "C", "D", "S"].map((value, index) => (
            <ShowStats
              key={value}
              value={value}
              baseStats={baseStats[index + 1]}
              effortValue={party.effortValues[index + 1]}
              individualValue={party.individualValues[index + 1]}
              buttonType={natureToNumber[index]}
            />
          ))}
        </Box>
        <Box sx={{ height: "100%", width: "50%", border: 1 }}>
          <Box
            sx={{
              border: 1,
              height: "18%",
              marginLeft: "4px",
              marginBottom: "2px",
              borderBottomLeftRadius: "5px",
              display: "flex",
            }}>
            <Box
              sx={{
                position: "relative",
                width: "20%",
                height: "100%",
                bgcolor: "#788788",
              }}>
              <Image
                src="/image/ball/pokemonball.png"
                alt=""
                layout="fill"
                objectFit="contain"></Image>
            </Box>
            <Box
              sx={{
                width: "80%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#888888",
              }}>
              <Typography
                sx={{
                  fontSize: "2vh",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color: "white",
                }}>
                {party.pokemon}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: "15%",
              display: "flex",
              justifyContent: "left",
              marginY: "4px",
              borderRadius: "5px",
              alignItems: "center",
              border: 1,
              width: "80%",
            }}>
            <Box
              sx={{
                width: "30%",
                position: "relative",
                height: "100%",
                borderRight: 1,
                bgcolor: "#788898",
              }}>
              <Image
                src={`/image/teraIcon/${typesData[party.terastal]}.png`}
                layout="fill"
                alt={party.terastal}
                objectFit="contain"></Image>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "2vh",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}>
                {party.terastal}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: "28%", position: "relative", margin: "2px" }}>
            <Image
              src={`/image/${changeIcon(party.pokemon)}`}
              layout="fill"
              alt={party.pokemon}
              objectFit="contain"></Image>
          </Box>
          <Box sx={{ height: "18%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
              }}>
              <Typography
                sx={{
                  fontSize: "1.5vh",
                  marginLeft: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color: "black",
                  border: 1,
                  borderLeft: 5,
                  width: "fit-content",
                }}>
                {party.ability}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "18%",
            }}>
            <Box
              sx={{
                width: "20%",
                position: "relative",
                border: 1,
                borderBottom: 0,
                bgcolor: "#888888",
              }}>
              <Image
                src={`${getItemIcon(party.item)}`}
                layout="fill"
                alt={party.item}
                objectFit="contain"></Image>
            </Box>
            <Box sx={{ width: "80%", borderTop: 1 }}>
              <Typography
                sx={{
                  fontSize: "1.5vh",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}>
                {party.item !== "" ? party.item : "なし"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "40%", border: 1 }}>
        <Box sx={{ height: "50%", display: "flex" }}>
          <ShowMove move={party.moves[0]} />
          <ShowMove move={party.moves[1]} />
        </Box>
        <Box sx={{ height: "50%", display: "flex" }}>
          <ShowMove move={party.moves[2]} />
          <ShowMove move={party.moves[3]} />
        </Box>
      </Box>
    </Box>
  );
};

export default PartyInfo;
