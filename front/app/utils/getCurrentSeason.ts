import seriesData from "../json/series.json";

export const getCurrentSeason = () => {
  const series = Object.keys(seriesData);
  const currentSeries = series[series.length - 1];
  const seasons = seriesData[currentSeries];
  const currentSeason = seasons[seasons.length - 1];

  return { currentSeries, currentSeason };
};
