const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

//Create New post POST ================LOGIN REQUIRED
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Update post ======================LOGIN REQUIRED

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(300).json("Post updated");
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    } else {
      res.status(401).json("Invalid Id");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(300).json("Post deleted");
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    } else {
      res.status(401).json("Invalid Id");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//GET Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//All posts

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catG = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catG) {
      posts = await Post.find({ categories: { $in: [catG] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
