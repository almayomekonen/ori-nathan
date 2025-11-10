const jwt = require("jsonwebtoken");

exports.guard = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token is Available", token);

  if (!token) {
    return res.status(401).send("User not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
    if (error) {
      console.log(error);
      return res.status(401).send("User not authorized! (JWT)");
    }

    next();
  });
};
