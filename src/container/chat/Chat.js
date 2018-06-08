// third party
import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";

// own code
import {
  getMsgListAsync,
  enterText,
  sendMsgAsync,
  sendMsgAfter,
  readMsgAsync,
  showEmoji,
  markAlreadyReadMsgAsync
} from "../../redux/chat.redux";
import { getChatId } from "../../utilities";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fixGridBug = this.fixGridBug.bind(this);
  }
  handleSubmit() {
    const onSendMsgAsync = this.props.onSendMsgAsync;
    const onSendMsgAfter = this.props.onSendMsgAfter;
    const onReadMsgAsync = this.props.onReadMsgAsync;
    const userInfo = this.props.userInfo;
    const chat = this.props.chat;
    const { user } = this.props.match.params;
    const from = userInfo._id;
    const to = user;
    const text = chat.text;

    onSendMsgAsync({ from, to, text });
    onSendMsgAfter();
  }

  fixGridBug() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }
  render() {
    const { text } = this.props.chat;
    const { users } = this.props.chat;
    const { showEmoji } = this.props.chat;
    const onEnterText = this.props.onEnterText;
    const onShowEmoji = this.props.onShowEmoji;
    const { msgList } = this.props.chat;
    const emojis =
      "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀";
    const data = emojis
      .split(" ")
      .filter(v => v)
      .map(v => {
        return { text: v };
      });
    const to = this.props.match.params.user;
    const userInfo = this.props.userInfo;
    const from = userInfo._id;
    const chatId = getChatId(from, to);

    const filteredMsgList = msgList.filter(v => v.chatId === chatId);

    const receiverName = users[to] ? users[to].name : "";

    return (
      <div>
        <div id="chat-page">
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.goBack();
            }}
          >
            {receiverName}
          </NavBar>
          {filteredMsgList.map(v => {
            const avatar = require(`../avatarImages/${
              users[v.from].avatar
            }.png`);
            return v.from === to ? (
              <List key={v.createdTime}>
                <List.Item thumb={avatar}>{v.text}</List.Item>
              </List>
            ) : (
              <List key={v.createdTime}>
                <List.Item
                  extra={<img src={avatar} alt={avatar} />}
                  className="chat-me"
                >
                  {v.text}
                </List.Item>
              </List>
            );
          })}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              onChange={text => {
                onEnterText(text);
              }}
              value={text}
              placeholder={`Please enter`}
              extra={
                <div>
                  <span
                    style={{
                      marginRight: 5
                    }}
                    onClick={() => {
                      onShowEmoji();
                      this.fixGridBug();
                    }}
                  >
                    😃
                  </span>
                  <span
                    style={{ color: "red" }}
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    Send
                  </span>
                </div>
              }
            >
              Message
            </InputItem>
          </List>
          {showEmoji ? (
            <Grid
              data={data}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={el => {
                onEnterText(text + el.text);
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const chat = this.props.chat;
    const onReadMsgAsync = this.props.onReadMsgAsync;
    console.log(chat.msgList.length);

    if (chat.msgList.length === 0) {
      const onGetMsgListAsync = this.props.onGetMsgListAsync;
      onGetMsgListAsync();
      console.log(`readMsg Chat`);
      onReadMsgAsync();
    }
  }

  componentWillUnmount() {
    const from = this.props.match.params.user;
    const onMarkAlreadyReadMsgAsync = this.props.onMarkAlreadyReadMsgAsync;
    onMarkAlreadyReadMsgAsync({ from });
  }
}

Chat.propTypes = {
  userInfo: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  onGetMsgListAsync: PropTypes.func.isRequired,
  onEnterText: PropTypes.func.isRequired,
  onSendMsgAsync: PropTypes.func.isRequired,
  onSendMsgAfter: PropTypes.func.isRequired,
  onReadMsgAsync: PropTypes.func.isRequired,
  onShowEmoji: PropTypes.func.isRequired,
  onMarkAlreadyReadMsgAsync: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user,
  chat: state.chat
});
const mapDispatchToProps = dispatch => {
  return {
    onGetMsgListAsync: () => {
      dispatch(getMsgListAsync());
    },
    onEnterText: text => {
      dispatch(enterText(text));
    },
    onSendMsgAsync: ({ from, to, text }) => {
      dispatch(sendMsgAsync({ from, to, text }));
    },
    onSendMsgAfter: () => {
      dispatch(sendMsgAfter());
    },
    onReadMsgAsync: () => {
      dispatch(readMsgAsync());
    },
    onShowEmoji: () => {
      dispatch(showEmoji());
    },
    onMarkAlreadyReadMsgAsync: ({ from }) => {
      dispatch(markAlreadyReadMsgAsync({ from }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
