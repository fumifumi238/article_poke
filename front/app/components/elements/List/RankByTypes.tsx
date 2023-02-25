import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

type Props = {
  name: string;
  percentage: string;
  index: number;
};
const RankByTypes = ({ name, percentage, index }: Props) => {
  return (
    <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography variant="h6" sx={{ width: "20%" }}>
        {index + 1}.
      </Typography>
      <Typography sx={{ width: "65%" }}>
        {name !== "" ? name : "------"}
      </Typography>
      <Typography sx={{ width: "10%" }}>{percentage}</Typography>
    </ListItem>
  );
};

export default RankByTypes;
