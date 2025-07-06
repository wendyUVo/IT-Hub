import axios from "axios";

const uploadPicCloudinary = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "ITHub");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/do2uj1ht0/image/upload",
      form
    );

    return res.data.secure_url; // more reliable than `url`
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadPicCloudinary;
