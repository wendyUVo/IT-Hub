import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
} from "./actions";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOADING });
    const res = await axios.get("/api/profile/me", { withCredentials: true });
    console.log("✅ Loaded profile:", res.data);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOADING });
    const res = await axios.get(`/api/profile/user/${userId}`, {
      withCredentials: true,
    });
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
