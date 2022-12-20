import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import pokeData from "../../../json/poke_data.json";
import { getData } from "../../../lib/api/fetchApi";
import {
  ClickSearchContext,
  PokemonRanksContext,
} from "../../../pages/article";
import PoketetsuLink from "../Link/PoketetsuLink";
import PokeDetailTab from "../Tab/PokeDetailTab";

type Search = {
  ranks: [number, number];
  seasons: number[];
};

type Pokemon = {
  pokemon: string;
  count: number;
};

const ControlledAccordions = ({ ranks, seasons }: Search) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { pokemonRanks, setPokemonRanks } = useContext(PokemonRanksContext);
  const { clickSearch, setClickSearch } = useContext(ClickSearchContext);
  const [filterPokemons, setFilterPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(10);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (clickSearch) {
      const fetchData = async () => {
        const params = {
          seasons: seasons,
        };

        const data = await getData("/articles/rank", params);
        const dataWithId = data.map((d, index) => {
          d["id"] = index + 1;
          return d;
        });
        setFilterPokemons(dataWithId.slice(0, 10));
        setPokemonRanks(dataWithId);
        console.log("再描画");
      };
      fetchData();
      setLoading(false);
      setClickSearch(false);
    } else {
      console.log("再描画なし");
      setFilterPokemons(pokemonRanks.slice(0, 10));
    }
  }, []);

  const loadArticle = async () => {
    setFilterPokemons((prevData) => [
      ...prevData,
      ...pokemonRanks.slice(count, count + 10),
    ]),
      setCount((prevCount) => prevCount + 10);
  };

  return (
    <Box sx={{ width: 300, padding: 0 }}>
      <List>
        {filterPokemons.map((filterPokemon: Pokemon, index) => (
          <ListItem disablePadding={true} key={filterPokemon.pokemon}>
            <Box sx={{ width: "100%" }}>
              <Accordion
                expanded={expanded === filterPokemon.pokemon}
                onChange={handleChange(filterPokemon.pokemon)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={filterPokemon.pokemon}
                  id={filterPokemon.pokemon}
                  sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h6" sx={{ width: "10%" }}>
                    {index + 1}
                  </Typography>
                  <Box
                    sx={{
                      width: "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Image
                      height={25}
                      width={25}
                      src={`/image/icon/Pokémon-Icon_${pokeData[
                        filterPokemon.pokemon
                      ].no
                        .toString()
                        .padStart(3, "0")}.png`}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ width: "50%", zIndex: 0 }}>
                    {filterPokemon.pokemon}
                  </Typography>
                  <PoketetsuLink pokemon={filterPokemon.pokemon} />
                </AccordionSummary>

                <AccordionDetails>
                  <PokeDetailTab pokemon={filterPokemon.pokemon} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </ListItem>
        ))}
      </List>
      <button onClick={loadArticle}>// 読み込み //</button>
    </Box>
  );
};

export default ControlledAccordions;
