import React, { useRef, useState } from "react";
// import { useStoreContext } from "../utils/GlobalState";
import { useStoreContext } from "../utils/StoreProvider";
import { ADD_POST, LOADING } from "../utils/actions";
import API from "../utils/API";
import {
  Container,
  Header,
  Form,
  Button,
  Message,
  Label,
} from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "../components/Common/quill";
import DashboardLayout from "../components/DashboardLayout";

function CreatePostForm() {
  const titleRef = useRef();
  // const bodyRef = useRef();
  const authorRef = useRef();
  const [body, setBody] = useState("");
  const [state, dispatch] = useStoreContext();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOADING });

    API.savePost({
      title: titleRef.current.value.trim(),
      // body: bodyRef.current.editor.getText(),
      body: body.trim(),
      author: authorRef.current.value.trim(),
    })
      .then((result) => {
        dispatch({
          type: ADD_POST,
          post: result.data,
        });
        // Show success message
        setSuccessMessage("✅ Post has been created successfully!");
        // Clear form
        titleRef.current.value = "";
        // bodyRef.current.value = "";
        authorRef.current.value = "";
        setBody("");

        // Refresh page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));
    console.log(titleRef.current.value);
    console.log(bodyRef.current.editor.getText());
    console.log(authorRef.current.value);
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  return (
    <DashboardLayout>
      <Container>
        <Header as="h2">Create a blog's blog</Header>
        {successMessage && (
          <Message positive onDismiss={() => setSuccessMessage("")}>
            <Message.Header>{successMessage}</Message.Header>
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Post Title</label>
            <input
              className="form-control mb-5"
              required
              ref={titleRef}
              placeholder="Title"
            />
          </Form.Field>

          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            required
            // ref={bodyRef}
            value={body}
            onChange={setBody}
            style={{ height: "150px" }}
            placeholder="Write something amazing..."
          />

          <Form.Field style={{ marginTop: "5rem" }}>
            <label>Posted By</label>
            <input ref={authorRef} placeholder="Screen name" />
          </Form.Field>
          <Button
            className="btn btn-success mt-3 mb-5"
            type="submit"
            disabled={state.loading}
          >
            Save Post
          </Button>
        </Form>
      </Container>
    </DashboardLayout>
  );
}

export default CreatePostForm;
