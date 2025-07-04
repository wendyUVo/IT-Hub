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
    }
  };

  const uploadUser = async () => {
    if (password !== password2) {
      alert("Passwords do not match!");
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
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
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
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
