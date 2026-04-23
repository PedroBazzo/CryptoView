import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCryptoNews } from "../services/api/news";

export default function News() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  useEffect(() => {
    async function fetchNews() {
      const data = await getCryptoNews();
      setNews(data);
    }

    fetchNews();
  }, []);

  // 🔥 evita bug de página inválida
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [totalPages]);

  const currentNews = news.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function nextPage() {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const linkStyle = {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <h1>Notícias</h1>

        {/* 📰 GRID */}
        <div className="news-grid">
          {currentNews.map((item, index) => (
            <div key={index} className="card news-card">
              <img
                src={item.thumbnail || item.enclosure?.link}
                alt="news"
              />

              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {item.title}
              </p>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  marginTop: "10px",
                  color: "#60a5fa",
                  textDecoration: "none",
                }}
              >
                Ler mais →
              </a>
            </div>
          ))}
        </div>

        {/* 🔗 PAGINAÇÃO ESTILO LINK */}
        {totalPages > 1 && (
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* ⬅️ ANTERIOR */}
            {page > 1 ? (
              <span onClick={prevPage} style={linkStyle}>
                ← Página anterior
              </span>
            ) : (
              <div />
            )}

            {/* ➡️ PRÓXIMA */}
            {page < totalPages && (
              <span
                onClick={nextPage}
                style={{
                  ...linkStyle,
                  marginLeft: "auto",
                }}
              >
                Próxima página →
              </span>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}