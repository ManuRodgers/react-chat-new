// third party library
import axios from "axios";
import { getRedirectURL } from "../utilities";

// action types
export const GET_ERROR_MESSAGE = "GET_ERROR_MESSAGE";
export const ENTER_USER = "ENTER_USER";
export const ENTER_PWD = "ENTER_PWD";
export const ENTER_PWD_AGAIN = "ENTER_PWD_AGAIN";
export const CHANGE_KIND = "CHANGE_KIND";
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const ENTER_AVATAR = "ENTER_AVATAR";
export const ENTER_COMPANY = "ENTER_COMPANY";
export const ENTER_SALARY = "ENTER_SALARY";
export const ENTER_TITLE = "ENTER_TITLE";
export const ENTER_DESCRIPTION = "ENTER_DESCRIPTION";
export const ENTER_WAGE = "ENTER_WAGE";
export const ENTER_JOB = "ENTER_JOB";
export const ENTER_PROFILE = "ENTER_PROFILE";
export const LOAD_DATA = "LOAD_DATA";
export const LOGOUT = "LOGOUT";
const initialState = {
  // for both boss and genius
  user: "",
  pwd: "",
  pwdAgain: "",
  kind: "",
  redirectTo: "",
  avatar: "",
  msg: "",
  // for boss
  company: "",
  salary: "",
  title: "",
  description: "",
  // for genius
  wage: "",
  job: "",
  profile: ""
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, ...action.payload, pwd: "", pwdAgain: "" };
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectURL(action.payload),
        pwd: "",
        pwdAgain: ""
      };
    case GET_ERROR_MESSAGE:
      return { ...state, msg: action.msg };
    case ENTER_USER:
      return { ...state, user: action.user };
    case ENTER_PWD:
      return { ...state, pwd: action.pwd };
    case ENTER_PWD_AGAIN:
      return { ...state, pwdAgain: action.pwdAgain };
    case CHANGE_KIND:
      return { ...state, kind: action.kind };
    case ENTER_AVATAR:
      return { ...state, avatar: action.avatar };
    case ENTER_COMPANY:
      return { ...state, company: action.company };
    case ENTER_TITLE:
      return { ...state, title: action.title };
    case ENTER_SALARY:
      return { ...state, salary: action.salary };
    case ENTER_DESCRIPTION:
      return { ...state, description: action.description };
    case ENTER_JOB:
      return { ...state, job: action.job };
    case ENTER_WAGE:
      return { ...state, wage: action.wage };
    case ENTER_PROFILE:
      return { ...state, profile: action.profile };
    case LOGOUT:
      window.location.reload();
      return { ...initialState, redirectTo: "/login" };
    default:
      return state;
  }
};

// sync action creator
export const logout = () => ({
  type: LOGOUT
});

export const loadData = data => ({
  type: LOAD_DATA,
  payload: data
});

export const authSuccess = data => ({
  type: AUTH_SUCCESS,
  payload: data
});

export const enterUser = user => ({
  type: ENTER_USER,
  user
});

export const getErrorMessage = msg => ({
  type: GET_ERROR_MESSAGE,
  msg
});

export const enterPwd = pwd => ({
  type: ENTER_PWD,
  pwd
});

export const enterPwdAgain = pwdAgain => ({
  type: ENTER_PWD_AGAIN,
  pwdAgain
});

export const changeKind = kind => ({
  type: CHANGE_KIND,
  kind
});

export const enterAvatar = avatar => ({
  type: ENTER_AVATAR,
  avatar
});
// for boss
export const enterCompany = company => ({
  type: ENTER_COMPANY,
  company
});

export const enterTitle = title => ({
  type: ENTER_TITLE,
  title
});

export const enterSalary = salary => ({
  type: ENTER_SALARY,
  salary
});

export const enterDescription = description => ({
  type: ENTER_DESCRIPTION,
  description
});
// for genius
export const enterJob = job => ({
  type: ENTER_JOB,
  job
});

export const enterWage = wage => ({
  type: ENTER_WAGE,
  wage
});

export const enterProfile = profile => ({
  type: ENTER_PROFILE,
  profile
});

// async action creator

export const registerSuccessAsync = ({ user, pwd, pwdAgain, kind }) => {
  if (!user || !pwd) {
    return getErrorMessage("please enter your username or pwd");
  }

  if (pwd !== pwdAgain) {
    return getErrorMessage("Please enter the exact same pwd");
  }
  return async dispatch => {
    const res = await axios.post("/user/register", { user, pwd, kind });
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(authSuccess(res.data.data));
    } else {
      return dispatch(getErrorMessage(res.data.msg));
    }
  };
};

export const loginSuccessAsync = ({ user, pwd }) => {
  if (!user || !pwd) {
    return getErrorMessage("Please enter username or password");
  }

  return async dispatch => {
    const res = await axios.post("/user/login", { user, pwd });
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(authSuccess(res.data.data));
    } else {
      return dispatch(getErrorMessage(res.data.msg));
    }
  };
};

export const updateBossAsync = ({
  avatar,
  company,
  salary,
  title,
  description
}) => {
  if (!avatar || !company || !salary || !title || !description) {
    return getErrorMessage("please complete your information");
  }

  return async dispatch => {
    const res = await axios.post("/user/updateBoss", {
      avatar,
      company,
      salary,
      title,
      description
    });
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(authSuccess(res.data.data));
    } else {
      return dispatch(getErrorMessage(res.data.msg));
    }
  };
};

export const updateGeniusAsync = ({ avatar, wage, job, profile }) => {
  if (!avatar || !wage || !job || !profile) {
    return getErrorMessage("please complete your information");
  }
  return async dispatch => {
    const res = await axios.post("/user/updateGenius", {
      avatar,
      wage,
      job,
      profile
    });
    if (res.status === 200 && res.data.code === 0) {
      return dispatch(authSuccess(res.data.data));
    } else {
      return dispatch(getErrorMessage(res.data.msg));
    }
  };
};
