import axios from "axios";

const API = {
  getPosts: () => axios.get("/api/posts"),
  getPost: (id) => axios.get(`/api/posts/${id}`),
  deletePost: (id) => axios.delete(`/api/posts/${id}`),
  savePost: (postData) => axios.post("/api/posts", postData),
  updatePost: (id, updateData) => axios.put(`/api/posts/${id}`, updateData),
};

export default API;
