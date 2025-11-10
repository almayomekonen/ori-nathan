const express = require("express");
const { articles } = require("../controllers/articles");
const { guard } = require("../guard");

const routes = express.Router();

routes.get("/articles", guard, articles);

module.exports = routes;
