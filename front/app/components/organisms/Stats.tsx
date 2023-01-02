import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { calcStats } from "../../utils/calcStats";
import { textToNumber } from "../../utils/textToNumber";
import { StatsValue } from "../templates/RegisterPokemon";

type Stats = {
  value: StatsValue;
  style?: { [key: string]: string };
  baseStats?: number;
  effortValues: number[];
  setEffortValues: (effortValues: number[]) => void;
  individualValues: number[];
  setIndividualValues: (effortValues: number[]) => void;
  natureStatus: number;
  changeNatureToNumber: (index: number, num: number) => void;
};
const Stats = ({
  value,
  style,
  baseStats,
  effortValues,
  setEffortValues,
  individualValues,
  setIndividualValues,
  natureStatus,
  changeNatureToNumber,
}: Stats) => {
  type ButtonType = "normal" | "up" | "down";
  const indexOfValue: { [key: string]: number } = {
    こうげき: 1,
    ぼうぎょ: 2,
    とくこう: 3,
    とくぼう: 4,
    すばやさ: 5,
  };

  const buttonToNumber = {
    normal: 0,
    up: 1,
    down: 2,
  };

  const numberToButton = {
    0: "normal",
    1: "up",
    2: "down",
  };
  const [buttonType, setButtonType] = useState<ButtonType>(
    numberToButton[natureStatus]
  );
  const [effortValue, setEffortValue] = useState<number | string>(0);
  const [individualValue, setIndividualValue] = useState<number | string>(31);

  useEffect(() => {
    setEffortValue(effortValues[indexOfValue[value]]);
  }, [effortValues]);

  useEffect(() => {
    setIndividualValue(individualValues[indexOfValue[value]]);
  }, [individualValues]);

  useEffect(() => {
    setButtonType(numberToButton[natureStatus]);
  }, [natureStatus]);

  useEffect(() => {
    changeNatureToNumber(indexOfValue[value] - 1, buttonToNumber[buttonType]);
  }, [buttonType]);

  const changeEffortValues = () => {
    const copyOfEffortValues = [...effortValues];
    copyOfEffortValues[indexOfValue[value]] = Number(effortValue);

    let sum = 0;
    for (let i = 0; i <= 5; i++) {
      sum += copyOfEffortValues[i];
    }
    copyOfEffortValues[6] = sum;
    setEffortValues(copyOfEffortValues);
  };

  const changeIndividualValues = () => {
    const copyOfIndividualValues = [...individualValues];
    copyOfIndividualValues[indexOfValue[value]] = Number(individualValue);
    setIndividualValues(copyOfIndividualValues);
  };

  const returnColor = () => {
    switch (buttonType) {
      case "up":
        return "#886048";
      case "down":
        return "#407898";
      default:
        return "#dcdcdc";
    }
  };

  return (
    <Box sx={{ height: 22, borderBottom: 1, display: "flex" }}>
      <Box
        sx={{
          width: "40%",
          height: 22,
          overflow: "hidden",
          background: `${
            value === "ぼうぎょ" || value === "とくぼう" ? "#788898" : "#8898a8"
          }`,
          ...style,
        }}>
        <p
          style={{
            margin: 0,
            color: `${returnColor()}`,
            fontSize: 14,
          }}>
          {value}
        </p>
      </Box>
      <Box
        sx={{
          width: "55%",
          height: 22,
          borderTopRightRadius: "5px",
          display: "flex",
          alignItems: "center",
        }}>
        <li
          style={{
            margin: 0,
            fontSize: 12,
            listStyle: "none",
          }}>
          {calcStats(
            baseStats,
            Number(effortValue),
            Number(individualValue),
            buttonType
          )}
        </li>
        <li
          style={{
            margin: 0,
            fontSize: 12,
            listStyle: "none",
          }}>
          (
        </li>
        <li
          style={{
            margin: 0,
            fontSize: 12,
            listStyle: "none",
          }}>
          {
            <TextField
              value={effortValue}
              type="tel"
              variant="standard"
              inputMode="numeric"
              onBlur={changeEffortValues}
              onChange={(e) =>
                textToNumber(
                  e.target.value,
                  0,
                  setEffortValue,
                  0,
                  252,
                  effortValues[6] - effortValues[indexOfValue[value]]
                )
              }
              inputProps={{
                style: {
                  padding: 0,
                  height: 22,
                  width: 20,
                  fontSize: 12,
                  textAlign: "center",
                },
              }}
            />
          }
        </li>
        <li
          style={{
            margin: 0,
            fontSize: 12,
            listStyle: "none",
          }}>
          )
        </li>
        <li
          style={{
            margin: 0,
            fontSize: 12,
            listStyle: "none",
          }}>
          <TextField
            value={individualValue}
            type="tel"
            variant="standard"
            inputMode="tel"
            onBlur={changeIndividualValues}
            onChange={(e) =>
              textToNumber(e.target.value, 0, setIndividualValue, 0, 31)
            }
            inputProps={{
              style: {
                padding: 0,
                height: 22,
                width: 20,
                fontSize: 12,
                textAlign: "center",
              },
            }}
          />
        </li>
      </Box>
      <Box sx={{ width: "15%" }}>
        {buttonType === "normal" && (
          <CheckCircleIcon
            sx={{ width: 20, height: 20, color: "#dcdcdc" }}
            onClick={() => setButtonType("up")}
          />
        )}
        {buttonType === "up" && (
          <AddCircleOutlineIcon
            sx={{ width: 20, height: 20, color: "#886048" }}
            onClick={() => setButtonType("down")}
          />
        )}
        {buttonType === "down" && (
          <DoDisturbOnIcon
            sx={{ width: 20, height: 20, color: "#407898" }}
            onClick={() => setButtonType("normal")}
          />
        )}
      </Box>
    </Box>
  );
};

export default Stats;
