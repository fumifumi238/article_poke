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
    tn: "シグマ",
    twitter: "zenchino115",
    rentalCode: "QFHH8G",
    party: [
      { pokemon: "トドロクツキ", item: "ゴツゴツメット", terastal: "みず" },
      { pokemon: "サーフゴー", item: "こだわりスカーフ", terastal: "はがね" },
      { pokemon: "イルカマン", item: "とつげきチョッキ", terastal: "かくとう" },
      { pokemon: "テツノブジン", item: "ブーストエナジー", terastal: "じめん" },
      {
        pokemon: "ブロロローム",
        item: "たべのこし",
        terastal: "はがね",
      },
      { pokemon: "ロトム(ヒート)", item: "オボンのみ", terastal: "フェアリー" },
    ],
  },
  {
    tn: "シグマ",
    twitter: "zenchino115",
    rentalCode: "05YHBB",
    party: [
      { pokemon: "トドロクツキ", item: "ブーストエナジー", terastal: "ひこう" },
      { pokemon: "サーフゴー", item: "おんみつマント", terastal: "ひこう" },
      { pokemon: "ミミズズ", item: "オボンのみ", terastal: "じめん" },
      { pokemon: "イルカマン", item: "こだわりハチマキ", terastal: "みず" },
      {
        pokemon: "ラウドボーン",
        item: "たべのこし",
        terastal: "ノーマル",
      },
      { pokemon: "ハラバリー", item: "とつげきチョッキ", terastal: "でんき" },
    ],
  },
  {
    tn: "破滅",
    twitter: "hametu_shame",
    rentalCode: "3NVCJG",
    party: [
      { pokemon: "コノヨザル", item: "オボンのみ", terastal: "ひこう" },
      { pokemon: "カイリュー", item: "ゴツゴツメット", terastal: "フェアリー" },
      { pokemon: "テツノツツミ", item: "こだわりメガネ", terastal: "みず" },
      { pokemon: "サーフゴー", item: "おんみつマント", terastal: "ひこう" },
      {
        pokemon: "キノガッサ",
        item: "きあいのタスキ",
        terastal: "じめん",
      },
      { pokemon: "キョジオーン", item: "たべのこし", terastal: "ひこう" },
    ],
  },
  {
    tn: "ほっけ",
    twitter: "takasan1005",
    rentalCode: "K8H972",
    party: [
      { pokemon: "トドロクツキ", item: "ブーストエナジー", terastal: "ひこう" },
      { pokemon: "サーフゴー", item: "おんみつマント", terastal: "かくとう" },
      { pokemon: "テツノツツミ", item: "とけないこおり", terastal: "じめん" },
      { pokemon: "ミミッキュ", item: "いのちのたま", terastal: "フェアリー" },
      {
        pokemon: "コノヨザル",
        item: "オボンのみ",
        terastal: "ノーマル",
      },
      { pokemon: "カイリュー", item: "じゃくてんほけん", terastal: "みず" },
    ],
  },
];
