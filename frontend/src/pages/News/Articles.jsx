import { useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  // a lot of work tommorow

  const token = localStorage.getItem("token");

  // a lot of work tommorow
  async function fetchArticles() {
    try {
      const response = await fetch("http:://localhost:3000/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ...token`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const articles = await response.json();
      setArticles(articles);
    } catch (error) {
      console.log(error);
    }
  }

  return <div>Articles</div>;
}
