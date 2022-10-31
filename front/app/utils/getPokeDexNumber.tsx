import pokeData from "../json/poke_data.json";

const getPokeDexNumber = (pokemon: string): number => {
  const pokeDexNumber: number = pokeData[pokemon].no;

  return pokeDexNumber;
};

export default getPokeDexNumber;
