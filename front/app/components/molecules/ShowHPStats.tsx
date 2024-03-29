import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calcHPStats } from "../../utils/calcStats";

type ShowHPStats = {
  baseStats: number;
  effortValue: number;
  individualValue: number;
};
const ShowHPStats = ({
  baseStats,
  effortValue,
  individualValue,
}: ShowHPStats) => {
  return (
    <Box sx={{ display: "flex", background: "#788898", height: "16%" }}>
      <Box sx={{ margin: "0 auto", width: "15%", borderRight: 1 }}>
        <Typography
          sx={{
            fontSize: "1.8vh",
            whiteSpace: "nowrap",
            color: "#dcdcdc",
            height: "100%",
          }}>
          H
        </Typography>
      </Box>
      <Box sx={{ margin: "0 auto", width: "85%" }}>
        <Typography
          sx={{
            fontSize: "1.8vh",
            whiteSpace: "nowrap",
            color: "#dcdcdc",
          }}>
          {calcHPStats(baseStats, effortValue, individualValue)}({effortValue})-
          {individualValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowHPStats;
