// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NavBar,
  List,
  WhiteSpace,
  TextareaItem,
  InputItem,
  Button
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// own code
import AvatarSelector from "../avatarSelector/AvatarSelector";
import {
  enterWage,
  enterJob,
  enterProfile,
  updateGeniusAsync
} from "../../redux/user.redux";

class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
  }

  handleSaveClicked() {
    const userInfo = this.props.userInfo;
    const onUpdateGeniusAsync = this.props.onUpdateGeniusAsync;
    const { wage, job, profile, avatar } = userInfo;
    onUpdateGeniusAsync({ wage, job, profile, avatar });
  }
  render() {
    const { redirectTo, msg } = this.props.userInfo;
    const onEnterWage = this.props.onEnterWage;
    const onEnterJob = this.props.onEnterJob;
    const onEnterProfile = this.props.onEnterProfile;
    return (
      <div>
        {redirectTo && redirectTo !== "geniusInfo" ? <Redirect to={redirectTo} /> : null}
        {msg ? (
          <span style={{ color: "red", fontSize: 20, marginLeft: 35 }}>
            {msg}
          </span>
        ) : null}
        <NavBar mode="dark">Complete Genius Information</NavBar>
        <AvatarSelector />
        <List
          renderHeader={() => {
            return "Please complete your personal information";
          }}
        >
          <InputItem
            onChange={wage => {
              onEnterWage(wage);
            }}
          >
            wage
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={job => {
              onEnterJob(job);
            }}
          >
            job
          </InputItem>
          <WhiteSpace />
          <TextareaItem
            onChange={profile => {
              onEnterProfile(profile);
            }}
            title="profile"
          />
          <WhiteSpace />
          <Button type="primary" onClick={this.handleSaveClicked}>
            Save
          </Button>
        </List>
      </div>
    );
  }
}

GeniusInfo.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onEnterWage: PropTypes.func.isRequired,
  onEnterJob: PropTypes.func.isRequired,
  onEnterProfile: PropTypes.func.isRequired,
  onUpdateGeniusAsync: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    onEnterWage: wage => {
      dispatch(enterWage(wage));
    },
    onEnterJob: job => {
      dispatch(enterJob(job));
    },
    onEnterProfile: profile => {
      dispatch(enterProfile(profile));
    },
    onUpdateGeniusAsync: ({ avatar, wage, job, profile }) => {
      dispatch(updateGeniusAsync({ avatar, wage, job, profile }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo);
