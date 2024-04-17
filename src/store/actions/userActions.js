// Action Types
export const SET_USER_NAME = "SET_USER_NAME";

// Action Creators
export const setUserName = (name) => ({
  type: SET_USER_NAME,
  payload: name,
});
