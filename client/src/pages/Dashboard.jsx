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
  Button,
} from "semantic-ui-react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // const response = await axios.get("/api/user", { withCredentials: true });
      // setUser(response.data);
      const [userRes, profileRes] = await Promise.all([
        axios.get("/api/user", { withCredentials: true }),
        axios.get("/api/profile/me", { withCredentials: true }),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
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
              {profile?.bio && (
                <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
                  <strong>Bio:</strong> {profile.bio}
                </p>
              )}
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
          {profile?.social ? (
            <div style={{ paddingLeft: "1rem" }}>
              {profile.social.facebook && (
                <Button
                  as="a"
                  href={profile.social.facebook}
                  icon="facebook"
                  color="facebook"
                  target="_blank"
                  circular
                />
              )}
              {profile.social.linkedin && (
                <Button
                  as="a"
                  href={profile.social.linkedin}
                  icon="linkedin"
                  color="linkedin"
                  target="_blank"
                  circular
                />
              )}
              {profile.social.youtube && (
                <Button
                  as="a"
                  href={profile.social.youtube}
                  icon="youtube"
                  color="youtube"
                  target="_blank"
                  circular
                />
              )}
              {profile.social.instagram && (
                <Button
                  as="a"
                  href={profile.social.instagram}
                  icon="instagram"
                  color="pink"
                  target="_blank"
                  circular
                />
              )}
              {!profile.social.facebook &&
                !profile.social.linkedin &&
                !profile.social.youtube &&
                !profile.social.instagram && (
                  <p style={{ fontSize: "16px", color: "#888" }}>
                    No social links connected.
                  </p>
                )}
            </div>
          ) : (
            <p style={{ fontSize: "16px", color: "#888" }}>
              No social profile data available.
            </p>
          )}
        </Grid.Row>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
