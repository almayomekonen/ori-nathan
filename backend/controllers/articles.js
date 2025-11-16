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
exports.addArticle = async (req, res) => {
  try {
    const { title, createdAt, publishedAt, views } = req.body;

    const userId = req.params.userId;

    if (!title || !createdAt || !publishedAt || !views) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.." });
    }

    const newArticle = new Article({
      title,
      createdAt: new Date(),
      publishedAt: new Date(publishedAt),
      views,
    });

    await newArticle.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// getArticle
exports.getArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    // /edit/news/6911b54a814453c5a752747b

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found.." });
    }

    res.json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// editArticle
exports.editArticle = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User id not" });
    }

    const { title, createdAt, publishedAt, views } = req.body;

    if (!title || !createdAt || !publishedAt || !views) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, {
      title,
      createdAt,
      publishedAt,
      views,
    });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// deleteArticle
exports.editArticle = async (req, res) => {};

// recycleBin
exports.editArticle = async (req, res) => {};
