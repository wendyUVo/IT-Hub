import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../utils/actions";

/**
 * Dispatches an alert message and automatically removes it after a timeout.
 *
 * @param {string} msg - The alert message to display
 * @param {string} alertType - The type of alert (e.g., 'success', 'danger')
 * @param {number} timeout - How long (ms) the alert should stay before disappearing
 */
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4(); // generate a unique ID for the alert

    // Dispatch the SET_ALERT action with payload
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    // Dispatch REMOVE_ALERT after the timeout to remove the alert
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };
