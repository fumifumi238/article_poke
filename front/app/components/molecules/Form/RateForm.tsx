import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { textToNumber } from "../../../utils/textToNumber";

type Rate = {
  rate: string | number;
  setRate: Dispatch<SetStateAction<string | number>>;
};

const RateForm = ({ rate, setRate }: Rate) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 1,
      }}>
      <Typography sx={{ fontSize: "16px" }}>Rate:</Typography>
      <TextField
        placeholder="2000"
        label="Rate"
        size="small"
        type="tel"
        autoComplete="off"
        inputMode="numeric"
        value={rate}
        sx={{ maxWidth: 80 }}
        onChange={(e) => textToNumber(e.target.value, "", setRate, 1, 3000)}
      />
    </Box>
  );
};

export default RateForm;
