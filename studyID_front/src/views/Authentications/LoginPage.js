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
import Header from "components/Navbars/Navbar.js"
import PropTypes from "prop-types";

import styles from "assets/jss/material-dashboard-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import loginService from 'services/login-service';
import { ErrorSnackbar } from 'components/error-snackbar';
import { Redirect } from 'react-router'

// const useStyles = makeStyles(styles);
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        cardAnimaton: "cardHidden",
        email: "",
        password: "",
        message: "",
        isLoggedIn: undefined
    }
}

componentDidMount = () => {
    setTimeout(() => {
      this.setState({ cardAnimaton: "" });
    }, 700);
  };

changeEmail(event) {
    this.setState({
        email: event.target.value
    })
    
}

changePassword(event) {
    this.setState({
        password: event.target.value
    })
}

async submitLogin(event) {
    event.preventDefault();
    const response = await loginService.loginUser(this.state.email, this.state.password);
    console.log(response);
    if(response.status == 200) {
        this.setState({ isLoggedIn: true });
        localStorage.setItem('token', response["data"]["access_token"]);
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('userType', response['data']['user_role'])
        if(response.data.user_role === "PROFESSOR") {
            this.props.history.push('/teacher');
        } else {
            this.props.history.push('/admin');
        }
    } else {
        this.setState({ isLoggedIn: false, message: "Incorrect E-mail Address or Password! Please try again."})
    }
}

restartLogin(){
    this.setState({
        isLoggedIn : undefined
    })
}

redirectToRegister() {
    const register_path = '/register';
    this.props.history.push(register_path);
}

render() {
    const { classes, ...rest } = this.props;
    const errorSnackBar = <ErrorSnackbar variant="error" message={this.state.message} onClose={this.restartLogin.bind(this)}/>;
    return (
    <div>
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
    {this.state.isLoggedIn === false ? errorSnackBar : null}
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[this.state.cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}  {...rest}>
                <h4>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                    <GridItem>
                        <p>Don't have a student account yet?</p>
                    </GridItem>
                    <GridItem>
                        <Button color="primary"
                          variant = "contained"
                          color = "primary"
                          style = {{ backgroundColor: "#750080 "}}
                          className = {classes.submit}
                          onClick = {this.redirectToRegister.bind(this)}>
                            Register
                        </Button>
                    </GridItem>
                </GridContainer>
                <CustomInput
                  labelText="E-mail Address"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange:this.changeEmail.bind(this),
                    type: "text",
                    variant: "outlined",
                    margin: "normal",
                    name: "email",
                    id:"email",
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
                    fullWidth: true
                  }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
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
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="lg"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.submitLogin.bind(this)}>
                      Sign In
                  </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  </div>
</div>
      );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(LoginPage);
