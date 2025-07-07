import React, { useEffect, useContext, useState } from "react";
import { ListItem, List } from "../components/List";
import { useStoreContext } from "../utils/StoreProvider";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
import API from "../utils/API";
import DeleteButton from "../components/DeleteButton";
import { UserContext } from "../utils/UserContext";
import {
  Container,
  Header,
  Segment,
  Grid,
  Label,
  Icon,
  Message,
} from "semantic-ui-react";

function PostsList() {
  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useContext(UserContext);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const removePost = (id) => {
    API.deletePost(id)
      .then(() => {
        dispatch({
          type: REMOVE_POST,
          _id: id,
        });
        showTemporaryMessage("✅ Post removed successfully!");
      })
      .catch((err) => console.log(err));
  };

  const updatePost = (id) => {
    API.updatePost(id)
      .then(() => {
        dispatch({
          type: UPDATE_POSTS,
          _id: id,
        });
        showTemporaryMessage("✅ Post updated successfully!");
      })
      .catch((err) => console.log(err));
  };

  const getPosts = () => {
    dispatch({ type: LOADING });
    API.getPosts()
      .then((results) => {
        dispatch({
          type: UPDATE_POSTS,
          posts: results.data,
        });
      })
      .catch((err) => console.log(err));
  };

  const showTemporaryMessage = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container style={{ marginTop: "7em", marginBottom: "10rem" }}>
      <Header as="h1" style={{ marginBottom: "1.5rem" }}>
        All Blog Posts
      </Header>
      <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
        Click on a post to view more details
      </p>

      {feedbackMessage && (
        <Message
          success
          content={feedbackMessage}
          onDismiss={() => setFeedbackMessage("")}
        />
      )}

      {state.posts.length ? (
        <List>
          {state.posts.map((post) => (
            <Segment
              key={post._id}
              style={{
                background: "#fff",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "0.2s ease",
              }}
            >
              <Grid>
                <Grid.Column width={13}>
                  <ListItem
                    id={post._id}
                    postTitle={post.title}
                    author={post.author}
                    body={post.body}
                    date={post.date}
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </List>
      ) : (
        <Header as="h3" color="grey">
          You haven't added any posts yet!
        </Header>
      )}
    </Container>
  );
}

export default PostsList;
