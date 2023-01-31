import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import differentFormPokemons from "../../json/differentFormPokemons.json";

const FormWarning = () => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontSize: "24px", fontWeight: "bold", margin: 1 }}>
        フォルム違いについて
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        検索欄では、フォルムの違うポケモンは同じポケモンとして扱います。
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        例えば、「ニャース」と入力すると「ニャース」、「ニャース(ガラル)」、「ニャース(アローラ)」が検索されます。
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        「ニャース(ガラル)」を検索したい場合は、「ニャース(ガラル)」と入力してください。
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        また、「ニャース」(通常のフォルム)のみを検索する方法はありませんのでご了承ください。
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        以下のリストは、左が入力する文字、右が入力した際に出る候補です。
      </Typography>

      {Object.keys(differentFormPokemons).map((pokemon) => (
        <Box key={pokemon} sx={{ marginY: 1 }}>
          <Typography>
            <span style={{ color: "green" }}>{pokemon}</span>: [
            <span style={{ color: "skyblue" }}>
              {differentFormPokemons[pokemon].join("、")}
            </span>
            ]
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default FormWarning;
