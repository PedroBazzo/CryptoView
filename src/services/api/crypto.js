export async function getCryptoPrice(crypto, currency) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
  );
  const data = await res.json();
  return data[crypto][currency];
}

export async function getHistory(crypto = "bitcoin", currency = "usd") {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=${currency}&days=7`
  );
  return res.json();
}