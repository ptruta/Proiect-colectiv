import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "assets/jss/material-dashboard-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import registerService from 'services/register-service';
import { ErrorSnackbar } from 'components/error-snackbar';
import PropTypes from "prop-types";

// const useStyles = makeStyles(styles);

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      snackbarMessage: "",
      successRegister: undefined,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      group: "",
      repeatedPassword: "",
      departments: {},
      groups: {},
      selectedDepartment: "",
      selectedYear: "",
      selectedDeptID: "",
      yearSelectionDisabled: true,
      groupSelectionDisabled: true
    };
  }

   async componentDidMount() {
    const departments = await registerService.getDepartments();
    if (departments.status === 200) {
      setTimeout(() => { this.setState({ cardAnimaton: "", departments: departments.data })}, 700);
    } else {
      setTimeout(() => { this.setState({ cardAnimaton: "", snackbarMessage: "Internal error! Departments could not be fetched!" })}, 700);
    }
  }

  async componentDidUpdate() {
    if (this.state.selectedYear !== "") {
      const deptID = this.determineDepartmentID(this.state.selectedYear);
      if (deptID !== this.state.selectedDeptID) {
        const detereminedGroups = await registerService.getGroups(deptID);
        if (detereminedGroups.status === 200) {
          this.setState({
            groups: detereminedGroups.data,
            selectedDeptID: deptID
          });
        } else {
          this.setState({ snackbarMessage: "Internal error! Groups could not be fetched!" });
        }
      }
    }
  }

  createGroupsSelectItems() {
    let items = [];
    if (typeof this.state.groups !== "undefined") {
      for (let i = 0; i < this.state.groups.length; i++) {
        items.push(
          <MenuItem value={this.state.groups[i]}>
            {this.state.groups[i]}
          </MenuItem>
        );
      }
      return items;
    }
  }

  createDepartmentsSelectItems() {
    let items_deps = [];
    let items = [];
    for (let i = 0; i < this.state.departments.length; i++) {
      let item = this.state.departments[i];
      let depName = item.name;
      let exists = false;
      for (let j = 0; j < items_deps.length; j++) {
        if (depName == items_deps[j]) exists = true;
      }
      if (exists == false) {
        items_deps.push(depName);
      }
    }
    items_deps.sort();
    for (let k = 0; k < items_deps.length; k++) {
      items.push(<MenuItem value={items_deps[k]}>{items_deps[k]}</MenuItem>);
    }
    return items;
  }

  createYearsSelecItems() {
    let items = [];
    for (let year = 1; year <= 3; year++) {
      items.push(
        <MenuItem value={year.toLocaleString()}>
          {year.toLocaleString()}
        </MenuItem>
      );
    }
    return items;
  }

  changeIsTeacher(event) {
    this.setState({
      isTeacher: event.target.value
    });
  }

  changeFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  changeLastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  changeRepeatedPassword(event) {
    this.setState({
      repeatedPassword: event.target.value
    });
  }

  changeGroup(event) {
    this.setState({
      group: event.target.value
    });
  }

  async submitRegister(event) {
    event.preventDefault();

    const email = this.state.email;
    const firstName = this.state.firstName;
    const group = this.state.group;
    const lastName = this.state.lastName;
    const password = this.state.password;

    let fieldVerification = "";
    if (email == "") {
      fieldVerification += "Please input your SCS e-mail address. ";
    }
    if (firstName == "" || lastName == "") {
      fieldVerification += "Please input your full name in the corresponding fields. ";
    }
    if (group == "") {
      fieldVerification += "Please input your department, year and group information. ";
    }
    if (password.length < 8) {
      fieldVerification += "Chosen password is too simple! Please make sure it contains at least eight characters.";
    }
    if (password != this.state.repeatedPassword) {
      fieldVerification += "Passwords do not match!";
    }
      
    if (fieldVerification == "") {
      const result = await registerService.registerStudent(firstName, lastName, email, password, group);
      if (result.status === 201) {
        this.redirectToLogin(event);
      } else {
        let errorMessage = '';
        if (result.status === 409) {
          errorMessage = result.data.exceptions.message;
        } else {
          for (const msg in result.data.exceptions) {
            errorMessage += result.data.exceptions[msg].message;
            errorMessage += ". ";
          } 
        }
        this.setState({
          snackbarMessage: errorMessage,
          successRegister: false
        });
      }
    } else {
      this.setState({
        snackbarMessage: fieldVerification,
        successRegister: false
      });
    }
  }

  async redirectToLogin(event) {
    const login_path = "/login";
    //const sbjs = await subjectService.enrollAfterRegister();
    //console.log("Subjects registered", sbjs);
    this.props.history.push(login_path);
  }

  selectionDepartment(event) {
    this.setState({
      yearSelectionDisabled: false,
      selectedDepartment: event.target.value
    });
  }

  selectionYear(event) {
    const selectedYear = event.target.value;
    this.setState({
      groupSelectionDisabled: false,
      selectedYear: selectedYear
    });
  }

  determineDepartmentID(selectedYear) {
    let selectedDept = this.state.selectedDepartment;
    for (let i = 0; i < this.state.departments.length; i++) {
      let dept = this.state.departments[i].name;
      let year = this.state.departments[i].year;
      if (year == selectedYear && selectedDept == dept) {
        return this.state.departments[i].id.toLocaleString();
      }
    }
  }

  restardRegister() {
    this.setState({
      successRegister : undefined
    })
}

  render() {
    const { classes, ...rest } = this.props;
    const errorSnackBar = <ErrorSnackbar variant="error" message={this.state.snackbarMessage} onClose={this.restardRegister.bind(this)}/>;
    return (
      <div>
      {this.state.successRegister === false ? errorSnackBar : null}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }} >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader} {...rest}>
                    <h4>Register</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                        <GridItem>
                            <p>Have an account already?</p>
                        </GridItem>
                        <GridItem>
                            <Button color="primary"
                              onClick={this.redirectToLogin.bind(this)}>
                                Log In
                            </Button>
                        </GridItem>
                    </GridContainer>
                    <CustomInput
                        labelText="First Name"
                        id="firstName"
                        formControlProps={{
                            fullWidth: true,
                            onChange:this.changeFirstName.bind(this),
                          }}
                          inputProps={{
                            onChange:this.changeFirstName.bind(this),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                    />
                    <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        formControlProps={{
                            fullWidth: true,
                            onChange:this.changeLastName.bind(this)
                          }}
                          inputProps={{
                            onChange:this.changeLastName.bind(this),
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                    />
                    <CustomInput
                      labelText="E-mail Address"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        onChange:this.changeEmail.bind(this)
                      }}
                      inputProps={{
                        onChange:this.changeEmail.bind(this),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        onChange:this.changePassword.bind(this)
                      }}
                      inputProps={{
                        onChange:this.changePassword.bind(this),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomInput
                      labelText="Repeat Password"
                      id="repeatedPassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.changeRepeatedPassword.bind(this),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <br />
                    <br />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel type="text" id="departmentLabel">Department</InputLabel>
                            <Select
                                value={this.state.selectedDepartment}
                                labelId="departmentLabel"
                                id="departmentSelect"
                                type="text"
                                onChange={this.selectionDepartment.bind(this)}
                            >
                            {this.createDepartmentsSelectItems()}
                            </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="yearLabel">Study Year</InputLabel>
                        <Select
                            disabled={
                                this.state.yearSelectionDisabled ? "disabled" : ""
                            }
                            value={this.state.selectedYear}
                            onChange={this.selectionYear.bind(this)}
                            labelId="yearLabel"
                            id="yearSelect"
                        >
                        {this.createYearsSelecItems()}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="groupLabel">Group</InputLabel>
                        <Select
                            disabled= { this.state.groupSelectionDisabled ? "disabled" : "" }  
                            onChange={this.changeGroup.bind(this)} 
                            labelId="groupLabel"
                            id="groupSelect"
                            ref="groupSelect"
                            value={this.state.group}
                        >
                        {this.createGroupsSelectItems()}
                        </Select>
                    </FormControl> 
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                      <Button color="primary" size="lg"
                          onClick={this.submitRegister.bind(this)}>
                          Sign In
                      </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>);
    }
  }

  
RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RegisterPage);