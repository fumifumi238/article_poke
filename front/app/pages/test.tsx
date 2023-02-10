import { useEffect } from "react";
import { Article } from "../types/articleTypes";
import { getPokemonRank, Ranking } from "../utils/getPokemonRank";
import { getSeriesData } from "../utils/getSeriesData";

const Test = (props: { articles: Article[]; ranking: Ranking }) => {
  const { articles, ranking } = props;
  useEffect(() => {
    console.log(articles, ranking);
  });
  return (
    <>
      <div>
        {Object.keys(ranking).map((pokemon) => (
          <div key={pokemon}>
            <p>
              {pokemon}: {ranking[pokemon].count}
            </p>
            {/* {Object.keys(ranking[pokemon].move).map((move) => (
              <p key={move}>
                {move}:{ranking[pokemon].move[move]}
              </p>
            ))} */}
          </div>
        ))}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const articles = await getSeriesData("single", "series1");

  const ranking = getPokemonRank(articles);

  articles.sort((a, b) => a.rank - b.rank);

  return {
    props: {
      articles,
      ranking,
    },
  };
};

export default Test;
