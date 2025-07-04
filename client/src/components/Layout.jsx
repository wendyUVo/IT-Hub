import React from "react";
import { Container } from "semantic-ui-react";

function Layout({ children }) {
  return <Container style={{ paddingTop: "1rem" }}>{children}</Container>;
}

export default Layout;
