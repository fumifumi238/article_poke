import pokeData from "../json/poke_data.json";

export const officialPokeIcon = (poke: string | undefined) => {

  if (pokeData[poke] !== undefined) {
    return `/image/official_arts/${pokeData[poke].officialArtNo.padStart(
      4,
      "0"
    )}.png`;
  }

  return "/image/ball/pokemonball.png";
};
