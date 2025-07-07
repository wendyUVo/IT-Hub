import React, { useEffect, useState } from "react";
import {
  Header,
  Form,
  Button,
  Message,
  Segment,
  Grid,
} from "semantic-ui-react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [social, setSocial] = useState({
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });
  const [feedback, setFeedback] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showTemporaryMessage = (text, shouldReload = false) => {
    setFeedback(text);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      if (shouldReload) {
        window.location.reload(); // ✅ Reload after message disappears
      }
    }, 3000); // 3-second delay
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me", { withCredentials: true });

      const profile = res.data;

      // Log to verify
      console.log("🔍 Fixed API Response:", profile);

      if (!profile || !profile.user) {
        setFeedback("⚠️ No profile data found.");
        return;
      }

      setBio(profile.bio || "");
      setSocial(profile.social || {});
      setProfilePicUrl(profile.user.profilePicUrl || "");
    } catch (err) {
      console.error("Profile load error:", err);
      setFeedback("❌ Failed to load profile");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        profilePicUrl,
        bio,
        social: {
          facebook: social.facebook,
          youtube: social.youtube,
          linkedin: social.linkedin,
          instagram: social.instagram,
        },
      };

      const res = await axios.post("/api/profile/update", payload, {
        withCredentials: true,
      });

      showTemporaryMessage("✅ Profile updated successfully!", true);
    } catch (err) {
      showTemporaryMessage("❌ Error updating profile");
    }
  };

  return (
    <DashboardLayout>
      <Grid
        className="update-profile-form-grid"
        style={{
          justifyContent: "flex-start",
          paddingLeft: "2rem",
          marginTop: "3rem",
        }}
      >
        <Grid.Column style={{ maxWidth: 700, minWidth: 500, width: "100%" }}>
          <Header as="h2" color="teal" textAlign="center">
            Update Your Profile
          </Header>

          {showMessage && feedback && (
            <Message
              positive={feedback.startsWith("✅")}
              negative={feedback.startsWith("❌")}
              content={feedback}
              onDismiss={() => setShowMessage(false)}
            />
          )}

          <Form size="large" style={{ width: "100%" }}>
            <Segment stacked style={{ width: "100%" }}>
              <Form.Input
                label="Profile Picture URL"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                placeholder="http://example.com/image.jpg"
              />

              <Form.TextArea
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us something about yourself"
              />

              <Form.Input
                label="Facebook"
                value={social.facebook || ""}
                onChange={(e) =>
                  setSocial({ ...social, facebook: e.target.value })
                }
                placeholder="Facebook URL"
              />
              <Form.Input
                label="YouTube"
                value={social.youtube || ""}
                onChange={(e) =>
                  setSocial({ ...social, youtube: e.target.value })
                }
                placeholder="YouTube URL"
              />
              <Form.Input
                label="LinkedIn"
                value={social.linkedin || ""}
                onChange={(e) =>
                  setSocial({ ...social, linkedin: e.target.value })
                }
                placeholder="LinkedIn URL"
              />
              <Form.Input
                label="Instagram"
                value={social.instagram || ""}
                onChange={(e) =>
                  setSocial({ ...social, instagram: e.target.value })
                }
                placeholder="Instagram URL"
              />

              <Button color="teal" fluid size="large" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </DashboardLayout>
  );
};

export default UpdateProfile;
