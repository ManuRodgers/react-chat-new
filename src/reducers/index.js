import { combineReducers } from "redux";
import { user } from "../redux/user.redux";
import { userList } from "../redux/userList.redux";
import { chat } from "../redux/chat.redux";

const rootReducer = combineReducers({
  user,
  userList,
  chat
});

export default rootReducer;
