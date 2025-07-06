import React from "react";
import {Message} from "semantic-ui-react";

export const onFileSelectSuccess = () => {
    return (
        <Message
          color="teal"
          attached
          icon={ "settings"}
          header={"File has been added"}
        />
    )
}

export const onFileSelectError = (props) => {
    return (
        <Message
        attached="bottom" 
        warning
        icon={ "help"}
        header={props.error}
        />
    )
}