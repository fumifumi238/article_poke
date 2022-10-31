import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Image from "next/image";
import addform from "../../../utils/addForm";
import getPokeDexNumber from "../../../utils/getPokeDexNumber";

const PoketetsuLink: React.FC<{ pokemon: string }> = ({ pokemon }) => {
  const baseUrl = "https://yakkun.com/swsh/zukan/n";
  const pokeDexNumber = getPokeDexNumber(pokemon);

  const form = pokemon.match(/\(/) ? "" : addform(pokemon);

  const url = baseUrl + pokeDexNumber + form;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <IconButton
        color="primary"
        aria-label="link to poketetsu"
        component="label"
      >
        <Image src="/image/poketetsu/poketetsu.png" width={25} height={25} />
      </IconButton>
    </Link>
  );
};

export default PoketetsuLink;
