import Script from "next/script";

const GoogleAdsense = () => (
  <Script
    data-ad-client="ca-pub-8818787014591723"
    onError={(e) => {
      console.error("Script failed to load", e);
    }}
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    crossOrigin="anonymous"></Script>
);

export default GoogleAdsense;
