// third party library
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NavBar,
  List,
  WhiteSpace,
  InputItem,
  Button,
  TextareaItem
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// own code
import AvatarSelector from "../avatarSelector/AvatarSelector";
import {
  enterCompany,
  enterDescription,
  enterSalary,
  enterTitle,
  updateBossAsync
} from "../../redux/user.redux";

class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
  }

  handleSaveClicked() {
    const userInfo = this.props.userInfo;
    const { company, salary, title, description, avatar } = userInfo;
    console.log(`${company} ${salary} ${title} ${description}`);

    const onUpdateBossAsync = this.props.onUpdateBossAsync;
    onUpdateBossAsync({ avatar, company, salary, title, description });
  }
  render() {
    const userInfo = this.props.userInfo;
    const { msg, redirectTo } = userInfo;

    const onEnterCompany = this.props.onEnterCompany;
    const onEnterSalary = this.props.onEnterSalary;
    const onEnterTitle = this.props.onEnterTitle;
    const onEnterDescription = this.props.onEnterDescription;
    return (
      <div>
        <NavBar>Complete Boss Information</NavBar>
        {redirectTo && redirectTo !== "/bossInfo" ? <Redirect to={redirectTo} /> : null}
        {msg ? (
          <span style={{ color: "red", fontSize: 20, marginLeft: 35 }}>
            {msg}
          </span>
        ) : null}
        <AvatarSelector />
        <List
          renderHeader={() => {
            return "Please complete your personal information";
          }}
        >
          <InputItem
            onChange={company => {
              onEnterCompany(company);
            }}
          >
            Company
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={salary => {
              onEnterSalary(salary);
            }}
          >
            Salary
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={title => {
              onEnterTitle(title);
            }}
          >
            Title
          </InputItem>
          <WhiteSpace />
          <TextareaItem
            autoHeight={true}
            title="description"
            onChange={description => {
              onEnterDescription(description);
            }}
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

BossInfo.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onEnterCompany: PropTypes.func.isRequired,
  onEnterSalary: PropTypes.func.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onEnterDescription: PropTypes.func.isRequired,
  onUpdateBossAsync: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  userInfo: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    onEnterCompany: company => {
      dispatch(enterCompany(company));
    },
    onEnterSalary: salary => {
      dispatch(enterSalary(salary));
    },
    onEnterTitle: title => {
      dispatch(enterTitle(title));
    },
    onEnterDescription: description => {
      dispatch(enterDescription(description));
    },
    onUpdateBossAsync: ({ avatar, company, salary, title, description }) => {
      dispatch(
        updateBossAsync({ avatar, company, salary, title, description })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);
