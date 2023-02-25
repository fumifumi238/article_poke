import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type PageInfo = {
  value: string;
  url: string;
  imageSrc: string;
  discriptions: string[];
  icon: ReactNode;
};

const PageInfo = ({ value, url, imageSrc, discriptions, icon }: PageInfo) => {
  const router = useRouter();

  const onClickValue = () => {
    router.push(url);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Box
        sx={{
          display: "flex",
          borderBottom: "#212F3D",
          alignItems: "center",
        }}>
        <Button sx={{ color: "darkgrey" }} onClick={onClickValue}>
          <Box sx={{ marginRight: 2 }}>{icon}</Box>
          <Typography variant="h4">{value}</Typography>
        </Button>
      </Box>
      <Box sx={{ margin: 2, display: "flex", justifyContent: "center" }}>
        <Image src={imageSrc} alt={`${value} 例`} width={400} height={400} />
      </Box>
      <Box sx={{ borderTop: "solid grey", margin: 3, paddingTop: 2 }}>
        {discriptions.map((discription) => (
          <Typography sx={{ fontWeight: 800 }} key={discription}>
            {discription}
          </Typography>
        ))}
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <NextLink href={url}>
          <Button>{value}ページを見る</Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default PageInfo;
