/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Teacher from "layouts/Teacher.js";
import LoginPage from "views/Authentications/LoginPage.js";
import RegisterPage from "views/Authentications/RegisterPage.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import StudentSubjectScreen from "views/Details/SubjectDetails";
import AttendanceSheet from "views/Attendance/attendance-screen.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage}/>
      <Route path="/admin" component={Admin} />
      <Route path="/teacher" component={Teacher}/>
      <Route path="/student-subject-details" component={StudentSubjectScreen}/>
      <Route path="/teacher-attendance" component={AttendanceSheet}/>
      <Redirect exact from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
