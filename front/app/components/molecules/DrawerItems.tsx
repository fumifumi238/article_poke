import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction } from "react";

type DrawerItems = {
  value: string;
  href: string;
  icon: ReactNode;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const DrawerItems = ({ value, href, icon, setDrawerOpen }: DrawerItems) => {
  const router = useRouter();
  const onItemButtonClick = () => {
    setDrawerOpen(false);
    router.push(href);
  };
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={onItemButtonClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={value} sx={{ fontWeight: "bold" }} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default DrawerItems;
