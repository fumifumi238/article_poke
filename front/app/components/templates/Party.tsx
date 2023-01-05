import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getData } from "../../lib/api/fetchApi";
import PartyInfo from "../organisms/PartyInfo";

type Party = {
  id: number;
  setModalOpen: Dispatch<SetStateAction<number>>;
};

type Pokemon = {
  id: number;
  pokemon: string;
  item: string;
  ability: string;
  nature: string;
  terastal: string;
  moves: string[];
  effortValues: number[];
  individualValues: number[];
};
const Party = ({ id, setModalOpen }: Party) => {
  const [parties, setParties] = useState<Pokemon[]>([]);
  useEffect(() => {
    const getParty = async () => {
      const params = { id: id };
      const data = await getData("/parties/get_party_by_article_id", params);
      setParties(data);
    };

    getParty();
  }, [id]);
  return (
    <>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
        }}>
        <Box
          onClick={() => setModalOpen(0)}
          sx={{
            display: "flex",
            textAlign: "center",
            width: "100%",
            flexWrap: "wrap",
            height: "80vh",
            maxHeight: 600,
            overflow: "scroll",
          }}>
          {parties.map((party) => (
            <Box sx={{ width: "50%" }} key={party.id}>
              <PartyInfo party={party} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Party;
