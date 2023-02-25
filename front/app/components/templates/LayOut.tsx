import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useState } from "react";
import MenuDrawer from "../organisms/MenuDrawer";

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}>
          <MenuDrawer setDrawerOpen={setDrawerOpen} />
        </Drawer>
        <Box
          sx={{
            height: "8vh",
            background: "grey",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <NextLink href={`/`}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "fantasy",
                  marginX: 2,
                }}>
                Poke Ranker
              </Typography>
              <CatchingPokemonIcon />
            </Box>
          </NextLink>
          <Box sx={{ marginRight: 2 }}>
            <DehazeIcon
              sx={{ height: "5vh", width: "5vh", marginTop: 1 }}
              onClick={() => setDrawerOpen(true)}
            />
          </Box>
        </Box>
      </Box>
      <div>{children}</div>
    </>
  );
}
