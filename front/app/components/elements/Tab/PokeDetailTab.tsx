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
import { getData } from "../../../lib/api/fetchApi";
import type { Details, Types } from "../../../pages/article";
import { DetailsContext } from "../../../pages/article";

type Pokemon = {
  pokemon: string;
  articleIds: number[];
};

type Tabs = {
  items: Types[];
  moves: Types[];
  terastals: Types[];
  abilities: Types[];
  natures: Types[];
};

const PokeDetailTab = ({ pokemon, articleIds }: Pokemon) => {
  const [value, setValue] = useState<string>("moves");
  const { details, setDetails } = useContext(DetailsContext);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getUtilizationRate = async () => {
      const params = {
        pokemon: pokemon,
        ids: articleIds,
      };
      const data = (await getData(
        "/articles/utilization_rate",
        params
      )) as unknown as Tabs;

      const newData: Details = {
        [pokemon]: {
          items: data.items,
          moves: data.moves,
          terastals: data.terastals,
          ablities: data.abilities,
          natures: data.natures,
        },
      };
      setDetails((prev) => ({
        ...prev,
        ...newData,
      }));
      setTimeout(() => setLoading(false), 300);
      console.log("更新");
    };

    if (details[pokemon] === undefined) {
      getUtilizationRate();
    } else {
      setTimeout(() => setLoading(false), 300);
    }
  }, []);

  const getPercentage = (count: number, sum: number) => {
    return (Math.floor((count / sum) * 1000) / 10).toFixed(1) + "%";
  };

  type Props = {
    value: string;
    types: Types[];
  };
  const TabPanelList = ({ value, types }: Props) => {
    let sum = 0;
    for (let i = 0; i < types.length; i++) {
      sum += types[i].count;
    }

    return (
      <TabPanel value={value} sx={{ padding: 0 }}>
        <List sx={{ height: 200, overflow: "auto" }}>
          {types.map((type, index) => (
            <React.Fragment key={type.name}>
              <RankByTypes
                name={type.name}
                percentage={getPercentage(type.count, sum)}
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
            maxWidth: { xs: 375, sm: 480 },
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
        {!loading ? (
          <>
            <TabPanelList value="moves" types={details[pokemon].moves} />
            <TabPanelList value="items" types={details[pokemon].items} />
            <TabPanelList value="abilities" types={details[pokemon].ablities} />
            <TabPanelList value="natures" types={details[pokemon].natures} />
            <TabPanelList
              value="terastals"
              types={details[pokemon].terastals}
            />
          </>
        ) : (
          <TabPanel value={value} sx={{ padding: 0 }}>
            <List sx={{ height: 200, overflow: "auto" }}>
              {[1, 2, 3, 4].map((i) => (
                <ListItem
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  key={i}>
                  <Typography variant="h6" sx={{ width: "20%" }}>
                    {i}.
                  </Typography>
                  <Typography
                    sx={{ width: "70%" }}
                    onClick={() => setLoading(false)}>
                    -------------
                  </Typography>
                  <Typography sx={{ width: "10%" }}>0.0%</Typography>
                </ListItem>
              ))}
            </List>
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default PokeDetailTab;
