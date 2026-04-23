export async function getCryptoNews() {
  try {
    const feeds = [
      "https://www.coindesk.com/arc/outboundfeeds/rss/",
      "https://cointelegraph.com/rss",
      "https://cryptonews.com/news/feed/",
    ];

    const results = await Promise.all(
      feeds.map((url) =>
        fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
        ).then((res) => res.json())
      )
    );

    // 🔥 junta todas as notícias
    const allNews = results.flatMap((data) => data.items || []);

    return allNews;

  } catch (err) {
    console.error("Erro na API:", err);
    return [];
  }
}