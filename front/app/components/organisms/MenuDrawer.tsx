import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import { Dispatch, SetStateAction } from "react";
import DrawerItems from "../molecules/DrawerItems";

type MenuDrawer = {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuDrawer = ({ setDrawerOpen }: MenuDrawer) => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <DrawerItems
          value={"TOP"}
          icon={<HomeIcon />}
          href="/"
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"構築記事一覧"}
          icon={<ArticleIcon />}
          href="/article"
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"構築記事投稿"}
          icon={<CreateIcon />}
          href="/form"
          setDrawerOpen={setDrawerOpen}
        />
      </List>
    </Box>
  );
};

export default MenuDrawer;
