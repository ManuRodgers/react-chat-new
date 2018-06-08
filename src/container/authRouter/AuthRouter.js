import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { loadData } from "../../redux/user.redux";

@withRouter
class AuthRouter extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    const onLoadData = this.props.onLoadData;
    const { pathname } = this.props.location;

    const publicList = ["/login", "/register"];
    if (publicList.indexOf(pathname) > -1) {
      console.log(`it is in login or register`);
      return null;
    }
    axios.get("/user/info").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data.data);

        return onLoadData(res.data.data);
      } else {
        console.log(`you suck`);

        this.props.history.push("login");
      }
    });
  }
}

AuthRouter.propTypes = {
  onLoadData: PropTypes.func.isRequired
};
// const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => {
  return {
    onLoadData: data => {
      dispatch(loadData(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(AuthRouter);
