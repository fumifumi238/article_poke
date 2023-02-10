import pokeData from "../poke_data.json";
import ItemsData from "../items.json";
import TypesData from "../types.json";

type Pokemons = keyof typeof pokeData;
type Items = keyof typeof ItemsData;
type Types = keyof typeof TypesData;

type Party = {
  pokemon: Pokemons;
  item: Items;
  terastal: Types;
  nature?: string;
  moves?: [string, string, string, string];
  effortValue?: [number, number, number, number, number, number];
  individualValue?: [number, number, number, number, number, number];
};

type Rental = {
  tn: string;
  twitter?: string;
  article?: string;
  rentalCode: string;
  party: [Party, Party, Party, Party, Party, Party];
};

export const rentalSeason3: Rental[] = [
  {
    tn: "スカーレット",
    twitter: "poke_ranker",
    rentalCode: "A51BC2",
    party: [
      { pokemon: "テツノカイナ", item: "こだわりハチマキ", terastal: "ほのお" },
      { pokemon: "トドロクツキ", item: "こだわりスカーフ", terastal: "ほのお" },
      { pokemon: "サケブシッポ", item: "たべのこし", terastal: "フェアリー" },
      { pokemon: "テツノブジン", item: "ブーストエナジー", terastal: "みず" },
      {
        pokemon: "ハバタクカミ",
        item: "きあいのタスキ",
        terastal: "フェアリー",
      },
      { pokemon: "テツノイバラ", item: "ゴツゴツメット", terastal: "ほのお" },
    ],
  },
  {
    tn: "バイオレット",
    twitter: "poke_ranker",
    rentalCode: "1AB5C6",
    party: [
      { pokemon: "テツノツツミ", item: "こだわりハチマキ", terastal: "ほのお" },
      { pokemon: "テツノドクガ", item: "こだわりスカーフ", terastal: "ほのお" },
      { pokemon: "アラブルタケ", item: "たべのこし", terastal: "フェアリー" },
      { pokemon: "テツノワダチ", item: "ブーストエナジー", terastal: "みず" },
      {
        pokemon: "スナノケガワ",
        item: "きあいのタスキ",
        terastal: "フェアリー",
      },
      { pokemon: "チヲハウハネ", item: "ゴツゴツメット", terastal: "ほのお" },
    ],
  },
];