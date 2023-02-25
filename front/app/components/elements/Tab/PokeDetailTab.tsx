import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import RankByTypes from "../List/RankByTypes";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";


type Props = {
  count: number;
  item: { [key: string]: number };
  terastal: { [key: string]: number };
  move: { [key: string]: number };
  ability: { [key: string]: number };
  nature: { [key: string]: number };
};

const PokeDetailTab = ({
  count,
  item,
  terastal,
  move,
  ability,
  nature,
}: Props) => {
  const [value, setValue] = useState<string>("moves");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getPercentage = (count: number, sum: number) => {
    return (Math.floor((count / sum) * 1000) / 10).toFixed(1) + "%";
  };

  type Props = {
    value: string;
    types: { [key: string]: number };
  };
  const TabPanelList = ({ value, types }: Props) => {
    return (
      <TabPanel value={value} sx={{ padding: 0 }}>
        <List sx={{ height: 200, overflow: "auto" }}>
          {Object.keys(types).map((type, index) => (
            <React.Fragment key={type}>
              <RankByTypes
                name={type}
                percentage={getPercentage(types[type], count)}
                index={index}
              />
            </React.Fragment>
          ))}
        </List>
      </TabPanel>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            // maxWidth: { xs: 375, sm: 480 },
          }}>
          <Tabs
            onChange={handleChange}
            aria-label="lab API tabs example"
            value={value}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile>
            <Tab label="わざ" value="moves" />
            <Tab label="もちもの" value="items" />
            <Tab label="とくせい" value="abilities" />
            <Tab label="せいかく" value="natures" />
            <Tab label="テラスタル" value="terastals" />
          </Tabs>
        </Box>

        <TabPanelList value="moves" types={move} />
        <TabPanelList value="items" types={item} />
        <TabPanelList value="abilities" types={ability} />
        <TabPanelList value="natures" types={nature} />
        <TabPanelList value="terastals" types={terastal} />
      </TabContext>
    </Box>
  );
};

export default PokeDetailTab;
