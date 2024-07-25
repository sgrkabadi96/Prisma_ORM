const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");
const blogRouter = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

blogRouter.get("/bulk", authMiddleware, async function (req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.json({
      message: "Authorized and blogs sent",
      data: {
        posts: posts,
      },
    });
  } catch (error) {
    res.json({
      message: "Error in getting posts (bulk)",
      error: error,
    });
  }
});

blogRouter.get("/:id", authMiddleware, async function (req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Get by Id post done",
      data: {
        post: post,
      },
    });
  } catch (error) {
    res.json({
      message: "Error in getting post (by id)",
      error,
    });
  }
});

blogRouter.post("/create", authMiddleware, async function (req, res) {
  try {
    const { title, content } = req.body;
    const user = req.body.user;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: user.id,
      },
    });

    console.log(post);

    return res.json({
      message: "Post Created Success",
      data: {
        post: post,
      },
    });
  } catch (error) {
    return res.json({
      message: "Error in creating a post",
      error: error,
    });
  }
});

blogRouter.put("/update", authMiddleware, function (req, res) {
  try {
    
  } catch (error) {
    
  }
});

module.exports = blogRouter;
