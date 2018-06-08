import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, TabBar, List, WhiteSpace } from "antd-mobile";
import { Route, Switch, Redirect } from "react-router-dom";

// own code
import Boss from "../../components/boss/Boss";
import Genius from "../../components/genius/Genius";
import Msg from "../../components/msg/Msg";
import User from "../../components/user/User";
import "../../index.css";
import { getMsgListAsync, readMsgAsync } from "../../redux/chat.redux";

@withRouter
class Dashboard extends Component {
  render() {
    const { pathname } = this.props.location;
    const userInfo = this.props.userInfo;
    const chat = this.props.chat;
    const navList = [
      {
        path: "/boss",
        component: Boss,
        title: "Genius List",
        text: "genius",
        icon: "boss",
        shouldHide: userInfo.kind === "genius"
      },
      {
        path: "/genius",
        component: Genius,
        title: "Boss List",
        text: "boss",
        icon: "job",
        shouldHide: userInfo.kind === "boss"
      },
      {
        path: "/msg",
        component: Msg,
        title: "Message List",
        text: "msg",
        icon: "msg"
      },
      {
        path: "/me",
        component: User,
        title: "Personal Information",
        text: "me",
        icon: "user"
      }
    ];

    const tabBarData = navList.filter(v => !v.shouldHide);

    const currentPage = navList.find(v => v.path === pathname);
    const header = currentPage ? currentPage.title : null;
    // const header = currentPage.title;
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {header}
        </NavBar>
        <Switch>
          {navList.map((v, index) => {
            return <Route key={index} path={v.path} component={v.component} />;
          })}
        </Switch>
        <TabBar className="stick-footer">
          {tabBarData.map(v => {
            return (
              <TabBar.Item
                key={v.text}
                badge={v.path === "/msg" ? chat.unread : null}
                title={v.text}
                icon={require(`../tabBarImages/${v.icon}.png`)}
                selectedIcon={require(`../tabBarImages/${v.icon}-active.png`)}
                selected={v.path === pathname}
                onPress={() => {
                  this.props.history.push(v.path);
                }}
              />
            );
          })}
        </TabBar>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.chat.msgList.length === 0) {
      const onGetMsgListAsync = this.props.onGetMsgListAsync;
      const onReadMsgAsync = this.props.onReadMsgAsync;
      onGetMsgListAsync();
      onReadMsgAsync();
      console.log(`readMsg in Dashboard`);
      console.log(`getMsgList in dashboard`);
    }
  }
}

Dashboard.propTypes = {
  userInfo: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  onReadMsgAsync: PropTypes.func.isRequired,
  onGetMsgListAsync: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user,
  chat: state.chat
});

const mapDispatchToProps = dispatch => {
  return {
    onReadMsgAsync: () => {
      dispatch(readMsgAsync());
    },
    onGetMsgListAsync: () => {
      dispatch(getMsgListAsync());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
