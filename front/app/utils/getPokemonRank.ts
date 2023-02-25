import { Article } from "../types/articleTypes";


export type Ranking = {
  [pokemon: string]: {
    count: number;
    item: { [key: string]: number };
    terastal: { [key: string]: number };
    move: { [key: string]: number };
    ability: { [key: string]: number };
    nature: { [key: string]: number };
  };
};

export const getPokemonRank = (articles: Article[]) => {
  const addParams = (
    params: { [key: string]: number },
    value: string | string[]
  ) => {
    if (typeof value === "string") {
      params[value] = params[value] !== undefined ? params[value] + 1 : 1;
      return params;
    }

    for (let i = 0; i < value.length; i++) {
      params[value[i]] =
        params[value[i]] !== undefined ? params[value[i]] + 1 : 1;
    }

    return params;
  };
  const ranking: Ranking = {};
  articles.forEach((article) => {
    for (let party of article.party) {
      if (ranking[party.pokemon] !== undefined) {
        ranking[party.pokemon] = {
          count: ranking[party.pokemon].count + 1,
          item: addParams(ranking[party.pokemon].item, party.item),
          terastal: addParams(ranking[party.pokemon].terastal, party.terastal),
          move: addParams(ranking[party.pokemon].move, party.moves),
          ability: addParams(ranking[party.pokemon].ability, party.ability),
          nature: addParams(ranking[party.pokemon].nature, party.nature),
        };
      } else {
        ranking[party.pokemon] = {
          count: 1,
          item: { [party.item]: 1 },
          terastal: { [party.terastal]: 1 },
          move: {},
          ability: { [party.ability]: 1 },
          nature: { [party.nature]: 1 },
        };

        for (let i = 0; i < party.moves.length; i++) {
          ranking[party.pokemon]["move"][party.moves[i]] = 1;
        }
      }
    }
  });

  //キーを含んだ配列に変換 オブジェクト⇒配列
  let rankToArray = Object.keys(ranking).map((k) => ({
    key: k,
    value: ranking[k],
  }));

  //値段順
  rankToArray.sort((a, b) => b.value.count - a.value.count);

  //配列⇒オブジェクト　で元に戻す
  let rankToHash: Ranking = Object.assign(
    {},
    ...rankToArray.map((item) => ({
      [item.key]: item.value,
    }))
  );

  const orderByDesc = (values: { [key: string]: number }) => {
    let rankToArray = Object.keys(values).map((k) => ({
      key: k,
      value: values[k],
    }));

    // カウント順
    rankToArray.sort((a, b) => b.value - a.value);

    //配列⇒オブジェクト　で元に戻す
    let rankToHash: { [key: string]: number } = Object.assign(
      {},
      ...rankToArray.map((item) => ({
        [item.key]: item.value,
      }))
    );

    return rankToHash;
  };

  const hash: Ranking = {};
  for (let key of Object.keys(rankToHash)) {
    let pokemon = rankToHash[key];
    pokemon = {
      count: pokemon.count,
      item: orderByDesc(pokemon.item),
      ability: orderByDesc(pokemon.ability),
      terastal: orderByDesc(pokemon.terastal),
      nature: orderByDesc(pokemon.nature),
      move: orderByDesc(pokemon.move),
    };

    hash[key] = pokemon;
  }

  return hash;
};
