export type PokeTypes = typeof pokeTypes[number];

const pokeTypes = [
  "ノーマル",
  "ほのお",
  "みず",
  "くさ",
  "でんき",
  "こおり",
  "かくとう",
  "どく",
  "じめん",
  "ひこう",
  "エスパー",
  "むし",
  "いわ",
  "ゴースト",
  "ドラゴン",
  "あく",
  "はがね",
  "フェアリー",
] as const;
