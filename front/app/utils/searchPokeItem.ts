import { getSeriesData } from "./getSeriesData";
type SearchPokeItem = {
  pokemon: string;
  item?: string;
  series: string;
  format: "single" | "double";
};

type ShowLists = {
  nature: string;
  effortValue: string;
  url: string;
};

type SearchResult = {
  [item: string]: ShowLists[];
};

export const searchPokeItem = async ({
  pokemon,
  item,
  series,
  format,
}: SearchPokeItem) => {
  const articles = await getSeriesData(format, "series" + series);

  const searchResult: SearchResult = {};
  const uniqueHash: { [key: string]: number } = {};

  for (let article of articles) {
    for (let party of article.party) {
      if (party.pokemon !== pokemon) {
        continue;
      }

      // TODO: 直す

      if (party.item !== item && item !== undefined && item.length !== 0) {
        continue;
      }

      const effortValue = party.effortValues.join("-");

      const key = party.item + party.nature + effortValue;

      if (uniqueHash[key] === undefined) {
        uniqueHash[key] = 1;
        const hash = {
          nature: party.nature,
          url: article.url,
          effortValue: effortValue,
        };
        searchResult[party.item] =
          searchResult[party.item] === undefined
            ? [hash]
            : [...searchResult[party.item], hash];
      }
    }
  }

  Object.keys(searchResult).map((key) => {
    searchResult[key] = searchResult[key].sort((a, b) =>
      a.nature > b.nature ? 1 : -1
    );
  });


  return searchResult;
};
