import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Image from "next/image";
import getPokeDexNumber from "../../../utils/getPokeDexNumber";

const PoketetsuLink: React.FC<{ pokemon: string }> = ({ pokemon }) => {
  const baseUrl = "https://yakkun.com/sv/zukan/n";
  const pokeDexNumber = getPokeDexNumber(pokemon);

  const url = baseUrl + pokeDexNumber;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <IconButton
        color="primary"
        aria-label="link to poketetsu"
        component="label"
        sx={{ padding: 0 }}>
        <Image
          src="/image/poketetsu/poketetsu.png"
          width={25}
          height={25}
          alt={""}
        />
      </IconButton>
    </Link>
  );
};

export default PoketetsuLink;
