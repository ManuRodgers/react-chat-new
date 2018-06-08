// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Grid } from "antd-mobile";
import { connect } from "react-redux";

// own code
import { enterAvatar } from "../../redux/user.redux";

class AvatarSelector extends Component {
  render() {
    const userInfo = this.props.userInfo;
    const onEnterAvatar = this.props.onEnterAvatar;
    const { avatar } = userInfo;

    const avatarList =
      "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra";
    const data = avatarList.split(",").map(avatarName => {
      return {
        icon: require(`../avatarImages/${avatarName}.png`),
        text: avatarName
      };
    });
    const listHeader = avatar ? (
      <div>
        <span style={{ marginRight: 15 }}>the current avatar</span>
        <img
          style={{ width: 25, height: 25 }}
          src={require(`../avatarImages/${avatar}.png`)}
          alt={avatar}
        />
      </div>
    ) : (
      () => {
        return "Please select your avatar!";
      }
    );
    return (
      <List renderHeader={listHeader}>
        <Grid
          data={data}
          columnNum={5}
          onClick={el => {
            onEnterAvatar(el.text);
          }}
        />
      </List>
    );
  }
}

AvatarSelector.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onEnterAvatar: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user
});
const mapDispatchToProps = dispatch => {
  return {
    onEnterAvatar: avatar => {
      dispatch(enterAvatar(avatar));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarSelector);
