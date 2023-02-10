import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import seriesData from "../../json/series.json";
import { Article } from "../../types/articleTypes";
import { getSeriesData } from "../../utils/getSeriesData";
import Image from "next/image";
import Box from "@mui/material/Box";
import { getItemIcon } from "../../utils/getItemIcon";
import { changeIcon } from "../../utils/changeIcon";
import { typesData } from "../../utils/data/types";

type PathParams = {
  format: string;
  series: string;
};

// ページコンポーネントに渡される props の型
// (Note) ページコンポーネント用の props であることを意識するために、
// 一般的な Props ではなく、PageProps という名前にしています。
type PageProps = {
  articles: Article[];
};

// 事前生成するページのパス（URL のパラメータ部分）のリストを返します。
// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  // /books/001、/books/002、/books/003 のページを事前生成するには、
  // 次のように paths プロパティの値を設定して返します。
  // 本来は id のリストを外部 API（getBookList など）で取得します。

  const paths: { params: PathParams }[] = [];
  for (let series of Object.keys(seriesData)) {
    paths.push({ params: { format: "single", series: `series${series}` } });
    paths.push({ params: { format: "double", series: `series${series}` } });
  }

  return {
    paths: paths,
    fallback: false, // 上記以外のパスでアクセスした場合は 404 ページにする
  };
};

// URL のパラメータ情報（プレースホルダー部分に指定された値）をもとに、
// ページコンポーネントに渡す props データを生成します。
// context.params プロパティでこれらのパラメータを参照できるので、
// その値に応じて props データを生成して返すように実装します。
// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  // ファイル名が [id].tsx なので id パラメーターを取り出すことができる
  const { format, series } = context.params as PathParams;

  // 本来はここで getBook(id) のように API を呼び出してデータを取得する

  const articles: Article[] = await getSeriesData(format, series);

  const props: PageProps = {
    articles: articles,
  };

  // ページコンポーネントに渡す PageProps オブジェクトを
  // props プロパティに設定したオブジェクトを返す
  return { props };
};

const Series = ({ articles }: PageProps) => {
  useEffect(() => {
    console.log(articles);
  });
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <div key={article.url}>
            <li>タイトル: {article.url}</li>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {article.party?.map((poke, index) => (
                <Box key={index} sx={{ position: "relative", width: 50 }}>
                  <Box sx={{ position: "relative", zindex: 0 }}>
                    <Image
                      src={`/image/${changeIcon(poke.pokemon)}`}
                      alt={poke.pokemon}
                      height={40}
                      width={40}></Image>
                  </Box>
                  <Box
                    sx={{ position: "absolute", zindex: 1, left: 25, top: 25 }}>
                    <Image
                      src={getItemIcon(poke.item)}
                      alt={poke.item}
                      height={20}
                      width={20}></Image>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      zindex: 1,
                      left: -10,
                      top: -15,
                    }}>
                    <Image
                      src={`/image/teraIcon/${typesData[poke.terastal]}.png`}
                      alt={typesData[poke.terastal]}
                      height={20}
                      width={20}></Image>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Series;
