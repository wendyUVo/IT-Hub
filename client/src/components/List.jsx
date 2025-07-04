import React from "react";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

// List Container
export function List({ children }) {
  return <Item.Group divided>{children}</Item.Group>;
}

// Individual List items
export function ListItem({
  id,
  postTitle = "",
  author = "Unknown",
  body = "",
  date = new Date(),
}) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as={Link} to={`/posts/${id}`} style={{ fontSize: "24px" }}>
          {postTitle}
        </Item.Header>
        <Item.Meta>
          {new Date(date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Item.Meta>
        <Item.Description>{body}</Item.Description>
        <Item.Extra>posted by {author}</Item.Extra>
      </Item.Content>
    </Item>
  );
}
