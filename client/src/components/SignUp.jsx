import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Image,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showTemporaryMessage = (message, type = "positive") => {
    setFeedback(message);
    setFeedbackType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  useEffect(() => {
    if (url) {
      uploadUser();
    }
  }, [url]);

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ITHubProject");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/wendyvo/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setUrl(result.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      showTemporaryMessage("❌ Image upload failed", "negative");
    }
  };

  const uploadUser = async () => {
    if (password !== password2) {
      showTemporaryMessage("❌ Passwords do not match", "negative");
      return;
    }
    const user = {
      name,
      email,
      password,
      profilePicUrl: url || "",
    };
    try {
      await axios.post("/api/user/signup", user);
      showTemporaryMessage(
        "✅ Signup successful! Redirecting to login...",
        "positive"
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (
        err.response &&
        err.response.status === 422 &&
        err.response.data.errors
      ) {
        // Show first validation error (or map all if needed)
        const messages = err.response.data.errors
          .map((e) => `❌ ${e.message}`)
          .join("\n");
        showTemporaryMessage(messages, "negative");
      } else {
        console.error("Signup failed:", err);
        showTemporaryMessage("❌ Signup failed. Try again.", "negative");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      uploadImage();
    } else {
      uploadUser();
    }
  };

  return (
    <Grid
      className="signup-form-container"
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Create a New Account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              label="Upload Profile Picture"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <Form.Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />

            <Form.Input
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              required
            />

            <Form.Input
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />

            <Form.Input
              label="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              required
            />

            <Button color="teal" fluid size="large" type="submit">
              Sign Up
            </Button>
          </Segment>
          {showMessage && (
            <Message
              positive={feedbackType === "positive"}
              negative={feedbackType === "negative"}
              content={feedback}
              onDismiss={() => setShowMessage(false)}
            />
          )}
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
