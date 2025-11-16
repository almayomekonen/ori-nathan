import { AiOutlineLeft } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Articles.css";
import { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../../App";

export default function ArticleEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    publishDate: "",
    createdAt: "",
    views: "",
  });

  const navigate = useNavigate();
  const { setIsLoading, user } = useContext(GeneralContext);

  useEffect(() => {
    if (id === "new") {
      setFormData({
        title: "",
        publishDate: "",
        createdAt: "",
        views: "",
      });
    } else {
      setIsLoading(true);
      async function fetchArticles() {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `http://localhost:3000/api/edit-article/${id}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Something went wrong, please try again later...");
          }

          const data = await response.json();
          setFormData({
            ...data,
          });
          console.log(data);
        } catch (error) {
          console.log(error, "");
        } finally {
          setIsLoading(false);
        }
      }

      fetchArticles();
    }
  }, [id, setIsLoading]);

  async function handleSubmit(event) {
    console.log(event, "click");

    event.preventDefault();
    setIsLoading(true);

    try {
      if (!user || !user.userId) {
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const userId = user.userId;

      const response = await fetch(
        `http://localhost:3000/api${
          formData.id ? `/edit-article/${id}` : `/add-article/${userId}`
        }`,
        {
          method: formData.id ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong, please try again later...");
      }
      const data = await response.json();
      console.log(data);
      setFormData(data);
      navigate("/");
    } catch (error) {
      console.log(error, "");
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <div className="btnFrame">
        <Link className="return-link-ancor" to="/">
          <button className="return-link">
            <AiOutlineLeft /> Go back to articles
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Your Title"
            value={formData.title || ""}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="publishDate">
          Publish Date:
          <input
            type="text"
            id="publishDate"
            name="publishDate"
            placeholder="Publish Date"
            value={formData.publishDate || ""}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="createdAt">
          CreatedAt:
          <input
            type="text"
            id="createdAt"
            name="createdAt"
            placeholder="CreatedAt"
            value={formData.createdAt || ""}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="views">
          Views:
          <input
            type="text"
            id="views"
            name="views"
            placeholder="Your Views"
            value={formData.views || ""}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">
          {id !== "new" ? "Save an Article" : "Add an Article"}
        </button>
      </form>
    </>
  );
}
