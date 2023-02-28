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
    twitter: "takasan1005/status/1627548541379039233",
    article: "https://hokkesan.hatenablog.jp/entry/2023/02/20/145902",
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
  {
    tn: "ソーネチカ",
    twitter: "Sonechka_poke/status/1627961367805456384",
    article: "https://sonechika.hatenablog.com/entry/2023/02/21/181645",
    rentalCode: "QPL085",
    party: [
      { pokemon: "ヤミラミ", item: "ひかりのねんど", terastal: "フェアリー" },
      { pokemon: "サーフゴー", item: "ゴツゴツメット", terastal: "ひこう" },
      { pokemon: "ハバタクカミ", item: "こだわりメガネ", terastal: "ノーマル" },
      { pokemon: "コノヨザル", item: "たべのこし", terastal: "ほのお" },
      {
        pokemon: "ソウブレイズ",
        item: "きあいのタスキ",
        terastal: "フェアリー",
      },
      { pokemon: "ラウドボーン", item: "おんみつマント", terastal: "みず" },
    ],
  },
  {
    tn: "Spicies",
    twitter: "nogizaka_loony/status/1627304874278019072",
    article: "https://note.com/spicies_/n/n98daaa850f90",
    rentalCode: "SYB07S",
    party: [
      { pokemon: "テツノブジン", item: "きあいのタスキ", terastal: "ゴースト" },
      { pokemon: "カイリュー", item: "するどいくちばし", terastal: "ひこう" },
      { pokemon: "ドドゲザン", item: "とつげきチョッキ", terastal: "あく" },
      { pokemon: "セグレイブ", item: "いかさまダイス", terastal: "じめん" },
      {
        pokemon: "ハバタクカミ",
        item: "こだわりメガネ",
        terastal: "フェアリー",
      },
      { pokemon: "サーフゴー", item: "おんみつマント", terastal: "ノーマル" },
    ],
  },
  {
    tn: "らいず",
    twitter: "Rizapu_pu/status/1628014736133746691",
    article: "https://rise1525.hatenablog.com/entry/2023/02/21/215040",
    rentalCode: "QN78WP",
    party: [
      { pokemon: "セグレイブ", item: "いのちのたま", terastal: "はがね" },
      { pokemon: "ハバタクカミ", item: "こだわりメガネ", terastal: "ほのお" },
      { pokemon: "ヘイラッシャ", item: "オボンのみ", terastal: "じめん" },
      { pokemon: "キョジオーン", item: "たべのこし", terastal: "はがね" },
      { pokemon: "コノヨザル", item: "きあいのタスキ", terastal: "じめん" },
      { pokemon: "マリルリ", item: "とつげきチョッキ", terastal: "ほのお" },
    ],
  },
  {
    tn: "勇者ヒエン",
    twitter: "HERO_Greninja/status/1627593581514088454",
    article: "https://gekkoug-hh.hatenablog.com/entry/2023/02/20/175752",
    rentalCode: "FP8GDJ",
    party: [
      { pokemon: "セグレイブ", item: "とつげきチョッキ", terastal: "でんき" },
      { pokemon: "ハバタクカミ", item: "ブーストエナジー", terastal: "ほのお" },
      { pokemon: "ヘイラッシャ", item: "たべのこし", terastal: "はがね" },
      { pokemon: "マスカーニャ", item: "きあいのタスキ", terastal: "くさ" },
      { pokemon: "カイリュー", item: "ゴツゴツメット", terastal: "はがね" },
      { pokemon: "サーフゴー", item: "こだわりスカーフ", terastal: "はがね" },
    ],
  },
];
