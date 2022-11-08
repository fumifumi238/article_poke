import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

type Stats = {
  baseStats: number;
};
const HPStats = ({ baseStats }: Stats) => {
  const [effortValue, setEffortValue] = useState<number>(0);
  const [individualValue, setIndividualValue] = useState<number>(31);

  const textToNumber = (
    value: string,
    setValue: (num: number) => void,
    max: number
  ) => {
    if (value.length === 0) {
      setValue(0);
      return;
    }
    if (Number.isNaN(value)) {
      return;
    }

    const valueToNumber = parseInt(value);
    if (valueToNumber >= 0 && valueToNumber <= max) {
      setValue(valueToNumber);
    }
  };

  const calcStats = () => {
    if (baseStats === 1) {
      return 1;
    }
    const stats =
      Math.floor(
        ((baseStats * 2 + individualValue + effortValue / 4) * 50) / 100
      ) + 60;

    return stats;
  };

  return (
    <Box sx={{ height: 25, borderBottom: 1, display: "flex" }}>
      <Box
        sx={{
          width: "36%",
          height: 24,
          background: "#788898",
          borderTopLeftRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <li
          style={{
            margin: 0,
            color: "#f8f8f8",
            fontSize: 14,
            padding: 0,
            listStyle: "none",
          }}>
          HP
        </li>
      </Box>
      <Box
        sx={{
          width: "60%",
          height: 25,
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
              onChange={(e) =>
                textToNumber(e.target.value, setEffortValue, 252)
              }
              inputProps={{
                style: {
                  padding: 0,
                  height: 25,
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
              textToNumber(e.target.value, setIndividualValue, 31)
            }
            inputProps={{
              style: {
                padding: 0,
                height: 25,
                width: 20,
                fontSize: 12,
                textAlign: "center",
              },
            }}
          />
        </li>
      </Box>
    </Box>
  );
};

export default HPStats;
