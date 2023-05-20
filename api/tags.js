const express = require("express");
const tagsRouter = express.Router();
const { getAllPosts } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllPosts();

  res.send({
    tags,
  });
});

module.exports = tagsRouter;
