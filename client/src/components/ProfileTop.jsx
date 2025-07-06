import React from "react";
import { Segment, Image, Grid, Divider, Header, Icon } from "semantic-ui-react";

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, profilePicUrl },
  },
}) {
  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={4} textAlign="center">
          <Image
            src={profilePicUrl}
            size="small"
            circular
            centered
            alt={`${name}'s profile`}
          />
        </Grid.Column>

        <Grid.Column width={12}>
          <Header as="h2" style={{ marginBottom: "5px" }}>
            {name}
          </Header>

          <p>
            {status} {company && <span> at {company}</span>}
          </p>

          {location && (
            <p>
              <Icon name="map marker alternate" />
              {location}
            </p>
          )}

          <Divider />

          <div>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <Icon name="globe" size="large" />
              </a>
            )}
            {social?.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="twitter" color="blue" size="large" />
              </a>
            )}
            {social?.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" color="blue" size="large" />
              </a>
            )}
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="facebook" color="blue" size="large" />
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" color="pink" size="large" />
              </a>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default ProfileTop;
