import { useState, useEffect, useContext } from "react";
import "./Articles.css";
import { FaTrash } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/util";
import { GeneralContext } from "../../App";

export default function Articles() {
  const [articlesData, setArticlesData] = useState([]);

  const { snackBar, setIsLoading } = useContext(GeneralContext);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      console.log("Token is missing");
      return;
    }

    async function fetchArticles() {
      getToken();

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

  async function handleDelete(id) {
    const token = getToken();
    setIsLoading(true);
    snackBar("Article deleted successfully");

    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-article/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setArticlesData((prev) => prev.filter((article) => article.id !== id));
      console.log(articlesData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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
            <tr key={article.id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{article.createdAt}</td>
              <td>{article.publishedAt}</td>
              <td>{article.views}</td>
              <td>
                <Link to={`/article/${article.id}`}>
                  <button>
                    <AiFillEdit />
                  </button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(article.id)}>
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
