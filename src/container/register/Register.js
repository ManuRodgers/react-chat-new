// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";

import { WhiteSpace, List, InputItem, Radio, Button } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// own code
import Logo from "../../components/logo/Logo";
import "../../components/logo/logo.css";
import {
  enterUser,
  enterPwd,
  enterPwdAgain,
  changeKind,
  registerSuccessAsync
} from "../../redux/user.redux";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegisterClicked = this.handleRegisterClicked.bind(this);
  }

  handleRegisterClicked() {
    const onRegisterSuccessAsync = this.props.onRegisterSuccessAsync;
    const userInfo = this.props.userInfo;

    const { user, pwd, pwdAgain, kind } = userInfo;
    onRegisterSuccessAsync({ user, pwd, pwdAgain, kind });
  }

  render() {
    const RadioItem = Radio.RadioItem;
    const userInfo = this.props.userInfo;
    const { redirectTo } = userInfo;
    const msg = userInfo.msg;

    const onChangeKind = this.props.onChangeKind;
    const onEnterUser = this.props.onEnterUser;
    const onEnterPwd = this.props.onEnterPwd;
    const onEnterPwdAgain = this.props.onEnterPwdAgain;
    return (
      <div>
        {redirectTo && redirectTo !== "/login" ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <h2>Register page</h2>
        {msg ? (
          <p
            style={{
              color: "red"
            }}
          >
            {msg}
          </p>
        ) : null}
        <List>
          <InputItem
            onChange={user => {
              onEnterUser(user);
            }}
          >
            username
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={pwd => {
              onEnterPwd(pwd);
            }}
          >
            pwd
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={pwdAgain => {
              onEnterPwdAgain(pwdAgain);
            }}
          >
            repeatPwd
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={userInfo.kind === "boss"}
            onChange={() => {
              onChangeKind("boss");
            }}
          >
            Boss
          </RadioItem>
          <WhiteSpace />

          <RadioItem
            checked={userInfo.kind === "genius"}
            onChange={() => {
              onChangeKind("genius");
            }}
          >
            Genius
          </RadioItem>
          <Button type="primary" onClick={this.handleRegisterClicked}>
            Register
          </Button>
        </List>
      </div>
    );
  }
}

Register.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onEnterUser: PropTypes.func.isRequired,
  onEnterPwd: PropTypes.func.isRequired,
  onEnterPwdAgain: PropTypes.func.isRequired,
  onChangeKind: PropTypes.func.isRequired,
  onRegisterSuccessAsync: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    onEnterUser: user => {
      dispatch(enterUser(user));
    },
    onEnterPwd: pwd => {
      dispatch(enterPwd(pwd));
    },
    onEnterPwdAgain: pwdAgain => {
      dispatch(enterPwdAgain(pwdAgain));
    },
    onChangeKind: kind => {
      dispatch(changeKind(kind));
    },
    onRegisterSuccessAsync: ({ user, pwd, pwdAgain, kind }) => {
      dispatch(registerSuccessAsync({ user, pwd, pwdAgain, kind }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;
