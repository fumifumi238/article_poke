import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PoketetsuLink from "../Link/PoketetsuLink";
import Box from "@mui/material/Box";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PokeDetailTab from "../Tab/PokeDetailTab";
import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import pokeData from "../../../json/poke_data.json";
import {
  ClickSearchContext,
  PokemonRanksContext,
} from "../../../pages/article";

type Search = {
  ranks: [number, number];
  seasons: number[];
};

type Pokemon = {
  pokemon: string;
  count: number;
};

// const ControlledAccordions = React.memo(({ ranks, seasons }: Search) => {
//   return <ControlledAccordions1 ranks={ranks} seasons={seasons} />;
// });

const ControlledAccordions = ({ ranks, seasons }: Search) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
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

  React.useEffect(() => {
    if (clickSearch) {
      const fetchData = async () => {
        const res = await fetch("http://localhost:3000/articles/rank");
        const data = await res.json();
        const dataWithId = data.map((d, index) => {
          d["id"] = index + 1;
          return d;
        });
        setFilterPokemons(dataWithId.slice(0, 10));
        setPokemonRanks(dataWithId);
        console.log(dataWithId);
      };
      fetchData();
      setLoading(false);
      setClickSearch(false);
    } else {
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
    <>
      <List sx={{ width: 320, padding: 0 }}>
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
                  <Typography variant="h6" sx={{ width: "50%" }}>
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
    </>
  );
};

export default ControlledAccordions;
