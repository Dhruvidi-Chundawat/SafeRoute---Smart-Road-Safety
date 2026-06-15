import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./LiveNews.module.css";

export default function LiveNews() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    axios
      .get(
        "https://gnews.io/api/v4/search?q=road accident India&lang=en&max=5&apikey=3b1faa5d51a5fd0857cc1b88244d5cc4"
      )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.heading}>
        📰 Live Accident News
      </div>

      {news.map((item, index) => (

        <div className={styles.card} key={index}>

          <img
            src={item.image}
            alt=""
            className={styles.image}
          />

          <div className={styles.content}>

            <h4>{item.title}</h4>

            <div className={styles.source}>
              {item.source.name}
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Read More →
            </a>

          </div>

        </div>

      ))}

    </div>
  );

}

