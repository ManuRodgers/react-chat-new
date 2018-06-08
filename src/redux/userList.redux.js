// third party library
import axios from "axios";

// action types
export const GET_USER_LIST = "GET_USER_LIST";
export const GET_ERROR_MSG = "GET_ERROR_MSG";
export const LOGOUT_USER_LIST = "LOGOUT_USER_LIST";

// userList reducer
const initialState = {
  userList: [],
  msg: ""
};

export const userList = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return { ...state, userList: [...state.userList, ...action.payload] };
    case GET_ERROR_MSG:
      return { ...state, msg: action.msg };
    case LOGOUT_USER_LIST:
      return { ...initialState };
    default:
      return state;
  }
};

// sync action creator
export const getUserList = data => ({
  type: GET_USER_LIST,
  payload: data
});

export const getErrorMsg = msg => ({
  type: GET_ERROR_MSG,
  msg
});

export const logoutUserList = () => ({
  type: LOGOUT_USER_LIST
});

// async action creator

export const getUserListAsync = kind => {
  return async dispatch => {
    const res = await axios.get(`/user/list?kind=${kind}`);
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(getUserList(res.data.data));
    } else {
      return dispatch(getErrorMsg(res.data.msg));
    }
  };
};
