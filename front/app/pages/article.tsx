import { NextPage } from "next";
import { useEffect, useState } from "react";
import { postData } from "../lib/api/client";

const Article: NextPage = () => {
  type Article = {
    id: number;
    name: string;
    twitter: string;
    url: string;
    rate: number;
    rank: number;
    season: number;
    series: number;
  };
  const [url, setUrl] = useState<string>("");
  const [articles, setArticle] = useState<Article[]>([]);
  const [name, setName] = useState<string>("my_name");
  const [twitter, setTwitter] = useState<string>("sample_app");
  const [series, setSeries] = useState<string>("1");
  const [season, setSeason] = useState<string>("1");
  const [rank, setRank] = useState<string>("");
  const [rate, setRate] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/articles/index");
      const data = await res.json();
      setArticle(data);
    };
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData("/articles/create", {
      name: name,
      twitter: twitter,
      url: url,
      rate: rate,
      rank: rank,
      season: season,
      series: series,
    });
    const data = await res;
    if (data.status !== 200) {
      console.log(data.message);
    } else {
      console.log("成功しました。");
    }
  };
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <div key={article.id}>
            <li>
              <p>id:{article.id}</p>
              <p>name:{article.name}</p>
              <p>twitter:{article.twitter}</p>
              <p>url:{article.url}</p>
              <p>rate:{article.rate}</p>
              <p>rank:{article.rank}</p>
            </li>
          </div>
        ))}
      </ul>

      <form onSubmit={(e) => handleSubmit(e)}>
        name:
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        twitter: @
        <input
          type="text"
          value={twitter}
          name="twitter"
          onChange={(e) => {
            setTwitter(e.target.value);
          }}
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          name="twitter"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        series:
        <input
          type="text"
          name="series"
          inputMode="numeric"
          value={series}
          onChange={(e) => {
            setSeries(e.target.value);
          }}
        />
        <br />
        rank:
        <input
          type="text"
          value={rank}
          inputMode="numeric"
          name="rank"
          onChange={(e) => {
            setRank(e.target.value);
          }}
        />
        <br />
        rate:
        <input
          type="text"
          name="rate"
          inputMode="numeric"
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        />
        <br />
        season:
        <input
          type="text"
          name="season"
          inputMode="numeric"
          value={season}
          onChange={(e) => {
            setSeason(e.target.value);
          }}
        />
        <br />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Article;
