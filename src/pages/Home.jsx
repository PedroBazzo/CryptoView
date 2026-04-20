import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCryptoPrice } from "../services/api/crypto";
import { getCryptoNews } from "../services/api/news";

export default function Home() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [news, setNews] = useState([]);

  // 🪙 BTC → BRL
  useEffect(() => {
    async function loadPrice() {
      try {
        const price = await getCryptoPrice("bitcoin", "brl");
        if (price !== undefined && price !== null) {
          setBtcPrice(price);
        }
      } catch (err) {
        console.error("Erro ao carregar preço:", err);
      }
    }

    loadPrice();
  }, []);

  // 📰 Notícias
  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getCryptoNews();

        if (Array.isArray(data)) {
          setNews(data.slice(0, 3));
        } else {
          setNews([]);
        }

      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
        setNews([]);
      }
    }

    loadNews();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>CryptoView</h1>

      {/* 🪙 PREVIEW CONVERSOR */}
      <section style={{ marginTop: "20px" }}>
        <h2>Bitcoin hoje</h2>

        {btcPrice !== null ? (
          <p>
            1 BTC ={" "}
            <strong>
              {Number(btcPrice).toLocaleString()} BRL
            </strong>
          </p>
        ) : (
          <p>Carregando preço...</p>
        )}
      </section>

      {/* 📰 PREVIEW NOTÍCIAS */}
      <section style={{ marginTop: "30px" }}>
        <h2>Últimas Notícias</h2>

        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            </div>
          ))
        ) : (
          <p>Nenhuma notícia disponível</p>
        )}
      </section>
    </div>
  );
}