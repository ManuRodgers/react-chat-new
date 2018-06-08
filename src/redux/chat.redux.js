// third party library
import axios from "axios";

import io from "socket.io-client";
const socket = io("ws://localhost:9093");

// action types
export const GET_MSG_LIST = "GET_MSG_LIST";
export const READ_MSG = "READ_MSG";
export const MARK_ALREADY_READ = "MARK_ALREADY_READ";
export const ENTER_TEXT = "ENTER_TEXT";
export const SEND_MSG_AFTER = "SEND_MSG_AFTER";
export const SHOW_EMOJI = "SHOW_EMOJI";
export const LOGOUT_CHAT = "LOGOUT_CHAT";

// reducer
const initialState = {
  text: "",
  msgList: [],
  users: {},
  unread: 0, // the number of msgList that unread
  showEmoji: false
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case GET_MSG_LIST:
      return {
        ...state,
        msgList: [...action.payload.msgList],
        unread: action.payload.msgList.filter(
          v => !v.read && v.to === action.currentUserId
        ).length,
        users: action.payload.users
      };

    case ENTER_TEXT:
      return { ...state, text: action.text };
    case READ_MSG:
      let num = action.payload.to === action.currentUserId ? 1 : 0;


      return {
        ...state,
        msgList: [...state.msgList, action.payload],
        unread: state.unread + num
      };
    case SEND_MSG_AFTER:
      return { ...state, text: "" };
    case SHOW_EMOJI:
      return { ...state, showEmoji: !state.showEmoji };
    case MARK_ALREADY_READ:
      let { currentUserId, from, numModified } = action.payload;


      return {
        ...state,
        msgList: state.msgList.map(v => {
          if (v.from === from && v.to === currentUserId) {
            v.read = true;
            return v;
          }
          return v;
        }),
        unread: state.unread - numModified
      };
    case LOGOUT_CHAT:
      return { ...initialState };

    default:
      return state;
  }
};

// sync action creator

export const showEmoji = getState => ({
  type: SHOW_EMOJI
});

export const logoutChat = () => ({
  type: LOGOUT_CHAT
});

const getMsgList = (msgList, users, currentUserId) => ({
  type: GET_MSG_LIST,
  payload: { msgList, users },
  currentUserId
});

export const readMsg = (msg, currentUserId) => ({
  type: READ_MSG,
  payload: msg,
  currentUserId
});

export const enterText = text => ({
  type: ENTER_TEXT,
  text
});

export const sendMsgAfter = () => ({
  type: SEND_MSG_AFTER
});

export const markAlreadyRead = ({ currentUserId, from, numModified }) => ({
  type: MARK_ALREADY_READ,
  payload: { currentUserId, from, numModified }
});

// async action creator

export const getMsgListAsync = () => {
  return (dispatch, getState) => {
    let currentUserId = getState().user._id;
    axios.get("/user/msgList").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(getMsgList(res.data.msgList, res.data.users, currentUserId));
      }
    });
  };
};

export const sendMsgAsync = ({ from, to, text }) => {
  return dispatch => {
    socket.emit("sendMsg", { from, to, text });
  };
};

export const readMsgAsync = () => {
  return (dispatch, getState) => {
    let currentUserId = getState().user._id;
    socket.on("readMsg", function(data) {
      dispatch(readMsg(data, currentUserId));
    });
  };
};

export const markAlreadyReadMsgAsync = ({ from }) => {
  return async dispatch => {
    const res = await axios.post("/user/markMsg", { from });
    if (res.status === 200 && res.data.code === 0) {
      dispatch(markAlreadyRead(res.data));
    }
    // .then(res => {
    // if (res.status === 200 && res.data.code === 0) {
    //   dispatch(
    //     markAlreadyRead({
    //       numModified: res.data.numModified,
    //       from: res.data.from,
    //       currentUserId: res.data.currentUserId
    //     })
    //   );
    // }
  };
};
