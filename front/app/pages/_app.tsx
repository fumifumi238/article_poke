import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/templates/LayOut";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import GoogleAnalytics from "../src/components/GoogleAnalytics";
import GoogleAdsense from "../src/components/GoogleAdsense";
import usePageView from "../src/hooks/usePageView";
import { createContext, useState } from "react";
import { Article } from "../types/articleTypes";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type CashArticle = {
  [ur: string]: {
    article: Article[];
    articleIds: number[];
  };
};

type CashArticleContext = {
  cashArticle: CashArticle;
  setCashArticle: React.Dispatch<React.SetStateAction<CashArticle>>;
};

export const ArticleContext = createContext({} as CashArticleContext);

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [cashArticle, setCashArticle] = useState<CashArticle>({});

  usePageView();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,maximum-scale=1.0"
        />
        <meta
          name="google-site-verification"
          content="Lh6KNMNwOn_JDzrveQV_z4CbZZVKnDh0X5-ViL3hLcM"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/icon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <DefaultSeo
            defaultTitle="Poke Ranker ポケモンSV 上位構築記事まとめ"
            description="ポケモン SV 上位構築記事 努力値　ランキング　まとめ"
            openGraph={{
              type: "website",
              title: "Poke Ranker ポケモン上位構築記事まとめ",
              description:
                "ポケモン SV 上位構築記事 努力値　ランキング　まとめ",
              site_name: "Poke Ranker",
              url: "https://poke-ranker.netlify.app/",
            }}
            twitter={{
              handle: "@poke_ranker",
              site: "@poke_ranker",
              cardType: "summary_large_image",
            }}
          />

          <GoogleAnalytics />
          <GoogleAdsense />

          <ArticleContext.Provider value={{ cashArticle, setCashArticle }}>
            <Component {...pageProps} />
          </ArticleContext.Provider>
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
