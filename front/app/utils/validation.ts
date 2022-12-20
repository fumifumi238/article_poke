type PokeDetails = {
  pokemon: string;
  item: string;
  ability: string;
  moves: string[];
  baseStats: number[];
  effortValues: number[];
  nature: string;
  terastal: string;
};

export const checkPokemons = (pokeDetails: PokeDetails[]): string[] => {
  const pokemonErrors = new Set<string>();
  for (let pokeDetail of pokeDetails) {
    if (pokeDetail.pokemon === "") {
      pokemonErrors.add("ポケモンは6匹登録してください。");
    }

    const movesCount = {};

    for (let move of pokeDetail.moves) {
      if (movesCount[move] !== undefined) {
        movesCount[move] += 1;
      } else {
        movesCount[move] = 1;
      }
    }

    for (let [key, value] of Object.entries(movesCount)) {
      if (key === "" && value === 4) {
        pokemonErrors.add("1つ以上のわざを入力してください。");
      }

      if (value > 1 && key !== "") {
        pokemonErrors.add("同じわざは登録できません。");
      }
    }
  }

  return Array.from(pokemonErrors);
};
