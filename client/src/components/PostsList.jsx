import React, { useEffect, useContext } from "react";
import { ListItem, List } from "./List";
import { useStoreContext } from "../utils/StoreProvider";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function PostsList() {
  const [state, dispatch] = useStoreContext();
  const [user] = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: LOADING });
    API.getPosts()
      .then((res) => {
        dispatch({
          type: UPDATE_POSTS,
          posts: res.data,
        });
      })
      .catch((err) => console.log("Failed to load posts:", err));
  }, []);

  const removePost = (id) => {
    API.deletePost(id)
      .then(() => {
        dispatch({ type: REMOVE_POST, _id: id });
      })
      .catch((err) => console.log("Failed to delete post:", err));
  };

  return (
    <div>
      <h1>All Blog Posts</h1>
      <h3 className="mb-5 mt-5">Click on a post to view</h3>

      {state.posts.length ? (
        <List>
          {state.posts.map((post) => (
            <ListItem
              key={post._id}
              id={post._id}
              postTitle={post.title}
              author={post.author}
              body={post.body}
              date={post.date}
            />
          ))}
        </List>
      ) : (
        <h3>You haven't added any posts yet!</h3>
      )}
    </div>
  );
}

export default PostsList;
