import React from "react";
import { Segment, Image, Grid, Header, Icon, Button } from "semantic-ui-react";

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, profilePicUrl }, // avatar → profilePicUrl
  },
}) {
  return (
    <Segment padded>
      <Grid stackable>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={4} textAlign="center">
            <Image
              src={profilePicUrl || "/default-avatar.png"}
              size="small"
              circular
              centered
              alt={`${name}'s avatar`}
            />
          </Grid.Column>

          <Grid.Column width={12}>
            <Header as="h2" style={{ marginBottom: "0.5rem" }}>
              {name}
            </Header>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>
              {status} {company && <span>at {company}</span>}
            </p>
            {location && (
              <p style={{ color: "#888", marginBottom: "0.5rem" }}>
                <Icon name="map marker alternate" />
                {location}
              </p>
            )}

            <div style={{ marginTop: "1rem" }}>
              {website && (
                <Button
                  as="a"
                  href={website}
                  target="_blank"
                  icon="globe"
                  circular
                />
              )}
              {social?.facebook && (
                <Button
                  as="a"
                  href={social.facebook}
                  target="_blank"
                  icon="facebook"
                  color="facebook"
                  circular
                />
              )}
              {social?.linkedin && (
                <Button
                  as="a"
                  href={social.linkedin}
                  target="_blank"
                  icon="linkedin"
                  color="linkedin"
                  circular
                />
              )}
              {social?.youtube && (
                <Button
                  as="a"
                  href={social.youtube}
                  target="_blank"
                  icon="youtube"
                  color="youtube"
                  circular
                />
              )}
              {social?.instagram && (
                <Button
                  as="a"
                  href={social.instagram}
                  target="_blank"
                  icon="instagram"
                  color="pink"
                  circular
                />
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default ProfileTop;
