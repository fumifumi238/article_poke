import React, { useEffect, useState } from "react";

const Permit = ({}) => {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "http://localhost:3000/articles/not_permit_articles"
      );
      const data = await res.json();
      console.log(data);
      setArticles(data);
    };

    getData();
  }, []);

  const onClickPermit = async (id: number) => {
    const res = await fetch(
      `http://localhost:3000/articles/permit_article/${id}`,
      {
        method: "POST",
      }
    );

    if (res.status === 200) {
      const filterArticle = articles.filter((article) => article.id !== id);
      setArticles(filterArticle);
    }
  };

  const onClickDestroy = async (id: number) => {
    const res = await fetch(`http://localhost:3000/articles/destroy/${id}`, {
      method: "POST",
    });

    if (res.status === 200) {
      const filterArticle = articles.filter((article) => article.id !== id);
      setArticles(filterArticle);
    }
  };
  const [articles, setArticles] = useState([]);
  return (
    <div style={{ margin: "0 auto" }}>
      {articles.map((article) => (
        <div key={article.id} style={{ border: "2px", width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <p>
              format: {article.format} <br />
              url: {article.url} <br />
              title: {article.title} <br />
              season:{article.season} rate:{article.rate} rank:{article.rank}{" "}
              <br />
              rental: {article.rental} <br />
              twitter: {article.twitter} <br />
              tn: {article.tn}
            </p>
            {article.party.map((pokemon) => (
              <div key={pokemon.id}>
                <p>
                  {pokemon.pokemon}@{pokemon.item} {pokemon.nature}
                  <br />
                  特性:{pokemon.ability}
                  <br />
                  テラスタル:{pokemon.terastal}
                  <br />[{pokemon.moves.join(",")}]
                  <br />
                  努力値:[{pokemon.effortValues.join(",")}]
                  <br />
                  個体値:[{pokemon.individualValues.join(",")}]
                </p>
              </div>
            ))}
            <div>
              <button
                onClick={() => onClickPermit(article.id)}
                style={{ marginRight: "4px" }}>
                承認する
              </button>
              <button onClick={() => onClickDestroy(article.id)}>
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

export async function getServerSideProps({ query }) {
  console.log(query.password);

  const password = query.password;

  if (password !== process.env.PASSWORD) {
    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: "/", // リダイレクト先
        // destination: 'https://example.com/' // 別サイトでも指定可能
      },
    };
  }

  return {
    props: {},
  };
}
export default Permit;
