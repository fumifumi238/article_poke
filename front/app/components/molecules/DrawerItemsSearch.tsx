import { ExpandLess, StarBorder } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

type DrawerItemsSearch = {
  value: string;
  href: string;
  placeholder: string;
  icon: ReactNode;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const DrawerItemsSearch = ({
  value,
  href,
  placeholder,
  icon,
  setDrawerOpen,
}: DrawerItemsSearch) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const onClickSearch = () => {
    setDrawerOpen(false);

    if (inputRef.current?.value !== "") {
      router.push(`${href}/${inputRef.current.value}`);
    }
  };
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={value} sx={{ fontWeight: "bold" }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <input
              type="text"
              placeholder={placeholder}
              ref={inputRef}
              style={{ height: 30 }}
            />
            <ListItemIcon sx={{ pl: 2 }}>
              <SearchIcon onClick={onClickSearch} />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

export default DrawerItemsSearch;
