import { getSeriesData } from "./getSeriesData";
import seriesData from "../json/series.json";
import { Article } from "../types/articleTypes";

export const searchByTwitter = async (id: string) => {
  const formats = ["single", "double"];
  const results: Article[] = [];
  Object.keys(seriesData).map((series) => {
    formats.map(async (format) => {
      const data = await getSeriesData(format, "series" + series);
      const dataWitdhId = data.filter((d) => d.twitter === id);
      results.push(...dataWitdhId);
    });
  });

  return results;
};
