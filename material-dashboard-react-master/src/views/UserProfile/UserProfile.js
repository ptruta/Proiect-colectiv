import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ErrorSnackbar } from 'components/error-snackbar';

import profileService from 'services/profile-service';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarMessage: "Default Message",
      successUpdate: undefined,
      uniqueID: 0,
      initialFirstName: "",
      firstName: "",
      initialLastName: "",
      lastName: "",
      email: "Default Mail",
      password: "",
      repeatedPassword: "",
      department: "Default Department",
      year: "Default Year",
      group: "Default Group",
      showPassword: false,
      showRepeatPassword: false,
    }
  }

  async componentDidMount() {
    const profileInfo = await profileService.getStudentProfileInfo();
    const studentID = profileInfo.id;
    const studentFirstName = profileInfo.firstName;
    const studentLastName = profileInfo.lastName;
    const studentEmail = profileInfo.email;
    const fullGrp = profileInfo.group;
    this.setState({ 
      uniqueID: studentID,
      email: studentEmail,
      initialFirstName: studentFirstName,
      firstName: studentFirstName,
      initialLastName: studentLastName,
      lastName: studentLastName,
      group: fullGrp
    })
  }

  handleClickShowRepeatPassword(event) {
    const showing = this.state.showRepeatPassword;
    this.setState({ showRepeatPassword: !showing });
  };

  handleClickShowPassword(event) {
    const showing = this.state.showPassword;
    this.setState({ showPassword: !showing });
  };

  handleMouseDownPassword(event) {
    event.preventDefault();
  };

  changeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  changeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeRepeatPassword(event) {
    this.setState({ repeatedPassword: event.target.value });
  }

  closeSnackbar() {
    this.setState({ successUpdate: undefined });
  }

  async submitChanges(event) {
    event.preventDefault();
    
    const updatedFirstName = this.state.firstName;
    const updatedLastName = this.state.lastName;
    const updatedPass = this.state.password;
    const updatedRepeatPass = this.state.repeatedPassword;
    const updatedGroup = this.state.group;

    let fieldVerification = "";
    if (updatedFirstName == "") {
      fieldVerification += "Please input your full first name in the correspong field. ";
    }
    if (updatedLastName == "") {
      fieldVerification += "Please input your full first name in the correspong field. ";
    }
    if (updatedPass.length < 8 && updatedPass != "") {
      fieldVerification += "Chosen password is too simple! Please make sure it contains at least eight characters. ";
    }
    if (updatedPass !== updatedRepeatPass) {
      fieldVerification += "Passwords do not match!"; 
    }

    if (updatedFirstName == this.state.initialFirstName && updatedLastName == this.state.initialLastName && updatedPass == "") {
      fieldVerification += "Congrats! You've changed absolutely nothing."
    }

    if (fieldVerification == "") {
      const result = await profileService.updateStudentProfileInfo(updatedFirstName, updatedLastName, updatedPass, updatedGroup);
      if (result.status == 204) {
        this.setState({
          snackbarMessage: "User information successfully updated!",
          successUpdate: false
        });
      } else {
        this.setState({
          snackbarMessage: "Internal error! Please try again.",
          successUpdate: false
        });
      }
    } else {
      this.setState({
        snackbarMessage: fieldVerification,
        successUpdate: false
      });
    }
  }

  render() {
    const classes = this.props.classes;
    const errorSnackBar = <ErrorSnackbar variant="error" message={this.state.snackbarMessage} onClose={this.closeSnackbar.bind(this)}/>;
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
           <Card>
             <CardHeader color="primary">
               <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
               <p className={classes.cardCategoryWhite}>Complete your profile</p>
             </CardHeader>
             <CardBody>
               <GridContainer>
                 <GridItem xs={12} sm={12} md={4}>
                   <CustomInput
                      labelText="SCS Email Address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.email,
                        disabled: true
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Unique User Identification"
                    id="unique-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: this.state.uniqueID,
                      disabled:true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Group"
                    id="group"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: this.state.group
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.changeFirstName.bind(this),
                      value: this.state.firstName,
                      disabled: false
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.changeLastName.bind(this),
                      value: this.state.lastName,
                      disabled: false
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Change Password"
                    id="old-password"
                    inputProps={{
                      onChange: this.changePassword.bind(this),
                      type: this.state.showPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleClickShowPassword.bind(this)}
                            onMouseDown={this.handleMouseDownPassword.bind(this)}
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    formControlProps={{
                      type: "password",
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Repeat New Password"
                    id="new-password"
                    inputProps={{
                      onChange: this.changeRepeatPassword.bind(this),
                      type: this.state.showRepeatPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.handleClickShowRepeatPassword.bind(this)}
                            onMouseDown={this.handleMouseDownPassword.bind(this)}
                          >
                            {this.state.showRepeatedPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary"
                onClick={this.submitChanges.bind(this)} > 
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
        {this.state.successUpdate === false ? errorSnackBar : null}
      </div>
    )
  }
}

export default withStyles(styles)(UserProfile);