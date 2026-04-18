import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCryptoNews } from "../services/api/news";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getCryptoNews();
      setNews(data);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Notícias</h1>

      {loading && <p>Carregando...</p>}

      {!loading && news.length === 0 && (
        <p>Nenhuma notícia encontrada.</p>
      )}

      {news.map((n, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3>{n.title}</h3>

          <p>{n.pubDate}</p>

          <a href={n.link} target="_blank" rel="noreferrer">
            Ler mais
          </a>
        </div>
      ))}
    </div>
  );
}