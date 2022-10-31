import { NextPage } from "next";
import { useState } from "react";
import { postData } from "../lib/api/client";

const Form: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("my_name");
  const [twitter, setTwitter] = useState<string>("sample_app");
  const [series, setSeries] = useState<string>("1");
  const [season, setSeason] = useState<string>("1");
  const [rank, setRank] = useState<string>("");
  const [rate, setRate] = useState<string>("");

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
    <>
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
    </>
  );
};

export default Form;
