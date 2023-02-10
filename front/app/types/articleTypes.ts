import itemsData from "../json/items.json";
import pokeData from "../json/poke_data.json";
import ability from "../json/ability.json";
import nature from "../json/nature.json";
import typesData from "../json/types.json";

type Party = {
  id: number;
  pokemon: keyof typeof pokeData;
  item: keyof typeof itemsData | "";
  ability: keyof typeof ability;
  nature: keyof typeof nature;
  terastal: keyof typeof typesData;
  moves: [string, ...string[]];
  effortValues: [number, number, number, number, number, number, number];
  individualValues: [number, number, number, number, number, number];
};

type DefaultArticle = {
  tn: string;
  twitter?: string | null;
  url: string;
  title: string;
  rate?: number | null;
  rank?: number | null;
  season: number;
  rental?: string | null;
  party: [Party, Party, Party, Party, Party, Party];
};

export type Double = DefaultArticle & { format: "double" };

export type Single = DefaultArticle & { format: "single" };

export type Article = DefaultArticle &   {format: "single"| "double"};
