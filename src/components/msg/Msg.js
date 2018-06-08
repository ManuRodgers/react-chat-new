import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

class Msg extends Component {
  constructor(props) {
    super(props);
    this.getLastArrItem = this.getLastArrItem.bind(this);
  }

  getLastArrItem(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const { msgList } = this.props.chat;
    const { users } = this.props.chat;
    console.log(msgList);

    const currentUserId = this.props.userInfo._id;
    const msgGroup = {};
    msgList.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || [];
      msgGroup[v.chatId].push(v);
    });
    console.log(msgGroup);

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastArrItem(a).createdTime;
      const b_last = this.getLastArrItem(b).createdTime;
      return b_last - a_last;
    });
    console.log(chatList);

    return (
      <div>
        {chatList.map(v => {
          const id = v[0].from === currentUserId ? v[0].to : v[0].from;
          const name = users[id] ? users[id].name : "";
          const avatar = users[id] ? users[id].avatar : "boy";

          let unreadNum = 0;
          v.map(chatItem => {
            if (chatItem.to === currentUserId && !chatItem.read) {
              unreadNum++;
            }
          });
          return (
            <List key={v[0].chatId}>
              <List.Item
                thumb={require(`../../container/avatarImages/${avatar}.png`)}
                arrow="horizontal"
                extra={<Badge text={unreadNum} />}
                onClick={() => {
                  this.props.history.push(`/chat/${id}`);
                }}
              >
                {this.getLastArrItem(v).text}
                <List.Item.Brief>{name}</List.Item.Brief>
              </List.Item>
            </List>
          );
        })}
      </div>
    );
  }
}

Msg.propTypes = {
  chat: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  chat: state.chat,
  userInfo: state.user
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
