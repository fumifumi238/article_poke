import pokeData from "../json/poke_data.json";

export const changeIcon = (poke: string | undefined) => {
  if (pokeData[poke] !== undefined) {
    if (pokeData[poke].no.match(/^[0-9]+$/)) {
      return `icon/Pokémon-Icon_${pokeData[poke].no.padStart(3, "0")}.png`;
    }

    return `icon/Pokémon-Icon_${pokeData[poke].no.padStart(4, "0")}.png`;
  }

  return "ball/pokemonball.png";
};
