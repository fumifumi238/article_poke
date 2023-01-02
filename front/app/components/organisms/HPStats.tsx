import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { calcHPStats } from "../../utils/calcStats";
import { textToNumber } from "../../utils/textToNumber";

type Stats = {
  baseStats: number;
  effortValues: number[];
  setEffortValues: (effortValues: number[]) => void;
  individualValues: number[];
  setIndividualValues: (effortValues: number[]) => void;
};
const HPStats = ({
  baseStats,
  effortValues,
  setEffortValues,
  individualValues,
  setIndividualValues,
}: Stats) => {
  const [effortValue, setEffortValue] = useState<number | string>(0);
  const [individualValue, setIndividualValue] = useState<number | string>(31);

  useEffect(() => {
    setEffortValue(effortValues[0]);
  }, [effortValues]);

  useEffect(() => {
    setIndividualValue(individualValues[0]);
  }, [individualValues]);

  const changeIndividualValues = () => {
    const copyOfIndividualValues = [...individualValues];
    copyOfIndividualValues[0] = Number(individualValue);
    setIndividualValues(copyOfIndividualValues);
  };

  const changeEffortValues = () => {
    const copyOfEffortValues = [...effortValues];
    copyOfEffortValues[0] = Number(effortValue);

    let sum = 0;
    for (let i = 0; i <= 5; i++) {
      sum += copyOfEffortValues[i];
    }
    copyOfEffortValues[6] = sum;

    setEffortValues(copyOfEffortValues);
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
          {calcHPStats(baseStats, Number(effortValue), Number(individualValue))}
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
                  effortValues[6] - effortValues[0]
                )
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
            onBlur={changeIndividualValues}
            type="tel"
            variant="standard"
            inputMode="tel"
            onChange={(e) =>
              textToNumber(e.target.value, 0, setIndividualValue, 0, 31)
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
