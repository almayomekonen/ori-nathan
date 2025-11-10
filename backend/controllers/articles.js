const Article = require("../models/Article");
const User = require("../models/User");
const seedArticles = require("./seedArticles.json");

exports.articles = async (req, res) => {
  try {
    let articles = await Article.find();

    if (articles.length === 0) {
      await Article.insertMany(seedArticles);
      articles = await Article.find();
    }

    articles = articles.map((article) => ({
      ...article.toObject(),
      id: article._id,
    }));

    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// addArticle
exports.addArticle = async (req, res) => {};

// getArticle
exports.getArticle = async (req, res) => {};

// editArticle
exports.editArticle = async (req, res) => {};

// deleteArticle
exports.editArticle = async (req, res) => {};

// recycleBin
exports.editArticle = async (req, res) => {};
