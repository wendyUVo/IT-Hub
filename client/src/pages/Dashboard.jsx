import React, { useEffect, useState } from "react";
import {
  Header,
  Grid,
  Divider,
  Label,
  Image,
  Icon,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get("/api/user", { withCredentials: true });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <Loader active inline="centered" content="Loading Dashboard..." />;
  if (error) return <Message negative header="Error" content={error} />;

  return (
    <DashboardLayout>
      <Grid stackable>
        <Grid.Row>
          <Header dividing size="huge" as="h1">
            {user?.name}'s Dashboard
          </Header>
        </Grid.Row>

        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column mobile={16} tablet={6} computer={4} textAlign="center">
            <Image
              centered
              circular
              size="medium"
              src={user?.profilePicUrl}
              alt="Profile"
            />
            <Label
              basic
              color="teal"
              size="large"
              style={{ marginTop: "1rem" }}
            >
              Profile Picture
            </Label>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={10} computer={12}>
            <Segment>
              <Header as="h3">
                <Icon name="mail" color="teal" />
                <Header.Content>{user?.email}</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Divider section hidden />

        <Grid.Row>
          <Header dividing size="huge" as="h2">
            Social Links
          </Header>
        </Grid.Row>

        <Grid.Row>
          <p style={{ fontSize: "16px", color: "#888" }}>
            {/* You can display social links here later */}
            No social links connected yet.
          </p>
        </Grid.Row>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
