import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calcStats } from "../../utils/calcStats";

type ShowStats = {
  value: string;
  baseStats: number;
  effortValue: number;
  individualValue: number;
  buttonType: number;
};

const ShowStats = ({
  value,
  baseStats,
  effortValue,
  individualValue,
  buttonType,
}: ShowStats) => {
  const correction = { 0: "normal", 1: "up", 2: "down" };

  const returnColor = (value: string) => {
    switch (value) {
      case "up":
        return "#886048";
      case "down":
        return "#407898";
      default:
        return "#dcdcdc";
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        borderTop: 1,
        background: `${value === "B" || value === "D" ? "#788898" : "#8898a8"}`,
      }}>
      <Box sx={{ margin: "0 auto", width: "15%", borderRight: 1 }}>
        <Typography
          sx={{
            fontSize: "0.8vw",
            whiteSpace: "nowrap",
            color: returnColor(correction[buttonType]),
          }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ margin: "0 auto", width: "85%" }}>
        <Typography
          sx={{
            fontSize: "0.8vw",
            whiteSpace: "nowrap",
            color: returnColor(correction[buttonType]),
          }}>
          {calcStats(
            baseStats,
            effortValue,
            individualValue,
            correction[buttonType]
          )}
          ({effortValue})-{individualValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowStats;
