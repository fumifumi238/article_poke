import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

const About = () => {
  const [deviseWidth, setDeviseWidth] = useState<number>(0);
  useEffect(() => {
    setDeviseWidth(window.innerWidth);
  }, []);
  return (
    <div>
      <NextSeo
        title="Poke Ranker | 利用規約"
        description="当サイトの利用規約です。"
      />
      <h1 style={{ textAlign: "center" }}>利用規約</h1>
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          minWidth: 360,
          padding: "5px",
          border: "2px solid",
        }}>
        <h2 style={{ textAlign: "center" }}>注意事項</h2>
        <h3>・禁止事項</h3>
        <p style={{ color: "red" }}>
          1.
          不正なアクセスやプログラム、スクレイビングなどの、サーバーに負担をかける行為
        </p>
        <p style={{ color: "red" }}>2. 不適切な内容や、URLの投稿</p>
        <p>
          上記の内容の禁止事項に該当した場合、アクセス拒否、IPアドレスの公開、警察庁サイバー犯罪対策への通報などを行う事があります。
        </p>

        <h3>・その他</h3>
        <div>
          <p>
            わざ、もちものなどのデータ、使用率などの情報がほしい場合は運営までご連絡ください。
            <br />
            内容によっては対応させていただきます。
          </p>
          <p>
            当サイトを用いて行った集計データを用いる際は、 <br />
            <strong> Twitter(@poke_ranker)、</strong>
            <br />
            <strong> url(https://poke-ranker.netlify.app)</strong>
            <br />
            を明記してください。
          </p>
        </div>
        <div style={{ margin: "2px" }}>
          <p style={{ margin: 0 }}> 削除依頼や、ご意見があるかたは</p>
          <h3 style={{ margin: 0 }}> mail: pokeranker723@gmail.com</h3>
          <h3 style={{ margin: 0 }}>Twitter: @poke_ranker</h3>
          <p style={{ margin: 0 }}>までご連絡ください。</p>
        </div>
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "50%",
          minWidth: 360,
          marginTop: "10px",
        }}>
        <h3> 参考にさせていただいたサイト(敬称略) </h3>
        <p> アイテムやポケモンの画像</p>
        <h4>
          PokeWiki{" "}
          <a
            href="https://www.pokewiki.de"
            target="_blank"
            rel="noopener noreferrer">
            (https://www.pokewiki.de)
          </a>{" "}
          <br />
          Serebii net
          <a
            href="https://www.serebii.net"
            target="_blank"
            rel="noopener noreferrer">
            (https://www.serebii.net)
          </a>
        </h4>
        <p>ポケモンのデータ、及びポケモン詳細のリンク</p>
        <h4>
          ポケモン徹底攻略
          <a
            href="https://yakkun.com"
            target="_blank"
            rel="noopener noreferrer">
            {" "}
            (https://yakkun.com)
          </a>
        </h4>
        <p>ダブルバトルの構築記事のリンク</p>
        <h4>
          リバティノート
          <a
            href="https://liberty-note.com"
            target="_blank"
            rel="noopener noreferrer">
            {" "}
            (https://liberty-note.com)
          </a>
        </h4>
      </div>
      {deviseWidth < 600 ? (
        <div
          style={{
            margin: "0 5px 0 auto",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}>
          <p>
            Contact: <br /> <strong>mail:</strong> pokeranker723@gmail.com
          </p>
          <p style={{ margin: 0 }}>
            <strong>Twitter:</strong> @poke_ranker
          </p>
        </div>
      ) : (
        <div
          style={{
            margin: "0 5px 0 auto",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
          <h4 style={{ paddingRight: "10px" }}>Contact:</h4>
          <br />

          <p style={{ paddingRight: "10px" }}>
            {" "}
            <strong>mail:</strong> pokeranker723@gmail.com
          </p>
          <p style={{ paddingRight: "10px" }}>
            <strong>Twitter:</strong> @poke_ranker
          </p>
        </div>
      )}
    </div>
  );
};

export default About;
