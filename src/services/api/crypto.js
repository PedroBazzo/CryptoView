// 🔁 cache simples
const cache = {};

// 💱 taxas fixas (base USD)
const rates = {
  usd: 1,
  brl: 5,   // ajuste se quiser mais precisão
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

  // ✅ cache
  if (cache[key]) {
    console.log("Cache hit:", key);
    return cache[key];
  }

  try {
    const symbol = symbolMap[crypto];

    if (!symbol) {
      throw new Error("Cripto não suportada");
    }

    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    if (!res.ok) {
      throw new Error("Erro na API Binance");
    }

    const data = await res.json();

    // 💰 preço em USD (USDT ≈ USD)
    const priceUsd = Number(data.price);

    if (!priceUsd) {
      throw new Error("Preço inválido");
    }

    // 💱 conversão
    const converted = priceUsd * (rates[currency] || 1);

    // 💾 cache
    cache[key] = converted;

    return converted;

  } catch (err) {
    console.error("Erro Binance:", err);
    return null;
  }
}

// 📈 HISTÓRICO (BINANCE)
export async function getHistory(crypto = "bitcoin", currency = "usd") {
  try {
    const symbol = symbolMap[crypto];

    if (!symbol) {
      throw new Error("Cripto não suportada");
    }

    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=7`
    );

    if (!res.ok) {
      throw new Error("Erro na API Binance");
    }

    const data = await res.json();

    // 🔥 converte para formato compatível com seu Chart
    const formatted = data.map((item) => {
      const priceUsd = Number(item[4]); // fechamento

      const converted = priceUsd * (rates[currency] || 1);

      return [
        item[0],       // timestamp
        converted,     // preço convertido
      ];
    });

    return { prices: formatted };

  } catch (err) {
    console.error("Erro ao buscar histórico Binance:", err);
    return { prices: [] };
  }
}