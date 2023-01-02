import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { textToNumber } from "../../../utils/textToNumber";

type Rank = {
  rank: string | number;
  setRank: Dispatch<SetStateAction<string | number>>;
};

const RankForm = ({ rank, setRank }: Rank) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
      }}>
      <Typography sx={{ fontSize: "16px" }}>Rank:</Typography>
      <TextField
        placeholder="1"
        label="Rank"
        size="small"
        type="tel"
        value={rank}
        autoComplete="off"
        inputMode="numeric"
        sx={{ maxWidth: 80 }}
        onChange={(e) => textToNumber(e.target.value, "", setRank, 1, 99999)}
      />
      <Typography sx={{ fontSize: "16px", margin: 1 }}>位</Typography>
    </Box>
  );
};

export default RankForm;
