// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd-mobile";

// own code
import { getUserListAsync } from "../../redux/userList.redux";

class Boss extends Component {
  componentDidMount() {
    const userList = this.props.userList;
    const onGetUserListAsync = this.props.onGetUserListAsync;
    if (userList.length === 0) {
      console.log(`this is no geniusList`);
      onGetUserListAsync("genius");
      console.log(`get genius list`);
      
    }
  }
  render() {
    const userList = this.props.userList;
    console.log(userList);

    return (
      <div>
        {userList.length > 0
          ? userList.map(v => {
              return (
                <Card
                  key={v._id}
                  onClick={() => {
                    console.log(`clicked`);
                    this.props.history.push(`/chat/${v._id}`);
                  }}
                >
                  <Card.Header
                    title={v.user}
                    thumb={require(`../../container/avatarImages/${
                      v.avatar
                    }.png`)}
                    extra={<span>{v.job}</span>}
                  />
                  <Card.Body>{<span>{v.profile}</span>}</Card.Body>
                </Card>
              );
            })
          : null}
      </div>
    );
  }
}

Boss.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Boss);
