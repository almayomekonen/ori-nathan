import { AiOutlineLeft } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Articles.css";
import { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../../App";
import { getToken } from "../../utils/util";

export default function ArticleEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    publishDate: "",
    createdAt: "",
    views: "",
  });

  const navigate = useNavigate();
  const { setIsLoading, user, snackBar } = useContext(GeneralContext);

  useEffect(() => {
    if (id === "new" || !id) {
      setFormData({
        title: "",
        publishDate: "",
        createdAt: "",
        views: "",
      });
    } else {
      setIsLoading(true);
      async function fetchArticles() {
        const token = getToken();
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
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!user || !user.user || !user.user.id) {
        setIsLoading(false);
        return;
      }

      if (
        !formData.views ||
        !formData.publishDate ||
        !formData.createdAt ||
        !formData.title
      ) {
        snackBar("All fields are required");
        setIsLoading(false);
        return;
      }

      const token = getToken();
      const userId = user.user.id;

      const response = await fetch(
        `http://localhost:3000/api${
          formData._id ? `/edit-article/${id}` : `/add-article/${userId}`
        }`,
        {
          method: formData._id ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            createdAt: formData.createdAt,
            publishDate: formData.publishDate,
            views: Number(formData.views),
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong, please try again later...");
      }
      const data = await response.json();
      snackBar("Article updated Successfully");
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
            type="date"
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
            type="date"
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
            type="number"
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
