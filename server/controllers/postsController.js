const db = require("../models");

module.exports = {
  // GET /api/posts - Get all posts
  findAll: async (req, res) => {
    try {
      const posts = await db.Post.find(req.query).sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  },

  // GET /api/posts/:id - Get a post by ID
  findById: async (req, res) => {
    try {
      const post = await db.Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve post" });
    }
  },

  // POST /api/posts - Create a new post
  create: async (req, res) => {
    try {
      const newPost = await db.Post.create(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ error: "Failed to create post" });
    }
  },

  // PUT /api/posts/:id - Update a post by ID
  update: async (req, res) => {
    try {
      const updated = await db.Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updated) return res.status(404).json({ error: "Post not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Failed to update post" });
    }
  },

  // DELETE /api/posts/:id - Delete a post by ID
  remove: async (req, res) => {
    try {
      const post = await db.Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      await post.deleteOne(); // or post.remove() if using older Mongoose
      res.json({ message: "Post deleted", post });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  },
};
