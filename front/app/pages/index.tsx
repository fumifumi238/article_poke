import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Rule from "../components/templates/Rule";

type Format = "single" | "double";

const Home: NextPage = () => {
  const router = useRouter();

  const redirectToArticle = (format: Format = "single") => {
    router.push(`/article?format=${format}?series=1`);
  };

  return (
    <>
      <div>
        {/* <Rule series="2" /> */}
        <Rule series="1" />
        <Box>
          <Typography>機能一覧</Typography>
          <Box>
            <Typography>型検索</Typography>
            <Typography>
              ポケモン名を入力することで、そのポケモンの努力値と持ち物、性格の一覧が見れます。
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};


export default Home;
