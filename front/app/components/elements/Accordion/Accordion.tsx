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
import { changeIcon } from "../../../utils/changeIcon";
import { Ranking } from "../../../utils/getPokemonRank";
import PoketetsuLink from "../Link/PoketetsuLink";
import PokeDetailTab from "../Tab/PokeDetailTab";

type Props = {
  ranking: Ranking;
};

// TODO: 順位がない時のランキング、検索時には順番通りに

const ControlledAccordions = ({ ranking }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const pokemonKeys = Object.keys(ranking);
  const [filterRankings, setFilterRankings] = useState<string[]>(
    pokemonKeys.slice(0, 10)
  );
  const [count, setCount] = useState<number>(10);

  const [sumOfPokemons, setSumOfPokemons] = useState<number>(1);

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
    let sum = 0;
    for (let pokemon of pokemonKeys) {
      sum += ranking[pokemon].count;
    }

    setSumOfPokemons(sum / 6);
  }, [ranking]);

  const loadArticle = async () => {
    setFilterRankings((prevRanking) => [
      ...prevRanking,
      ...pokemonKeys.slice(count, count + 10),
    ]);
    setCount((prevCount) => prevCount + 10);
  };

  const getPercentage = (count: number, sum: number) => {
    return (Math.floor((count / sum) * 1000) / 10).toFixed(1) + "%";
  };

  return (
    <Box sx={{ width: 300, padding: 0 }}>
      <List>
        {filterRankings.map((pokemon: string, index) => (
          <ListItem disablePadding={true} key={pokemon}>
            <Box sx={{ width: "100%" }}>
              <Accordion
                expanded={expanded === pokemon}
                onChange={handleChange(pokemon)}
                TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={pokemon}
                  id={pokemon}
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
                      alt={pokemon}
                      src={`/image/${changeIcon(pokemon)}`}
                    />
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                      {pokemon}
                    </Typography>
                    <Typography
                      sx={{
                        position: "absolute",
                        top: changeTopHeight(pokemon),
                        left: 75,
                        color: "grey",
                      }}>
                      {getPercentage(ranking[pokemon].count, sumOfPokemons)}(
                      {ranking[pokemon].count}/{sumOfPokemons})
                    </Typography>
                  </Box>
                  <PoketetsuLink pokemon={pokemon} />
                </AccordionSummary>

                <AccordionDetails>
                  <PokeDetailTab
                    count={ranking[pokemon].count}
                    terastal={ranking[pokemon].terastal}
                    item={ranking[pokemon].item}
                    ability={ranking[pokemon].ability}
                    move={ranking[pokemon].move}
                    nature={ranking[pokemon].nature}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
        {pokemonKeys.length !== filterRankings.length && (
          <Button onClick={loadArticle}>もっと見る</Button>
        )}
      </Box>
    </Box>
  );
};

export default ControlledAccordions;
