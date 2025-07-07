import React, { useEffect, useState, useContext } from "react";
import API from "../utils/API";
import { useStoreContext } from "../utils/StoreProvider";
import { UserContext } from "../utils/UserContext";
import {
  SET_CURRENT_POST,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from "../utils/actions";
import {
  Container,
  Header,
  Popup,
  Icon,
  Grid,
  Image,
  Message,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DOMPurify from "dompurify";

const Detail = (props) => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [feedback, setFeedback] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    API.getPost(id)
      .then((res) => dispatch({ type: SET_CURRENT_POST, post: res.data }))
      .catch((err) => console.log(err));
  }, [id]);

  const addFavorite = () => {
    if (!user) {
      showTemporaryMessage("Please log in to add to Favorite.");
      return;
    }
    dispatch({
      type: ADD_FAVORITE,
      post: state.currentPost,
    });
    showTemporaryMessage("Added to favorites 💖");
  };

  const removeFavorite = () => {
    if (!user) {
      showTemporaryMessage("Please log in to remove from Favorite.");
      return;
    }
    dispatch({
      type: REMOVE_FAVORITE,
      _id: state.currentPost._id,
    });
    showTemporaryMessage("Removed from favorites 💔");
  };

  const showTemporaryMessage = (text) => {
    setFeedback(text);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide after 3s
  };

  return (
    <>
      <Navbar />
      {state.currentPost ? (
        <Container text style={{ marginTop: "7em" }}>
          {showMessage && (
            <Message
              floating
              success
              content={feedback}
              onDismiss={() => setShowMessage(false)}
            />
          )}
          <Grid celled="internally">
            <Grid.Row>
              <Grid.Column width={13}>
                <Header as="h1">{state.currentPost.title}</Header>
                <h5 style={{ color: "grey" }}>
                  by {state.currentPost.author}{" "}
                </h5>
                <p style={{ fontSize: "0.9rem", color: "#888" }}>
                  Posted on: {new Date(state.currentPost.date).toLocaleString()}
                </p>
                {/* <p>{state.currentPost.body}</p> */}
                <div
                  style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(state.currentPost.body),
                  }}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                {state.favorites.indexOf(state.currentPost) !== -1 ? (
                  <Popup
                    content={
                      user
                        ? "Remove from your Favorite"
                        : "Please log in to remove from Favorite"
                    }
                    trigger={
                      <Icon
                        name="heart"
                        color="red"
                        size="large"
                        circular
                        position="top right"
                        style={{ cursor: "pointer" }}
                        onClick={removeFavorite}
                      />
                    }
                  />
                ) : (
                  <Popup
                    content={
                      user
                        ? "Add to your Favorite"
                        : "Please log in to add to Favorite"
                    }
                    trigger={
                      <Icon
                        name="heart"
                        color="grey"
                        size="large"
                        circular
                        alt="Remove from your Favorite"
                        position="top right"
                        style={{ cursor: "pointer" }}
                        onClick={addFavorite}
                      />
                    }
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
        <Container text style={{ marginTop: "7em" }}>
          <Message info content="Loading post..." />
        </Container>
      )}
    </>
  );
};

export default Detail;
