// 🔁 cache simples
const cache = {};

// 💱 taxas fixas (base USD)
const rates = {
  usd: 1,
  brl: 5,
  eur: 0.9,
};

// 🔗 mapeamento das criptos → símbolos Binance
const symbolMap = {
  bitcoin: "BTCUSDT",
  ethereum: "ETHUSDT",
  binancecoin: "BNBUSDT",
  solana: "SOLUSDT",
  ripple: "XRPUSDT",
  cardano: "ADAUSDT",
  dogecoin: "DOGEUSDT",
  polygon: "MATICUSDT",
  polkadot: "DOTUSDT",
  litecoin: "LTCUSDT",
};

// 💰 PREÇO ATUAL
export async function getCryptoPrice(crypto, currency = "usd") {
  const key = `${crypto}-${currency}`;

  if (cache[key]) return cache[key];

  try {
    const symbol = symbolMap[crypto];
    if (!symbol) throw new Error("Cripto não suportada");

    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    const data = await res.json();

    const priceUsd = Number(data.price);
    const converted = priceUsd * (rates[currency] || 1);

    cache[key] = converted;

    return converted;

  } catch (err) {
    console.error("Erro Binance:", err);
    return null;
  }
}

// 📈 HISTÓRICO DINÂMICO
export async function getHistory(
  crypto = "bitcoin",
  currency = "usd",
  days = 7
) {
  try {
    const symbol = symbolMap[crypto];
    if (!symbol) throw new Error("Cripto não suportada");

    // 🔥 define intervalo automaticamente
    let interval = "1d";
    if (days <= 7) interval = "1h";
    else if (days <= 30) interval = "4h";
    else interval = "1d";

    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${days}`
    );

    const data = await res.json();

    const formatted = data.map((item) => {
      const priceUsd = Number(item[4]);
      const converted = priceUsd * (rates[currency] || 1);

      return [item[0], converted];
    });

    return { prices: formatted };

  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
    return { prices: [] };
  }
}