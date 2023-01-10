import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Permit = () => {
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    if (
      router.isReady &&
      String(query?.password) === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      const getData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/articles/not_permit_articles`
        );
        const data = (await res.json()) as Article[];
        setArticles(data);
      };

      getData();
    }
  }, [router, query]);

  const onClickPermit = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/articles/permit_article/${id}`,
      {
        method: "POST",
      }
    );

    if (res.status === 200) {
      const filterArticle = articles.filter(
        (article) => article.article.id !== id
      );
      setArticles(filterArticle);
    }
  };

  const onClickDestroy = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/articles/destroy/${id}`,
      {
        method: "POST",
      }
    );

    if (res.status === 200) {
      const filterArticle = articles.filter(
        (article) => article.article.id !== id
      );
      setArticles(filterArticle);
    }
  };
  type Party = {
    pokemon: {
      id: number;
      pokemon: string;
      item: string;
      terastal: string;
      ability: string;
      nature: string;
      article_id: number;
    };
    moves: {
      id: number;
      name: string;
      party_id: number;
    }[];
    effortValues: number[];
    individualValues: number[];
  };
  type Article = {
    article: {
      id: number;
      url: string;
      rank: string;
      rate: string;
      season: string;
      series: string;
      title: string;
      rental: string;
      format: string;
    };
    user: {
      id: number;
      name: string;
      twitter: string;
    };
    party: Party[];
  };
  const [articles, setArticles] = useState<Article[]>([]);
  return (
    <div style={{ margin: "0 auto" }}>
      {articles.map((article, index) => (
        <div key={index} style={{ border: "2px", width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <div>
              <p>
                id: {article.article.id}
                format: {article.article.format} <br />
                url: {article.article.url} <br />
                title: {article.article.title} <br />
                season:{article.article.season} rate:{article.article.rate}{" "}
                rank:
                {article.article.rank} rental: {article.article.rental} <br />
              </p>
            </div>
            <p>
              twitter: {article.user.twitter} <br />
              tn: {article.user.name}
            </p>
            {article.party.map((p, index) => (
              <div key={index}>
                <p>
                  {p.pokemon.pokemon}@{p.pokemon.item} {p.pokemon.nature}
                  <br />
                  特性:{p.pokemon.ability}
                  <br />
                  テラスタル:{p.pokemon.terastal}
                  <br />[
                  {p.moves.map((move) => (
                    <>{move.name},</>
                  ))}
                  ]
                  <br />
                  努力値:[{p.effortValues.join(",")}]
                  <br />
                  個体値:[{p.individualValues.join(",")}]
                </p>
              </div>
            ))}
            <div>
              <button
                onClick={() => onClickPermit(article.article.id)}
                style={{ marginRight: "4px" }}>
                承認する
              </button>
              <button onClick={() => onClickDestroy(article.article.id)}>
                削除する
              </button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Permit;
