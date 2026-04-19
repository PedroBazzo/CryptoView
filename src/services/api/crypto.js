const cache = {};

export async function getCryptoPrice(crypto, currency) {
  const key = `${crypto}-${currency}`;

  if (cache[key]) {
    console.log("Cache hit:", key);
    return cache[key];
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd,brl,eur`
    );

    if (!res.ok) {
      throw new Error("Erro na API");
    }

    const data = await res.json();

    const price = data[crypto]?.[currency];

    cache[key] = price;

    return price;

  } catch (err) {
    console.error("Erro:", err);
    return 0;
  }
}

export async function getHistory(crypto = "bitcoin", currency = "usd") {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=${currency}&days=7`
  );
  return res.json();
}