// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd-mobile";

// own code
import { getUserListAsync } from "../../redux/userList.redux";

class Genius extends Component {
  componentWillMount() {
    const userList = this.props.userList;
    const onGetUserListAsync = this.props.onGetUserListAsync;

    if (userList.length === 0) {
      console.log(`there is no boss list`);

      onGetUserListAsync("boss");
      console.log(`get boss list`);
    }
  }
  render() {
    const userList = this.props.userList;
    console.log(userList);

    return (
      <div>
        {userList.length !== 0
          ? userList.map(v => {
              return (
                <Card
                  key={v._id}
                  onClick={() => {
                    this.props.history.push(`/chat/${v._id}`);
                  }}
                >
                  <Card.Header
                    title={v.user}
                    thumb={require(`../../container/avatarImages/${
                      v.avatar
                    }.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>{v.description}</Card.Body>
                </Card>
              );
            })
          : null}
      </div>
    );
  }
}

Genius.propTypes = {
  userList: PropTypes.array.isRequired,
  onGetUserListAsync: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  userList: state.userList.userList
});

const mapDispatchToProps = dispatch => {
  return {
    onGetUserListAsync: kind => {
      dispatch(getUserListAsync(kind));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Genius);
