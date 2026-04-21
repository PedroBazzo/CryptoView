import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCryptoPrice } from "../services/api/crypto";
import { getCryptoNews } from "../services/api/news";

export default function Home() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadPrice() {
      try {
        const price = await getCryptoPrice("bitcoin", "brl");
        setBtcPrice(price);
      } catch (err) {
        console.error(err);
      }
    }
    loadPrice();
  }, []);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getCryptoNews();
        setNews(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error(err);
      }
    }
    loadNews();
  }, []);

  const linkStyle = {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <div>
      <Navbar />

      <main style={{ padding: "30px" }}>
        <h1>CryptoView</h1>

        {/* 🔥 SOBRE + VISÃO GERAL */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* 📌 SOBRE */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "left",
            }}
          >
            <h2>Sobre Nós</h2>
            <p style={{ lineHeight: "1.6" }}>
              O CryptoView é uma plataforma dedicada à visualização e análise
              de criptomoedas em tempo real. Aqui você pode acompanhar preços,
              comparar diferentes ativos digitais e se manter atualizado com as
              principais notícias do mercado cripto. Nosso objetivo é fornecer
              uma experiência simples, rápida e acessível para usuários que
              desejam entender melhor o universo das criptomoedas.
            </p>
          </div>

          {/* 💰 VISÃO GERAL */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Visão Geral do Mercado</h2>

            <p style={{ marginTop: "10px" }}>
              Bitcoin hoje:
            </p>

            {btcPrice ? (
              <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                {Number(btcPrice).toLocaleString("pt-BR", {
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 4,
                })}{" "}
                BRL
              </p>
            ) : (
              <p>Carregando...</p>
            )}

            {/* 🔥 BOTÃO NO CANTO INFERIOR DIREITO */}
            <Link
              to="/dashboard"
              style={{
                marginTop: "auto",
                alignSelf: "flex-end",
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Ver Dashboard →
            </Link>
          </div>
        </div>

        {/* 📰 NOTÍCIAS + LINK */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <h2>Últimas Notícias</h2>

          <Link to="/news" style={linkStyle}>
            Ver todas as notícias →
          </Link>
        </div>

        {/* 📰 GRID 3x2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          {news.map((item, index) => {
            const image =
              item.thumbnail ||
              item.enclosure?.link ||
              "https://via.placeholder.com/300";

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image}
                  alt="news"
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "16px" }}>{item.title}</h3>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      color: "#60a5fa",
                    }}
                  >
                    Ler mais →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}