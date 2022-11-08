import Box from "@mui/material/Box";
import AutoCompleteInput from "../components/elements/Input/AutoCompleteInput";
import { movesData } from "../utils/data/move";
import Image from "next/image";
import pokeData from "../json/poke_data.json";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { typesData } from "../utils/data/types";
import { itemsData } from "../utils/data/items";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Stats from "../components/organisms/Stats";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HPStats from "../components/organisms/HPStats";

const Sample = () => {
  const [terastal, setTerastal] = useState<string | null>("");
  const [pokemon, setPokemon] = useState<string | null>(null);
  const [ability, setAbility] = useState<string>("");
  const [optionAbilities, setOptionAbilities] = useState<string[]>([]);
  const [pokeImage, setPokeImage] = useState<string>("");
  const [baseStats, setBaseStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [iconUrl, setIconUrl] = useState<string>("ball/pokemonball.png");
  const addOptionAbility = () => {
    console.log(pokemon);
    if (pokeData[pokemon] !== undefined) {
      setOptionAbilities(pokeData[pokemon].abilities);
      setAbility(pokeData[pokemon].abilities[0]);
      setPokeImage(pokeData[pokemon].no);
      setBaseStats(pokeData[pokemon].baseStats);
      setIconUrl(
        "icon/Pokémon-Icon_" +
          pokeData[pokemon].no.toString().padStart(3, "0") +
          ".png"
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          border: "10px solid",
          width: "100%",
          minWidth: 240,
          maxWidth: 400,
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
                  <HPStats baseStats={baseStats[0]} />
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
                  <Stats value="こうげき" baseStats={baseStats[1]} />
                  <Stats value="ぼうぎょ" baseStats={baseStats[2]} />
                  <Stats value="とくこう" baseStats={baseStats[3]} />
                  <Stats value="とくぼう" baseStats={baseStats[4]} />
                  <Stats
                    value="すばやさ"
                    baseStats={baseStats[5]}
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
                            <MenuItem
                              value={option}
                              key={option}
                              sx={{ maxHeight: 20 }}>
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
            }}>
            <Box
              sx={{
                height: 20,
                bgcolor: "#8898a8",
                display: "flex",
              }}>
              <Box
                sx={{
                  width: "20%",
                  position: "absolute",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  position: "relative",
                  left: 25,
                  top: -3,
                }}>
                <Autocomplete
                  disablePortal
                  freeSolo
                  id="combo-box-demo"
                  sx={{
                    width: "100%",
                  }}
                  options={Object.keys(pokeData)}
                  disableClearable={true}
                  value={pokemon}
                  onChange={(event: any, newValue: string | null) => {
                    setPokemon(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          color: "white",
                          padding: 0,
                          fontSize: "13px",
                          height: 22,
                        },
                      }}
                      fullWidth
                      onBlur={addOptionAbility}
                      placeholder="ポケモン"
                      variant="standard"
                    />
                  )}
                />
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
              width: "95%",
              display: "flex",
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
            <Box>
              <TextField
                id="demo-simple-select-standard"
                value={terastal}
                select
                InputProps={{
                  style: {
                    padding: 0,
                    fontSize: "10px",
                    height: 16,
                    width: 80,
                  },
                }}
                variant="standard"
                onChange={(e) => setTerastal(e.target.value)}>
                {typesData.map((type) => (
                  <MenuItem value={type} key={type} sx={{ maxHeight: 20 }}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box
            sx={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box>
              <Image
                src={`/image/${iconUrl}`}
                alt={pokemon}
                width={80}
                height={80}></Image>
            </Box>
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
          width: "100%",
          minWidth: 240,
          maxWidth: 400,
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
                  <AutoCompleteInput label={`わざ${i}`} options={movesData} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Button
              sx={{ padding: 0, marginLeft: 1 }}
              size="small"
              variant="contained">
              もどる
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
            }}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
              <Box
                sx={{
                  height: 50,
                  border: 1,
                  width: 1 / 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Image
                  src="/image/ball/pokemonball.png"
                  height={23}
                  width={23}></Image>
              </Box>
            </Box>
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
              <ArrowLeftIcon />
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
              <Image src={`/image/${iconUrl}`} height={23} width={23}></Image>
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
              <ArrowRightIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sample;