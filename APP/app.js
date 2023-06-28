const express = require("express");
const { getTopics, getEndpoints, getArticlesByID, postArticleComments } = require("./controller");
const app = express();
const descriptions = require("../endpoints.json");

app.get("/api/", (req, res) => {
  res.status(200).send(descriptions);
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByID);

app.post("/api/articles/:article_id/comments", postArticleComments)

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ msg: "Invalid ID" });
    } else next(err);
  });

app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});



module.exports = app;
