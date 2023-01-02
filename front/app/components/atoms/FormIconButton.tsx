import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const FormIconButton = () => {
  const router = useRouter();

  const redirectToForm = () => {
    router.push("/form");
  };

  return (
    <Fab
      color="primary"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80px",
        height: "80px",
      }}>
      <CreateIcon
        onClick={redirectToForm}
        sx={{ width: "45px", height: "45px", mt: 2 }}
      />
      <Typography
        sx={{ color: "white", mb: 1, fontSize: "13px", fontWeight: "bold" }}>
        投稿
      </Typography>
    </Fab>
  );
};

export default FormIconButton;
