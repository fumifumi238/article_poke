import { useRef, useState } from "react";
import ItemForm from "../components/organisms/ItemForm";
import PokemonNameForm from "../components/organisms/PokemonNameForm";
import poke_data from "../json/poke_data.json";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleIcon from "@mui/icons-material/Article";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import seriesData from "../json/series.json";
import { searchPokeItem } from "../utils/searchPokeItem";

const Stats = () => {
  type Result = {
    [item: string]: {
      nature: string;
      url: string;
      effortValue: string;
    }[];
  };
  const pokemonNameStyle = {
    input: {
      color: "black",
      paddingLeft: "5px",
      fontSize: "16px",
    },
  };

  const itemStyle = {
    input: {
      color: "black",
      paddingLeft: "5px",
      fontSize: "16px",
    },
  };

  type Format = "single" | "double";

  type SearchParams = {
    pokemon: string;
    series: string;
    format: Format;
    item?: string;
    nature?: string;
    ability?: string;
    terastal?: string;
  };

  const itemRef = useRef<HTMLInputElement>(null);
  const pokemonRef = useRef<HTMLInputElement>(null);
  const [currentPokemon, setCurrentPokemon] = useState<string>();
  const [results, setResults] = useState<Result>({});
  const [nodata, setNodata] = useState<boolean>(false);

  const [format, setFormat] = useState<Format>("single");
  const [series, setSeries] = useState<string>(
    Object.keys(seriesData)[Object.keys(seriesData).length - 1]
  );

  const [searchParams, setSearchParams] = useState<SearchParams>({
    pokemon: "",
    series: series,
    format: "single",
  });

  const addOptionAbility = (pokemon: string) => {
    if (poke_data[pokemon] === undefined) {
      pokemonRef.current.value = "";
      return;
    }

    if (currentPokemon !== pokemon) {
      setCurrentPokemon(pokemon);
      setResults({});
    }
  };

  const searchPokemon = async () => {
    if (poke_data[pokemonRef.current?.value] === undefined) {
      setNodata(true);
      setResults({});
      return;
    }

    const params = {
      pokemon: pokemonRef.current?.value,
      item: itemRef.current?.value,
      series: series,
      format: format,
    };

    if (
      searchParams.pokemon === params.pokemon &&
      searchParams.item === params.item &&
      searchParams.series === params.series &&
      searchParams.format === params.format
    ) {
      return;
    }

    setSearchParams(params);

    const data = await searchPokeItem(params);

    if (Object.keys(data).length === 0) {
      setNodata(true);
    } else {
      setNodata(false);
    }

    setResults(data);
  };
  return (
    <>
      <Box sx={{ paddingTop: 2 }}>
        <Box>
          <Box
            sx={{
              padding: 4,
              width: "90%",
              height: "fit-content",
              border: 1,
              maxWidth: 400,
              margin: "0 auto",
            }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "48%" }}>
                <TextField
                  select
                  label="Format"
                  autoComplete="off"
                  value={format}
                  sx={{ width: "100%", marginY: 1 }}
                  onChange={(e) => setFormat(e.target.value as Format)}>
                  <MenuItem value="single" id="single">
                    シングル
                  </MenuItem>
                  <MenuItem value="double" id="double">
                    ダブル
                  </MenuItem>
                </TextField>
              </Box>

              <Box sx={{ width: "48%" }}>
                <TextField
                  select
                  label="Series"
                  autoComplete="off"
                  value={series}
                  sx={{ width: "100%", marginY: 1 }}
                  onChange={(e) => setSeries(e.target.value)}>
                  {Object.keys(seriesData).map((num) => (
                    <MenuItem value={num} key={num}>
                      シリーズ {num}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Box style={{ position: "relative", width: "48%", height: 40 }}>
                <PokemonNameForm
                  addOptionAbility={addOptionAbility}
                  style={pokemonNameStyle}
                  ref={pokemonRef}
                />
              </Box>
              <Box>
                <Typography sx={{ padding: 1 }}>@</Typography>
              </Box>
              <Box
                style={{
                  position: "relative",
                  width: "48%",
                  height: 40,
                }}>
                <ItemForm ref={itemRef} style={itemStyle} />
              </Box>
            </Box>

            <Typography sx={{ textAlign: "center", padding: 1 }}>
              ※ポケモン名は必須です。
            </Typography>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => searchPokemon()}
                variant="outlined"
                style={{ width: "50vw", maxWidth: 400, height: 40 }}>
                型検索
              </Button>
            </Box>
          </Box>
        </Box>

        {nodata && (
          <Typography sx={{ textAlign: "center" }}>not found</Typography>
        )}
        <Box
          sx={{
            width: "100vw",
            margin: "0 auto",
            maxWidth: 400,
            paddingTop: 2,
          }}>
          {Object.keys(results).map((key) => (
            <Accordion key={key}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={key}
                id={key}>
                <Typography>
                  {key} ({results[key].length} 件)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {results[key].map((result) => (
                  <Box
                    key={result.url}
                    sx={{
                      display: "flex",
                      borderTop: 1,
                      alignItems: "center",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                      }}>
                      <Box style={{ display: "flex" }}>
                        <Typography sx={{ marginRight: 1 }}>努力値:</Typography>
                        <Typography sx={{ marginRight: 1 }}>
                          {result.effortValue}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography> {result.nature}</Typography>
                      </Box>
                    </Box>

                    <MuiLink
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2">
                      <IconButton>
                        <ArticleIcon />
                      </IconButton>
                    </MuiLink>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Stats;
