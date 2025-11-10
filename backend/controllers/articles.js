const Article = require("../models/Article");
const User = require("../models/User");

exports.articles = async (req, res) => {
  try {
    let articles = await Article.find();

    if (articles.length === 0) {
      const seedArticles = [
        {
          title: "Building Scalable APIs with Node.js and Express",
          createdAt: new Date("2025-10-01T09:15:00Z"),
          publishedAt: new Date("2025-10-02T12:00:00Z"),
          views: 1289,
        },
        {
          title: "How to Improve Frontend Performance in React Apps",
          createdAt: new Date("2025-09-20T10:45:00Z"),
          publishedAt: new Date("2025-09-21T13:30:00Z"),
          views: 2340,
        },
        {
          title: "Mastering Async/Await in JavaScript",
          createdAt: new Date("2025-09-10T08:30:00Z"),
          publishedAt: new Date("2025-09-10T15:00:00Z"),
          views: 1876,
        },
        {
          title: "Deploying a Fullstack App to Railway with CI/CD",
          createdAt: new Date("2025-10-05T11:20:00Z"),
          publishedAt: new Date("2025-10-06T09:00:00Z"),
          views: 940,
        },
        {
          title: "A Deep Dive into MongoDB Aggregation Pipelines",
          createdAt: new Date("2025-09-28T14:10:00Z"),
          publishedAt: new Date("2025-09-29T08:45:00Z"),
          views: 2104,
        },
        {
          title: "Why TypeScript is Taking Over JavaScript Projects",
          createdAt: new Date("2025-08-22T07:00:00Z"),
          publishedAt: new Date("2025-08-23T12:30:00Z"),
          views: 3540,
        },
        {
          title: "Understanding Mongoose Middleware and Hooks",
          createdAt: new Date("2025-09-05T09:45:00Z"),
          publishedAt: new Date("2025-09-05T16:00:00Z"),
          views: 1678,
        },
        {
          title: "Securing Your REST API with JWT Authentication",
          createdAt: new Date("2025-10-08T13:15:00Z"),
          publishedAt: new Date("2025-10-09T11:30:00Z"),
          views: 2987,
        },
        {
          title: "Optimizing MongoDB Indexes for High Performance",
          createdAt: new Date("2025-09-12T12:00:00Z"),
          publishedAt: new Date("2025-09-12T14:00:00Z"),
          views: 1756,
        },
        {
          title: "Building Real-Time Apps with Socket.IO and React",
          createdAt: new Date("2025-10-10T10:00:00Z"),
          publishedAt: new Date("2025-10-10T14:30:00Z"),
          views: 4120,
        },
      ];

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
