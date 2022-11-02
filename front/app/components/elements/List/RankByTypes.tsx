import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";

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
      <Typography sx={{ width: "70%" }}>{name}</Typography>
      <Typography sx={{ width: "10%" }}>{percentage}%</Typography>
    </ListItem>
  );
};

export default RankByTypes;
