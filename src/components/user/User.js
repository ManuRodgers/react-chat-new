// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Result, List, Button, Modal } from "antd-mobile";
import { Redirect } from "react-router-dom";
import browserCookies from "browser-cookies";

// own code
import { logout } from "../../redux/user.redux";
import { logoutChat } from "../../redux/chat.redux";
import { logoutUserList } from "../../redux/userList.redux";

class User extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const onLogout = this.props.onLogout;
    const onLogoutChat = this.props.onLogoutChat;
    const onLogoutUserList = this.props.onLogoutUserList;
    const alert = Modal.alert;

    alert("Logout", "are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel");
        }
      },
      {
        text: "OK",
        onPress: params => {
          browserCookies.erase("userId");
          onLogoutChat();
          onLogoutUserList();
          onLogout();
        }
      }
    ]);
  }
  render() {
    const userInfo = this.props.userInfo;
    const { redirectTo } = userInfo;

    return (
      <div>
        {redirectTo === "/login" ? <Redirect to={redirectTo} /> : null}
        <Result
          img={<img src={require("../../container/avatarImages/boy.png")} />}
          title={userInfo.user}
          message={userInfo.company ? userInfo.company : null}
        />
        <List
          renderHeader={() => {
            return "Personal information";
          }}
        >
          <List.Item>
            <span>Job Title:</span>{" "}
            {userInfo.title ? userInfo.title : userInfo.job}
            <List.Item.Brief>
              <span>Job Requirement:</span>{" "}
              {userInfo.description ? userInfo.description : userInfo.profile}
            </List.Item.Brief>
            <List.Item.Brief>
              <span>money:</span>{" "}
              {userInfo.salary ? userInfo.salary : userInfo.wage}
            </List.Item.Brief>
          </List.Item>
          <Button type="primary" onClick={this.handleLogout}>
            Logout
          </Button>
        </List>
      </div>
    );
  }
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onLogoutChat: PropTypes.func.isRequired,
  onLogoutUserList: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user
});
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logout());
    },
    onLogoutChat: () => {
      dispatch(logoutChat());
    },
    onLogoutUserList: () => {
      dispatch(logoutUserList());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
