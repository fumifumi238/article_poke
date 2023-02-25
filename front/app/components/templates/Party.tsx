import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PartyInfo from "../organisms/PartyInfo";
import type { Party as PartyType } from "../../types/articleTypes";

type PartyProps = {
  party: PartyType[];
  setModalOpen: Dispatch<SetStateAction<number>>;
};

const Party = ({ party, setModalOpen }: PartyProps) => {
  const [parties, setParties] = useState<PartyType[]>([]);
  useEffect(() => {
    setParties(party);
  }, [party]);
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
          onClick={() => setModalOpen(-1)}
          sx={{
            display: "flex",
            textAlign: "center",
            width: "100%",
            flexWrap: "wrap",
            height: "90vh",
            overflow: "scroll",
          }}>
          {parties.map((partyInfo) => (
            <Box sx={{ width: "50%" }} key={partyInfo.id}>
              <PartyInfo party={partyInfo} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Party;
