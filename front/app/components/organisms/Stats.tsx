import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { textToNumber } from "../../utils/textToNumber";

type Stats = {
  value: "こうげき" | "ぼうぎょ" | "とくこう" | "とくぼう" | "すばやさ";
  style?: { [key: string]: string };
  baseStats?: number;
  effortValues: number[];
  setEffortValues: (effortValues: number[]) => void;
};
const Stats = ({
  value,
  style,
  baseStats,
  effortValues,
  setEffortValues,
}: Stats) => {
  type ButtonType = "normal" | "up" | "down";
  const indexOfValue: { [key: string]: number } = {
    こうげき: 1,
    ぼうぎょ: 2,
    とくこう: 3,
    とくぼう: 4,
    すばやさ: 5,
  };
  const [buttonType, setButtonType] = useState<ButtonType>("normal");
  const [effortValue, setEffortValue] = useState<number | string>(0);
  const [individualValue, setIndividualValue] = useState<number | string>(31);

  useEffect(() => {
    setEffortValue(effortValues[indexOfValue[value]]);
  }, [effortValues]);

  const changeEffortValues = () => {
    const copyOfEffortValues = [...effortValues];
    copyOfEffortValues[indexOfValue[value]] = Number(effortValue);
    copyOfEffortValues[6] += Number(effortValue);
    setEffortValues(copyOfEffortValues);
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

  const calcStats = () => {
    let correction = () => {
      switch (buttonType) {
        case "up":
          return 1.1;
        case "down":
          return 0.9;
        default:
          return 1.0;
      }
    };
    const stats = Math.floor(
      (Math.floor(
        ((baseStats * 2 + Number(individualValue) + Number(effortValue) / 4) *
          50) /
          100
      ) +
        5) *
        correction()
    );

    return stats;
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
          {calcStats()}
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
