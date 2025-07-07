import React, { useEffect } from "react";
import { ListItem, List } from "../components/List";
import DeleteBtn from "../components/DeleteButton";
import { Link } from "react-router-dom";
// import { useStoreContext } from "../utils/GlobalState";
import { useStoreContext } from "../utils/StoreProvider";
import { REMOVE_FAVORITE, LOADING, UPDATE_FAVORITES } from "../utils/actions";
import { Grid, Header } from "semantic-ui-react";
import DashboardLayout from "../components/DashboardLayout";

const FavoritesList = () => {
  const [state, dispatch] = useStoreContext();

  const getFavorites = () => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_FAVORITES, favorites: state.favorites });
  };

  const removeFromFavorites = (id) => {
    dispatch({
      type: REMOVE_FAVORITE,
      _id: id,
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <DashboardLayout>
      <div style={{ padding: "3rem" }}>
        <Grid.Row>
          <Header as="h1">Here's All of Your Favorite Posts</Header>
        </Grid.Row>
        <Grid.Row>
          {state.favorites.length ? (
            <List>
              <Header as="h3">Click on a post to view in detail</Header>
              {state.favorites.map((post) => (
                <>
                  <ListItem
                    id={post._id}
                    key={post._id}
                    postTitle={post.title}
                    author={post.author}
                    body={post.body}
                    date={post.date}
                  ></ListItem>
                  <DeleteBtn onClick={() => removeFromFavorites(post._id)} />
                </>
              ))}
            </List>
          ) : (
            <h3>You haven't added any favorites yet!</h3>
          )}
        </Grid.Row>
      </div>
    </DashboardLayout>
  );
};

export default FavoritesList;
