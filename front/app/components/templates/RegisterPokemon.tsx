import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import {
  createContext,
  createRef,
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import pokeData from "../../json/poke_data.json";
import { PokeDetailsContext } from "../../pages/form";
import { changeIcon } from "../../utils/changeIcon";
import HPStats from "../organisms/HPStats";
import Stats from "../organisms/Stats";

import { PokeDetails } from "../../types/PokeDetails";
import { getNature, getNatureToNumber } from "../../utils/nature";
import ItemForm from "../organisms/ItemForm";
import MoveForm from "../organisms/MoveForm";
import PokemonNameForm from "../organisms/PokemonNameForm";
import TerastalForm from "../organisms/TerastalForm";
import natures from "../../json/nature.json";
import Menu from "@mui/material/Menu";
import React from "react";
import Typography from "@mui/material/Typography";
import { getItemIcon } from "../../utils/getItemIcon";

type TerastalRefContext = {
  terastalRef: MutableRefObject<HTMLInputElement>;
};

type ItemRefContext = {
  itemRef: MutableRefObject<HTMLInputElement>;
};

type MoveRefsContext = {
  moveRefs: MutableRefObject<RefObject<HTMLInputElement>[]>;
};

export const TerastalRefContext = createContext({} as TerastalRefContext);
export const ItemRefContext = createContext({} as ItemRefContext);
export const MoveRefsContext = createContext({} as MoveRefsContext);
export type StatsValue =
  | "こうげき"
  | "ぼうぎょ"
  | "とくこう"
  | "とくぼう"
  | "すばやさ";

type RegisterPokemon = {
  onClose: (pokeDetails: PokeDetails[]) => void;
  currentPoke: number;
  setCurrentPoke: (num: number) => void;
};

const RegisterPokemon = ({
  onClose,
  currentPoke,
  setCurrentPoke,
}: RegisterPokemon) => {
  const pokemonRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const terastalRef = useRef<HTMLInputElement>(null);
  const moveRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  for (let i = 0; i < 4; i++) {
    moveRefs.current[i] = createRef<HTMLInputElement>();
  }

  const stats: StatsValue[] = [
    "こうげき",
    "ぼうぎょ",
    "とくこう",
    "とくぼう",
    "すばやさ",
  ];

  const [natureToNumber, setNatureToNumber] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);
  const [nature, setNature] = useState<string>("まじめ");


  const [ability, setAbility] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [effortValues, setEffortValues] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [individualValues, setIndividualValues] = useState<number[]>([
    31, 31, 31, 31, 31, 31,
  ]);
  const { pokeDetails, setPokeDetails } = useContext(PokeDetailsContext);
  const [iconUrls, setIconUrls] = useState<string[]>(new Array(6));
  const [itemIcon, setItemIcon] = useState<string[]>(
    new Array(6).fill("/image/ball/pokemonball.png")
  );
  const [optionAbilities, setOptionAbilities] = useState<string[]>(
    pokeDetails[currentPoke].pokemon !== ""
      ? pokeData[pokeDetails[currentPoke].pokemon].abilities
      : []
  );

  const changeNatureToNumber = (index: number, num: number) => {
    const copyOfNatureToNumber = [...natureToNumber];
    copyOfNatureToNumber[index] = num;
    setNatureToNumber(copyOfNatureToNumber);
  };

  const pokemonNameStyle = {
    input: {
      fontSize: "13px",
      color: "white",
      background: "#8898a8",
      border: "none",
    },
  };

  const itemStyle = {
    input: {
      border: "none",
      backgroundColor: "#e0e8e8",
      fontSize: "13px",
      top: -3,
      left: -4,
      marginLeft: 5,
      paddingRight: 0,
    },
  };

  const saveData = (close: boolean = false) => {
    const copyPokeDetails = [...pokeDetails];
    const moves = moveRefs.current.map((moveRef) => moveRef.current?.value);
    copyPokeDetails[currentPoke] = {
      pokemon: pokemonRef.current.value,
      ability: ability,
      item: itemRef.current.value,
      baseStats: baseStats,
      effortValues: effortValues,
      individualValues: individualValues,
      nature: getNature(natureToNumber),
      moves: moves,
      terastal: terastalRef.current.value,
    };
    setPokeDetails(copyPokeDetails);
    if (close) {
      onClose(copyPokeDetails);
    }
  };

  useEffect(() => {
    pokemonRef.current.value = pokeDetails[currentPoke].pokemon;
    itemRef.current.value = pokeDetails[currentPoke].item;
    terastalRef.current.value = pokeDetails[currentPoke].terastal;

    pokeDetails[currentPoke].moves.forEach((move, index) => {
      moveRefs.current[index].current.value = move;
    });

    setAbility(pokeDetails[currentPoke].ability);
    setBaseStats(pokeDetails[currentPoke].baseStats);
    setEffortValues(pokeDetails[currentPoke].effortValues);
    setIndividualValues(pokeDetails[currentPoke].individualValues);
    setNatureToNumber(getNatureToNumber(pokeDetails[currentPoke].nature));

    if (pokeDetails[currentPoke].pokemon !== "") {
      setOptionAbilities(pokeData[pokeDetails[currentPoke].pokemon].abilities);
    }

    const pokemonIconuUrls: string[] = [];
    for (let i = 0; i <= 5; i++) {
      pokemonIconuUrls.push(changeIcon(pokeDetails[i].pokemon));
    }
    setIconUrls(pokemonIconuUrls);

    const copyOfItemIcon: string[] = [];

    for (let i = 0; i <= 5; i++) {
      copyOfItemIcon.push(getItemIcon(pokeDetails[i].item));
    }
    setItemIcon(copyOfItemIcon);
  }, [currentPoke]);

  const focusItem = () => {
    itemRef.current.focus();
  };

  const clickClose = () => {
    saveData(true);
  };

  const addOptionAbility = (pokemon: string) => {
    if (pokeData[pokemon] !== undefined) {
      pokemonRef.current.value = pokemon;
      setOptionAbilities(pokeData[pokemon].abilities);
      setAbility(pokeData[pokemon].abilities[0]);
      setBaseStats(pokeData[pokemon].baseStats);
      terastalRef.current.focus();
    } else {
      pokemonRef.current.value = "";

      setOptionAbilities([]);
      setAbility("");
      setBaseStats([0, 0, 0, 0, 0, 0, 0]);
    }
    setEffortValues([0, 0, 0, 0, 0, 0, 0]);
    setIndividualValues([31, 31, 31, 31, 31, 31]);
    setNatureToNumber([0, 0, 0, 0, 0]);
    moveRefs.current.forEach((moveRef) => {
      moveRef.current.value = "";
    });
    terastalRef.current.value = "";
    itemRef.current.value = "";

    const copyOfItemIcon = [...itemIcon];
    copyOfItemIcon[currentPoke] = "/image/ball/pokemonball.png";
    setItemIcon(copyOfItemIcon);

    const copyIconUrls = [...iconUrls];
    copyIconUrls[currentPoke] = changeIcon(pokemon);
    setIconUrls(copyIconUrls);
  };

  useEffect(() => {
    if (nature !== getNature(natureToNumber)) {
      setNature(getNature(natureToNumber));
    }
  }, [natureToNumber]);

  const onChangeNature = (value: string) => {
    setNature(value);
    setNatureToNumber(getNatureToNumber(value));
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
                    <Box>
                      <HPStats
                        baseStats={baseStats[0]}
                        effortValues={effortValues}
                        setEffortValues={setEffortValues}
                        individualValues={individualValues}
                        setIndividualValues={setIndividualValues}
                      />
                    </Box>
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
                    {stats.map((value, index) => (
                      <Stats
                        value={value}
                        key={value}
                        baseStats={baseStats[index + 1]}
                        effortValues={effortValues}
                        setEffortValues={setEffortValues}
                        individualValues={individualValues}
                        setIndividualValues={setIndividualValues}
                        natureStatus={natureToNumber[index]}
                        changeNatureToNumber={changeNatureToNumber}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      borderTop: "5px solid #f06058",
                    }}></Box>
                  <Box sx={{ border: 1, height: 52, bgcolor: "white" }}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          borderBottom: 1,
                          height: "50%",
                        }}>
                        <Box sx={{ width: "40%", borderRight: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              color: "white",
                              backgroundColor: "#788898",
                            }}>
                            せいかく
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
                            value={nature}
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
                            onChange={(e) => onChangeNature(e.target.value)}>
                            {Object.values(natures).map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          height: "50%",
                          marginTop: "1px",
                        }}>
                        <Box sx={{ width: "40%", borderRight: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              color: "white",
                              backgroundColor: "#788898",
                              height: "100%",
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
                    alt=""
                    height={23}
                    width={23}></Image>
                </Box>
                <Box sx={{ position: "relative", width: "80%" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                    }}>
                    <Box
                      sx={{
                        height: "100%",
                        position: "relative",
                        top: "-2px",
                      }}>
                      <PokemonNameForm
                        addOptionAbility={addOptionAbility}
                        style={pokemonNameStyle}
                        ref={pokemonRef}
                      />
                    </Box>
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
                <TerastalRefContext.Provider value={{ terastalRef }}>
                  <TerastalForm focusItem={focusItem} />
                </TerastalRefContext.Provider>
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
              <Box
                sx={{
                  height: 21,
                  backgroundColor: "#e0e8e8",
                  display: "flex",
                }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "20%",
                    height: "100%",
                    borderRight: 1,
                  }}>
                  <Image
                    src={itemIcon[currentPoke]}
                    alt=""
                    layout="fill"
                    objectFit="contain"></Image>
                </Box>
                <ItemForm
                  ref={itemRef}
                  style={itemStyle}
                  setItemIcon={setItemIcon}
                  itemIcon={itemIcon}
                  currentPoke={currentPoke}
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
                  display: "flex",
                  flexWrap: "wrap",
                }}>
                <MoveRefsContext.Provider value={{ moveRefs }}>
                  {[0, 1, 2, 3].map((i) => (
                    <MoveForm index={i} key={i} />
                  ))}
                </MoveRefsContext.Provider>
              </Box>
            </Box>
            <Box>
              <Button
                onClick={clickClose}
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
                    alt={iconUrls[i]}
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
                  alt={"icon"}
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
