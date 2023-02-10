import { Article } from "../types/articleTypes";

export const getSeriesData = async (format: string, series: string) => {
  type Data = {
    default: Article[];
  };
  let data: Data = await import(`../data/sv/${format}/${series}`);
  return data.default;
};
