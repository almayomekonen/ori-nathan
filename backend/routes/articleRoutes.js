const express = require("express");
const {
  articles,
  addArticle,
  editArticle,
  getArticle,
  deleteArticle,
} = require("../controllers/articles");
const { guard } = require("../guard");

const routes = express.Router();

// all articles
routes.get("/articles", guard, articles);

// add article
routes.post("/add-article/:userId", guard, addArticle);

// get article
routes.get("/edit-article/:id", guard, getArticle);

// edit article
routes.put("/edit-article/:id", guard, editArticle);

// delete article
routes.delete("/delete-article/:id", guard, deleteArticle);

module.exports = routes;
