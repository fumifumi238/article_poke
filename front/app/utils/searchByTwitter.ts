import { getSeriesData } from "./getSeriesData";
import seriesData from "../json/series.json";
import { Article } from "../types/articleTypes";
import { format } from "path";

export const searchByTwitter = (id: string) => {
  const formats = ["single", "double"];
  const results: Article[] = [];
  Object.keys(seriesData).map((series) => {
    formats.map(async (format) => {
      const data = await getSeriesData(format, series);
      const dataWitdhId = data.filter((d) => d.twitter === id);
      results.push(...dataWitdhId);
    });
  });

  return results;
};
