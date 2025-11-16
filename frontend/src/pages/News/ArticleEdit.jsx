import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Articles.css";
import { useState } from "react";

export default function ArticleEdit() {
  const [formData, setFormData] = useState({
    title: "",
    publishDate: "",
    createdAt: "",
    Views: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    //
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

      <form>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Your Title"
            value={formData.title}
          />
        </label>

        <label htmlFor="publish-date">
          Publish Date:
          <input
            type="text"
            id="publish-date"
            name="publish-date"
            placeholder="Publish Date"
            value={formData.publishDate}
          />
        </label>

        <label htmlFor="created-at">
          CreatedAt:
          <input
            type="text"
            id="created-at"
            name="created-at"
            placeholder="CreatedAt"
            value={formData.createdAt}
          />
        </label>

        <label htmlFor="views">
          Views:
          <input
            type="text"
            id="views"
            name="views"
            placeholder="Your Views"
            value={formData.Views}
          />
        </label>
      </form>
    </>
  );
}
