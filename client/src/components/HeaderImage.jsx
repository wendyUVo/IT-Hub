import React from "react";
import { Button, Container, Header, Message } from "semantic-ui-react";
import Particle from "../config/Particle";
import "./style.css";

function HeaderImage() {
  return (
    <Message className="hero-banner" size="massive">
      <Particle />

      <Container className="hero-content">
        <Header as="h1" size="huge" inverted>
          IT Hub
        </Header>
        <p>
          A place where Developers can <br />
          share their thoughts, creative ideas and personal growth with one
          another
        </p>
        <Button size="large" primary>
          Learn more »
        </Button>
      </Container>
    </Message>
  );
}

export default HeaderImage;
