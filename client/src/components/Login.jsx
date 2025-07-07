import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { UserContext } from "../utils/UserContext";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // "positive" or "negative"
  const [showMessage, setShowMessage] = useState(false);

  const showTemporaryMessage = (message, type = "positive") => {
    setFeedback(message);
    setFeedbackType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      showTemporaryMessage("✅ Login successful!", "positive");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Login failed:", err);
      showTemporaryMessage(
        "❌ Login failed. Please check your credentials.",
        "negative"
      );
    }
  };

  const handleLogout = () => {
    axios.get("/api/user/logout", { withCredentials: true }).then(() => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <Grid className="login-container" textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} size="huge" alt="logo" className="image" /> Log-in
          to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <Button color="teal" fluid size="large">
              Login
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
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
