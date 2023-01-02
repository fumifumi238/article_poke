import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Name = {
  tn: string;
  setName: Dispatch<SetStateAction<string>>;
  validationForm: () => void;
};

const NameForm = ({ tn, setName, validationForm }: Name) => {
  const onChangeName = (value: string) => {
    const maxNameLength = 30;
    if (value.length < maxNameLength) {
      setName(value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "2px",
        width: "40%",
        minWidth: 180,
      }}>
      <Typography>TN*:</Typography>

      <TextField
        placeholder="スカーレット"
        label="TN*"
        fullWidth
        size="small"
        autoComplete="off"
        value={tn}
        onBlur={validationForm}
        onChange={(e) => onChangeName(e.target.value)}
      />
    </Box>
  );
};

export default NameForm;
