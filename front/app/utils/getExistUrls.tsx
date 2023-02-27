import { Article } from "../types/articleTypes";
import seriesData from "../json/series.json";

export const getExistUrls = async () => {
  const urls: string[] = [];
  const series = Object.keys(seriesData);
  const format = ["single", "double"];
  type Data = {
    default: Article[];
  };

  for (let currentSeries of series) {
    for (let currentFormat of format) {
      let data: Data = await import(
        `../data/sv/${currentFormat}/series${currentSeries}`
      );

      for (let article of data.default) {
        urls.push(article.url);
      }
    }
  }
  return urls;
};
