import pokeData from "../json/poke_data.json";

const getPokeDexNumber = (pokemon: string): number => {
  const pokeDexNumber: number = pokeData[pokemon].no ? pokeData[pokemon].no : 1;

  return pokeDexNumber;
};

export default getPokeDexNumber;
