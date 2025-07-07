import React from "react";
import { Button } from "semantic-ui-react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteButton(props) {
  return (
    <Button negative {...props} role="button" tabIndex="0">
      ✗
    </Button>
  );
}

export default DeleteButton;
