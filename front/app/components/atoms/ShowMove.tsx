import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type ShowMove = {
  move: string | undefined;
};

const ShowMove = ({ move }: ShowMove) => {
  return (
    <Box
      sx={{
        border: 1,
        width: "50%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography sx={{ fontSize: "2vh" }}>
        {move !== undefined ? move : "--------"}
      </Typography>
    </Box>
  );
};

export default ShowMove;
