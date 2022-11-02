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

type Pokemon = {
  rank: number;
  pokemon: string;
  items: { name: string; count: number }[];
  moves: { name: string; count: number }[];
};

const ControlledAccordions = ({ rank, pokemon, items, moves }: Pokemon) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ marginLeft: "auto", maxWidth: { xs: 350, sm: 480 } }}>
      <Accordion
        expanded={expanded === pokemon}
        onChange={handleChange(pokemon)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h6" sx={{ width: "10%" }}>
            {rank}.
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "left", width: "70%", flexShrink: 0 }}
          >
            {pokemon}
          </Typography>
          <PoketetsuLink pokemon={pokemon} />
        </AccordionSummary>
        <AccordionDetails>
          <PokeDetailTab pokemon={pokemon} items={items} moves={moves} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ControlledAccordions;
