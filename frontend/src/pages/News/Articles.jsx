import { useState, useEffect } from "react";
import "./Articles.css";
import { FaTrash } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token is missing");
      return;
    }

    async function fetchArticles() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token is missing");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const articles = await response.json();

        setArticlesData(articles);
      } catch (error) {
        console.log(error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <>
      <h2>Our Articles</h2>
      <div className="btnFrame">
        <Link className="return-link-ancor" to="/article/new">
          <button className="return-link">
            <FaPlus /> New Article
          </button>
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>CreatedAt</th>
            <th>PublishedAt</th>
            <th>Views</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {articlesData.map((article, index) => (
            <tr key={article._id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{article.createdAt}</td>
              <td>{article.publishedAt}</td>
              <td>{article.views}</td>
              <td>
                <button>
                  <AiFillEdit />
                </button>
              </td>
              <td>
                <button>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
