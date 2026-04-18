export async function getCryptoNews() {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

    const data = await res.json();

    console.log("NEWS:", data); // debug

    return Array.isArray(data.items) ? data.items : [];

  } catch (err) {
    console.error("Erro na API:", err);
    return [];
  }
}