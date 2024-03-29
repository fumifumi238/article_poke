import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import { Dispatch, SetStateAction } from "react";
import DrawerItems from "../molecules/DrawerItems";
import DrawerItemsSearch from "../molecules/DrawerItemsSearch";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import ErrorIcon from "@mui/icons-material/Error";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { getCurrentSeason } from "../../utils/getCurrentSeason";

type MenuDrawer = {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuDrawer = ({ setDrawerOpen }: MenuDrawer) => {
  const {currentSeries,currentSeason} = getCurrentSeason();
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
          href={`/single/series${currentSeries}/season${currentSeason}`}
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"構築記事投稿"}
          icon={<CreateIcon />}
          href="/form"
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"S3 レンタル構築"}
          icon={<CatchingPokemonIcon />}
          href="/rental"
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"型検索"}
          icon={<TroubleshootIcon />}
          href="/stats"
          setDrawerOpen={setDrawerOpen}
        />

        <DrawerItemsSearch
          value={"ユーザー検索"}
          icon={<PersonSearchIcon />}
          href="/users"
          placeholder="twitter_id"
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerItems
          value={"利用規約"}
          icon={<ErrorIcon />}
          href="/about"
          setDrawerOpen={setDrawerOpen}
        />
      </List>
    </Box>
  );
};

export default MenuDrawer;
