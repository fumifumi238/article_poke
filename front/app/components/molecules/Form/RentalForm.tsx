import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Rental = {
  rental: string;
  setRental: Dispatch<SetStateAction<string>>;
};

const RentalForm = ({ rental, setRental }: Rental) => {
  const validateRentalCode = () => {
    if (rental.length !== 6 || !rental.match(/^[a-zA-Z0-9]+$/)) {
      setRental("");
      return;
    }
    setRental(rental);
  };

  const onChangeRental = (value: string) => {
    if (value.length > 6) {
      return;
    }

    setRental(value.toUpperCase());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "4px",
        maxWidth: 180,
      }}>
      <Typography>Rental:</Typography>

      <TextField
        placeholder="A1B6CC"
        fullWidth
        label="Rental"
        size="small"
        autoComplete="off"
        value={rental}
        onBlur={validateRentalCode}
        onChange={(e) => onChangeRental(e.target.value)}
      />
    </Box>
  );
};

export default RentalForm;
