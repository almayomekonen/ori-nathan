const express = require("express");
const {
  articles,
  addArticle,
  editArticle,
  getArticle,
} = require("../controllers/articles");
const { guard } = require("../guard");

const routes = express.Router();

routes.get("/articles", guard, articles);
routes.post("/add-article/:userId", guard, addArticle);
routes.get("/edit-article/:id", guard, getArticle);
routes.put("/edit-article/:id", guard, editArticle);

module.exports = routes;
