// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, InputItem, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { Redirect } from "react-router-dom";

// own code
import "../../components/logo/logo.css";
import Logo from "../../components/logo/Logo";
import { enterUser, enterPwd, loginSuccessAsync } from "../../redux/user.redux";
import { wrapOnce } from "../../utilities";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handelLogin = this.handelLogin.bind(this);

    console.log(`login constructor`);
  }

  reloadOnce() {
    let hasReload = false;
    
  }
  handelLogin() {
    const userInfo = this.props.userInfo;
    const onLoginSuccessAsync = this.props.onLoginSuccessAsync;
    const { user, pwd } = userInfo;
    console.log(`${user} ${pwd}`);

    onLoginSuccessAsync({ user, pwd });
  }

  handleRegister() {
    this.props.history.push("register");
  }

  render() {
    const userInfo = this.props.userInfo;
    const { redirectTo } = userInfo;

    const msg = userInfo.msg;
    const onEnterUser = this.props.onEnterUser;
    const onEnterPwd = this.props.onEnterPwd;
    return (
      <div>
        {redirectTo && redirectTo !== "/login" ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <h2>Login page</h2>
        {msg ? <p style={{ color: "red" }}>{msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem
              onChange={user => {
                onEnterUser(user);
              }}
            >
              user
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
          </List>
          <Button type="primary" onClick={this.handelLogin}>
            Login
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

Login.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onEnterUser: PropTypes.func.isRequired,
  onEnterPwd: PropTypes.func.isRequired
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
    onLoginSuccessAsync: ({ user, pwd }) => {
      dispatch(loginSuccessAsync({ user, pwd }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
