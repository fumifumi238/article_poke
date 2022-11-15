import pokeData from "../json/poke_data.json";

export const changeIcon = (poke: string | undefined) => {
  if (poke !== undefined && poke !== "") {
    return `icon/Pokémon-Icon_${pokeData[poke].no
      .toString()
      .padStart(3, "0")}.png`;
  }

  return "ball/pokemonball.png";
};
