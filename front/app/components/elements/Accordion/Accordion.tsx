import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getData } from "../../../lib/api/fetchApi";
import {
  ChangeSettingContext,
  PokemonRanksContext,
} from "../../../pages/article";
import { changeIcon } from "../../../utils/changeIcon";
import PoketetsuLink from "../Link/PoketetsuLink";
import PokeDetailTab from "../Tab/PokeDetailTab";

type Search = {
  articleIds: number[];
  counts: number;
};

type Pokemon = {
  pokemon: string;
  count: number;
};

// TODO: 順位がない時のランキング、検索時には順番通りに

const ControlledAccordions = ({ articleIds, counts }: Search) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { pokemonRanks, setPokemonRanks } = useContext(PokemonRanksContext);
  const { changeSetting, setChangeSetting } = useContext(ChangeSettingContext);
  const [filterPokemons, setFilterPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState<number>(10);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const changeTopHeight = (pokemon: string) => {
    if (pokemon === expanded) {
      return 50;
    }

    return 35;
  };

  useEffect(() => {
    if (changeSetting) {
      const fetchData = async () => {
        const params = {
          ids: articleIds,
        };

        const data = await getData("/articles/rank", params);
        setFilterPokemons(data.slice(0, 10));
        setPokemonRanks(data);
      };
      fetchData();
      setChangeSetting(false);
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

  const getPercentage = (count: number, sum: number) => {
    return (Math.floor((count / sum) * 1000) / 10).toFixed(1) + "%";
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}>
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
                      src={`/image/${changeIcon(filterPokemon.pokemon)}`}
                    />
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                      {filterPokemon.pokemon}
                    </Typography>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: changeTopHeight(filterPokemon.pokemon),
                        left: 75,
                        color: "grey",
                      }}>
                      {getPercentage(filterPokemon.count, counts)}(
                      {filterPokemon.count}/{counts})
                    </Typography>
                  </Box>
                  <PoketetsuLink pokemon={filterPokemon.pokemon} />
                </AccordionSummary>

                <AccordionDetails>
                  <PokeDetailTab
                    pokemon={filterPokemon.pokemon}
                    articleIds={articleIds}
                    count={filterPokemon.count}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: "center" }}>
        {pokemonRanks.length !== filterPokemons.length && (
          <Button onClick={loadArticle}>もっと見る</Button>
        )}
      </Box>
    </Box>
  );
};

export default ControlledAccordions;
