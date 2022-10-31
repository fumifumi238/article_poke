import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import RankByTypes from "../List/RankByTypes";

type Props = {
  name: string;
  count: number;
};
type Pokemon = {
  pokemon: string;
  items: Props[];
  moves: Props[];
};
const PokeDetailTab = ({ pokemon, items, moves }: Pokemon) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            maxWidth: { xs: 375, sm: 480 },
          }}
        >
          <Tabs
            onChange={handleChange}
            aria-label="lab API tabs example"
            value={value}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="わざ" value="moves" />
            <Tab label="もちもの" value="items" />
            <Tab label="とくせい" value="abilities" />
            <Tab label="せいかく" value="natures" />
            <Tab label="テラスタル" value="terastals" />
          </Tabs>
        </Box>
        <TabPanel value="moves" sx={{ padding: 0 }}>
          <RankByTypes props={moves} />
        </TabPanel>
        <TabPanel value="items" sx={{ padding: 0 }}>
          <RankByTypes props={items} />
        </TabPanel>
        <TabPanel value="abilities">Item Three</TabPanel>
        <TabPanel value="natures">Item Three</TabPanel>
        <TabPanel value="terastals">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default PokeDetailTab;
