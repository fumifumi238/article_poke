import Box from "@mui/material/Box";
import AutoCompleteInput from "../elements/Input/AutoCompleteInput";
import { movesData } from "../../utils/data/move";
import Image from "next/image";
import pokeData from "../../json/poke_data.json";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { typesData } from "../../utils/data/types";
import { itemsData } from "../../utils/data/items";
import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MenuItem from "@mui/material/MenuItem";
import Stats from "../organisms/Stats";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HPStats from "../organisms/HPStats";
import { initPokemon, PokeDetailsContext } from "../../pages/form";
import { changeIcon } from "../../utils/changeIcon";
import Menu from "@mui/material/Menu";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PokemonNameForm from "../organisms/PokemonNameForm";

type RegisterPokemon = {
  onClose: () => void;
  currentPoke: number;
  setCurrentPoke: (num: number) => void;
};

type PokemonRefContext = {
  pokemonRef: MutableRefObject<HTMLInputElement>;
};

export const PokemonRefContext = createContext({} as PokemonRefContext);

const RegisterPokemon = ({
  onClose,
  currentPoke,
  setCurrentPoke,
}: RegisterPokemon) => {
  const [nature, setNature] = useState<string>("");
  const [move, setMove] = useState<string>("");
  const [moves, setMoves] = useState<string[]>(["", "", "", ""]);
  const pokemonRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef(null);
  const terastalRef = useRef(null);
  const [ability, setAbility] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [effortValues, setEffortValues] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const { pokeDetails, setPokeDetails } = useContext(PokeDetailsContext);
  const [iconUrls, setIconUrls] = useState<string[]>(new Array(6));
  const [optionAbilities, setOptionAbilities] = useState<string[]>(
    pokeDetails[currentPoke].pokemon !== ""
      ? pokeData[pokeDetails[currentPoke].pokemon].abilities
      : []
  );

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 80,
        padding: 0,
      },
    },
  };

  const checkErrors = () => {
    const newMoves = moves.filter((move) => move !== "");
    const deleteDuplicate = new Set(newMoves);
    if (deleteDuplicate.size !== newMoves.length) {
      console.log("重複した技は登録できません。");
      return;
    }
  };

  const filterOptions = createFilterOptions({
    limit: 5,
    trim: true,
  });

  const saveData = () => {
    checkErrors();
    const copyPokeDetails = [...pokeDetails];
    copyPokeDetails[currentPoke] = {
      pokemon: pokemonRef.current.value,
      ability: ability,
      item: itemRef.current.value,
      baseStats: baseStats,
      effortValues: effortValues,
      nature: nature,
      moves: moves,
      terastal: terastalRef.current.value,
    };
    setPokeDetails(copyPokeDetails);
  };

  const changeMoves = (value: string, num: number) => {
    const copyOfMoves = [...moves];
    copyOfMoves[num] = value;
    console.log(value);
    setMoves(copyOfMoves);
  };
  useEffect(() => {
    pokemonRef.current.value = pokeDetails[currentPoke].pokemon;
    itemRef.current.value = pokeDetails[currentPoke].item;
    terastalRef.current.value = pokeDetails[currentPoke].terastal;
    setAbility(pokeDetails[currentPoke].ability);
    setBaseStats(pokeDetails[currentPoke].baseStats);
    setEffortValues(pokeDetails[currentPoke].effortValues);
    setMoves(pokeDetails[currentPoke].moves);
    setNature(pokeDetails[currentPoke].nature);

    if (pokeDetails[currentPoke].pokemon !== "") {
      setOptionAbilities(pokeData[pokeDetails[currentPoke].pokemon].abilities);
    }

    const pokemonIconuUrls: string[] = [];
    for (let i = 0; i <= 5; i++) {
      pokemonIconuUrls.push(changeIcon(pokeDetails[i].pokemon));
    }
    setIconUrls(pokemonIconuUrls);
  }, [currentPoke]);

  const addOptionAbility = (pokemon: string) => {
    if (pokeData[pokemon] !== undefined) {
      pokemonRef.current.value = pokemon;
      console.log(pokemon);
      setOptionAbilities(pokeData[pokemon].abilities);
      setAbility(pokeData[pokemon].abilities[0]);
      setBaseStats(pokeData[pokemon].baseStats);
      terastalRef.current.focus();
    } else {
      pokemonRef.current.value = null;
      setOptionAbilities([]);
      setAbility("");
      setBaseStats([0, 0, 0, 0, 0, 0, 0]);
    }
    setEffortValues([0, 0, 0, 0, 0, 0, 0]);
    setMoves(["", "", "", ""]);
    const copyIconUrls = [...iconUrls];
    copyIconUrls[currentPoke] = changeIcon(pokemon);
    setIconUrls(copyIconUrls);
  };

  const clickArrowLeftIcon = () => {
    saveData();
    if (currentPoke === 0) {
      setCurrentPoke(5);
    } else {
      setCurrentPoke(currentPoke - 1);
    }
  };
  const clickArrowRightIcon = () => {
    saveData();
    if (currentPoke === 5) {
      setCurrentPoke(0);
    } else {
      setCurrentPoke(currentPoke + 1);
    }
  };
  return (
    <Box
      sx={{
        minWidth: 240,
        maxWidth: 400,
        width: "100%",
        margin: "0 auto",
      }}>
      <Box>
        <Box
          sx={{
            border: "10px solid",
            display: "flex",
            height: 260,
          }}>
          <Box sx={{ width: "60%", bgcolor: "#e0e8e8" }}>
            <Box
              sx={{
                width: "100%",
                borderTop: 2,
                marginTop: "7px",
                bgcolor: "#f06058",
              }}>
              <Box
                sx={{
                  marginTop: "7px",
                }}>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "#f06058",
                    height: 228,
                    borderTopRightRadius: "10px",
                    border: 3,
                  }}>
                  <Box
                    sx={{
                      border: 3,
                      height: "70%",
                      marginTop: "5px",
                      marginRight: "5px",
                      marginLeft: "20px",
                      bgcolor: "white",
                      borderRadius: "10px",
                    }}>
                    <HPStats
                      baseStats={baseStats[0]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                    />
                    <Box
                      sx={{
                        height: 15,
                        borderBottom: 1,
                        background: "#607888",
                      }}>
                      <Box
                        sx={{
                          background: "#484848",
                          height: 15,
                          borderRadius: "5px",
                          width: "60%",
                          marginLeft: "40px",
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <Box>
                          <p
                            style={{
                              margin: 0,
                              color: "#f8b800",
                              fontSize: "10px",
                              fontWeight: "bold",
                              width: "20%",
                            }}>
                            HP:
                          </p>
                        </Box>
                        <Box
                          sx={{
                            height: 10,
                            background: "#18c020",
                            width: "78%",
                            borderRadius: "2px",
                          }}></Box>
                      </Box>
                    </Box>
                    <Stats
                      value="こうげき"
                      baseStats={baseStats[1]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                    />
                    <Stats
                      value="ぼうぎょ"
                      baseStats={baseStats[2]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                    />
                    <Stats
                      value="とくこう"
                      baseStats={baseStats[3]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                    />
                    <Stats
                      value="とくぼう"
                      baseStats={baseStats[4]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                    />
                    <Stats
                      value="すばやさ"
                      baseStats={baseStats[5]}
                      effortValues={effortValues}
                      setEffortValues={setEffortValues}
                      style={{ borderBottomLeftRadius: "5px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      borderTop: "5px solid #f06058",
                    }}></Box>
                  <Box sx={{ border: 1, height: 52, bgcolor: "white" }}>
                    <Box sx={{ height: "50%", border: 1 }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "40%", borderRight: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              color: "white",
                              backgroundColor: "#788898",
                            }}>
                            とくせい
                          </p>
                        </Box>
                        <Box
                          sx={{
                            width: "60%",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <TextField
                            id="demo-simple-select-standard"
                            value={ability}
                            select
                            InputProps={{
                              style: {
                                padding: 0,
                                fontSize: "12px",
                                height: 24,
                                width: "100%",
                                marginLeft: "5px",
                              },
                            }}
                            variant="standard"
                            onChange={(e) => setAbility(e.target.value)}>
                            {optionAbilities.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </Box>
                      <p style={{ margin: 0, fontSize: 14 }}>
                        げんざい　ちょうさちゅう
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "40%", bgcolor: "#e0e8e8" }}>
            <Box
              sx={{
                width: "100%",
                borderBottom: 2,
                borderTop: 2,
                marginTop: "7px",
                bgcolor: "#f06058",
              }}>
              <p
                style={{
                  margin: 0,
                  paddingLeft: "10px",
                  backgroundColor: "#f06058",
                  color: "white",
                }}>
                のうりょく
              </p>
            </Box>
            <Box
              sx={{
                marginTop: "3px",
                marginLeft: "5px",
                border: 1,
                borderRight: "none",
                height: 40,
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                width: "100%",
              }}>
              <Box
                sx={{
                  height: 20,
                  bgcolor: "#8898a8",
                  display: "flex",
                  width: "97%",
                }}>
                <Box
                  sx={{
                    width: "20%",
                  }}>
                  <Image
                    src="/image/ball/pokemonball.png"
                    height={23}
                    width={23}></Image>
                </Box>
                <Box
                  sx={{
                    width: "80%",
                    position: "absolute",
                  }}>
                  <Box
                    style={{
                      position: "relative",
                      left: 21,
                      top: -3,
                      width: "100%",
                    }}>
                    <PokemonRefContext.Provider value={{ pokemonRef }}>
                      <PokemonNameForm addOptionAbility={addOptionAbility} />
                    </PokemonRefContext.Provider>
                  </Box>
                </Box>
              </Box>
              <Box>
                <p style={{ margin: 0, paddingLeft: 10 }}> lv.50</p>
              </Box>
            </Box>
            <Box
              sx={{
                height: 18,
                border: 1,
                borderRadius: "10px",
                marginTop: "2px",
                marginLeft: "2px",
                width: "100%",
                display: "flex",
                overflow: "wrap",
                position: "relative",
              }}>
              <Box
                sx={{
                  width: "45%",
                  bgcolor: "#8898a8",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "10px",
                    color: "white",
                    height: 16,
                    overflow: "hidden",
                  }}>
                  テラスタル
                </p>
              </Box>
              <Box
                sx={{
                  width: "55%",
                  position: "absolute",
                }}>
                <input
                  ref={terastalRef}
                  style={{
                    padding: 0,
                    fontSize: "10px",
                    height: 16,
                    width: "90%",
                    background: "#e0e8e8",
                    border: "none",
                    position: "relative",
                    top: -6,
                    left: "85%",
                  }}
                />
                <ul
                  style={{
                    paddingLeft: 0,
                    maxHeight: 240,
                    overflow: "auto",
                    borderRadius: 5,
                    background: "white",
                    width: "95%",
                    position: "relative",
                    zIndex: 1,
                    top: -25,
                    left: "85%",
                  }}>
                  {typesData.map((type) => (
                    <li
                      key={type}
                      style={{
                        listStyle: "none",
                        padding: 3,
                      }}>
                      {type}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <div style={{ position: "absolute", zIndex: 0 }}>
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                    zIndex: 0,
                  }}>
                  <Image
                    src={`/image/${iconUrls[currentPoke]}`}
                    layout="fill"
                    objectFit="contain"
                    alt="no image"
                  />
                </div>
              </div>
            </Box>
            <Box
              sx={{
                bgcolor: "white",
                borderTop: 1,
                borderLeft: 1,
                borderTopLeftRadius: "5px",
                marginLeft: "10px",
                height: 42,
              }}>
              <Box
                sx={{
                  height: 21,
                  borderBottom: 1,
                  bgcolor: "#8898a8",
                  width: "100%",
                }}>
                <p
                  style={{
                    margin: 0,
                    color: "#f8f8f8",
                  }}>
                  もちもの
                </p>
              </Box>
              <Box sx={{ height: 21, backgroundColor: "#e0e8e8" }}>
                <Autocomplete
                  disablePortal
                  freeSolo
                  clearOnBlur
                  id="itemform"
                  sx={{
                    width: "100%",
                  }}
                  options={itemsData}
                  autoHighlight={true}
                  disableClearable={true}
                  ref={itemRef}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          padding: 0,
                          fontSize: "13px",
                        },
                      }}
                      fullWidth
                      variant="standard"
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "10px solid",
          }}>
          <Box sx={{ width: "60%", bgcolor: "#e0e8e8", height: 260 }}>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#f06058",
                height: 235,
                borderBottomRightRadius: "10px",
                border: 3,
              }}>
              <Box
                sx={{
                  margin: "10px 22px 20px 10px",
                  height: 200,
                  bgcolor: "white",
                  borderRadius: "10px",
                  border: 3,
                }}>
                {[1, 2, 3, 4].map((i) => (
                  <Box sx={{ height: "24%" }} key={i}>
                    <Autocomplete
                      disablePortal
                      clearOnBlur
                      freeSolo
                      id="combo-box-demo"
                      filterOptions={filterOptions}
                      sx={{ padding: 0 }}
                      options={movesData}
                      autoHighlight={true}
                      disableClearable={true}
                      value={moves[i - 1]}
                      onChange={(event: any, newValue: string | null) => {
                        changeMoves(newValue, i - 1);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`わざ${i}`}
                          variant="filled"
                        />
                      )}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Button
                onClick={() => {
                  saveData(), onClose();
                }}
                sx={{ padding: 0, marginLeft: 1 }}
                size="small"
                variant="contained">
                とじる
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: "40%", bgcolor: "#e0e8e8", height: 260 }}>
            <Box sx={{ marginTop: "20px", borderTop: 2, borderBottom: 2 }}>
              <p
                style={{
                  margin: 0,
                  paddingLeft: "10px",
                  backgroundColor: "#f06058",
                  color: "white",
                }}>
                たたかうわざ
              </p>
            </Box>
            <Box
              sx={{
                width: "80%",
                height: 150,
                marginLeft: 2,
                marginTop: 2,
                display: "flex",
                flexWrap: "wrap",
              }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Box
                  key={i}
                  onClick={() => {
                    saveData(), setCurrentPoke(i);
                  }}
                  sx={{
                    height: 50,
                    border: `${
                      currentPoke === i ? "2px solid red" : "2px solid black"
                    }`,
                    width: 1 / 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Image
                    src={`/image/${iconUrls[i]}`}
                    height={45}
                    width={45}></Image>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: 20,
                  height: 30,
                  marginTop: "10px",
                  marginLeft: "28px",
                  border: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <ArrowLeftIcon onClick={clickArrowLeftIcon} />
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 30,
                  margin: "auto",
                  marginTop: "10px",
                  border: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src={`/image/${iconUrls[currentPoke]}`}
                  height={30}
                  width={30}></Image>
              </Box>
              <Box
                sx={{
                  width: 20,
                  height: 30,
                  marginTop: "10px",
                  marginRight: "28px",
                  border: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <ArrowRightIcon onClick={clickArrowRightIcon} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPokemon;
