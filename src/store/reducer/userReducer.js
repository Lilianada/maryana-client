import { SET_USER_NAME } from "../actions/userActions";

const initialState = {
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
