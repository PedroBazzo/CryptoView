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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <main
        style={{
          padding: "20px",
          flex: 1,
          width: "100%",
        }}
      >
        <h1>CryptoView</h1>

        {/* 🔥 SOBRE + VISÃO GERAL */}
        <div className="home-top">
          {/* SOBRE */}
          <div className="card">
            <h2>Sobre Nós</h2>
            <p style={{ lineHeight: "1.6" }}>
              O CryptoView é uma plataforma dedicada à visualização e análise
              de criptomoedas em tempo real. Aqui você pode acompanhar preços,
              comparar diferentes ativos digitais e se manter atualizado com as
              principais notícias do mercado cripto.
            </p>
          </div>

          {/* VISÃO GERAL */}
          <div className="card">
            <h2>Visão Geral do Mercado</h2>

            <p style={{ marginTop: "10px" }}>Bitcoin hoje:</p>

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

            <Link to="/dashboard" className="link-bottom">
              Ver Dashboard →
            </Link>
          </div>
        </div>

        {/* 📰 HEADER */}
        <div className="news-header">
          <h2>Últimas Notícias</h2>

          <Link to="/news" style={linkStyle}>
            Ver todas →
          </Link>
        </div>

        {/* 📰 GRID */}
        <div className="news-grid">
          {news.map((item, index) => {
            const image =
              item.thumbnail ||
              item.enclosure?.link ||
              "https://via.placeholder.com/300";

            return (
              <div key={index} className="card news-card">
                <img src={image} alt="news" />

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