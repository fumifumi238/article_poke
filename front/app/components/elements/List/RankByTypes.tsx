import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import React from "react";
type Props = { name: string; count: number };
const RankByTypes: React.FC<{ props: Props[] }> = ({ props }) => {
  const getPercentage = (count: number, sum: number) => {
    return (Math.floor((count / sum) * 10) / 10).toFixed(1);
  };
  return (
    <List sx={{ maxHeight: 200, overflow: "scroll", }}>
      {props.map((type, index) => (
        <ListItem
          key={type.name}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Typography variant="h6" sx={{ width: "20%" }}>
            {index + 1}.
          </Typography>
          <Typography sx={{ width: "70%" }}>{type.name}</Typography>
          <Typography sx={{ width: "10%" }}>
            {getPercentage(type.count, props.length)}%
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default RankByTypes;
