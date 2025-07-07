import React from "react";
import { Item, Segment, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

// List Container
export function List({ children }) {
  return <Item.Group divided>{children}</Item.Group>;
}

// Individual List items
export function ListItem({ id, postTitle, author, body, date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div>
      <div className="post-meta">
        {formattedDate} / By {author}
      </div>
      <Header as={Link} to={`/posts/${id}`} className="post-title-link">
        {postTitle}
      </Header>
      <p className="post-excerpt"> {stripHtml(body).substring(0, 150)}...</p>
    </div>
  );
}

// Helper function to strip HTML tags
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
