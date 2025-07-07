import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useContext, useState } from "react";
import { ListItem, List } from "../components/List";
// import { useStoreContext } from "../utils/GlobalState";
import { useStoreContext } from "../utils/StoreProvider";
import {
  REMOVE_POST,
  UPDATE_POSTS,
  LOADING,
  UPDATE_SINGLE_POST,
} from "../utils/actions";
import API from "../utils/API";
import DeleteButton from "../components/DeleteButton";
import { UserContext } from "../utils/UserContext";
import { Message, Button, Icon } from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../components/Common/quill";

const ManagePost = () => {
  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useContext(UserContext);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  //For Updating Post
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const showTemporaryMessage = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

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
    const updatedData = { title: editTitle, body: editBody };
    API.updatePost(id, updatedData)
      .then((res) => {
        dispatch({
          type: UPDATE_SINGLE_POST,
          post: res.data,
        });
        showTemporaryMessage("✅ Post updated successfully!");
        setEditingId(null); // Exit edit mode
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {feedbackMessage && (
          <div style={{ marginTop: "1rem" }}>
            <Message
              success
              icon="check circle"
              header="Success"
              content={feedbackMessage}
              onDismiss={() => setFeedbackMessage("")}
            />
          </div>
        )}
        <h1>All Blog Posts</h1>
        <h3 className="mb-5 mt-5">Click on a post to view</h3>

        {state.posts.length ? (
          <List>
            {state.posts.map((post) => (
              <div key={post._id} style={{ marginBottom: "1.5rem" }}>
                {editingId === post._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{
                        width: "100%",
                        marginBottom: "0.5rem",
                        padding: "0.5rem",
                      }}
                    />
                    <ReactQuill
                      value={editBody}
                      onChange={setEditBody}
                      modules={QuillModules}
                      formats={QuillFormats}
                      style={{ height: "250px", marginBottom: "1rem" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        color="blue"
                        icon
                        labelPosition="left"
                        onClick={() => updatePost(post._id)}
                        size="small"
                      >
                        <Icon name="save" />
                        Save
                      </Button>
                      <Button
                        color="red"
                        icon
                        labelPosition="left"
                        onClick={() => setEditingId(null)}
                        size="small"
                      >
                        <Icon name="cancel" />
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <ListItem
                      id={post._id}
                      postTitle={post.title}
                      author={post.author}
                      body={post.body}
                      date={post.date}
                    />
                    {user && (
                      <>
                        <DeleteButton onClick={() => removePost(post._id)} />
                        <button
                          style={{ marginLeft: "1rem" }}
                          onClick={() => {
                            setEditingId(post._id);
                            setEditTitle(post.title);
                            setEditBody(post.body);
                          }}
                        >
                          ✏️ Edit
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </List>
        ) : (
          <h3>You haven't added any posts yet!</h3>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagePost;
