export async function getCryptoPrice(crypto = "bitcoin", currency = "brl") {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
  );

  const data = await response.json();
  return data[crypto][currency];
}