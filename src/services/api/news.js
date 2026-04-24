export async function getCryptoNews() {
  try {
    const feeds = [
      "https://www.coindesk.com/arc/outboundfeeds/rss/",
      "https://cryptonews.com/news/feed/",
      "https://bitcoinmagazine.com/.rss/full/",
      "https://www.theblock.co/rss.xml",
    ];

    const results = await Promise.all(
      feeds.map((url) =>
        fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
        ).then((res) => res.json())
      )
    );

    // 🔥 junta todas as notícias
    let allNews = results.flatMap((data) => data.items || []);

    // 🔥 remove itens inválidos
    allNews = allNews.filter(
      (item) =>
        item &&
        item.title &&
        item.link &&
        item.link.startsWith("http") &&
        !item.link.includes("undefined")
    );

    // 🔥 remove duplicadas (mesmo link)
    const uniqueNews = Array.from(
      new Map(allNews.map((item) => [item.link, item])).values()
    );

    // 🔥 ordena por data (mais recentes primeiro)
    uniqueNews.sort(
      (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
    );

    return uniqueNews;

  } catch (err) {
    console.error("Erro na API:", err);
    return [];
  }
}