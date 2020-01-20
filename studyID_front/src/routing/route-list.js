import {Route} from 'react-router-dom';
import App from '../App';
import LoginPage from 'views/Authentications/LoginPage.js';
import PrivateRoute from './private-route';
import React from 'react';
// import NewsScreen from '../screens/news-screen';
// import TimetableScreen from '../screens/timetable-screen';
// import TeacherNewsScreen from '../screens/teacher-news-screen';
// import TeacherAssignmentsScreen from '../screens/teacher-assignments-screen';
// import TeacherSubjectsScreen from '../screens/teacher-subjects-screen';
// import TeacherLanding from '../screens/teacher-landing-page';
// import StudentLanding from '../screens/student-landing-page';
// import TeacherTimetable from '../screens/teacher-timetable-screen';
// import AttendanceSheet from '../screens/attendance-screen';
// import StudentSubjectsScreen from '../screens/student-subjects-screen';
// import StudentSubjectDetailScreen from '../screens/subject-details-screen';

export const routeList = [
    <Route exact path="/" component={App}/>,
    <Route exact path="/login" component={LoginPage}/>,
    // <Route exact path="/register" component={RegisterScreen}/>,
    // <Route exact path="/invalid" component={App}/>,
    // <Route exact path="/teacher" component={TeacherLanding}/>,
    // <Route exact path='/student' component={StudentLanding}/>,
    // <Route exact path="/news" component={NewsScreen}/>,
    // <Route exact path="/teacher-news" component={TeacherNewsScreen}/>,
    // <Route exact path="/teacher-assignment" component={TeacherAssignmentsScreen}/>,
    // <Route exact path="/teacher-subjects" component={TeacherSubjectsScreen}/>,
    // <Route exact path="/teacher-timetable" component={TeacherTimetable}/>,
    // <Route exact path="/teacher-attendance" component={AttendanceSheet}/>,
    // <Route exact path="/subjects" component={StudentSubjectsScreen}/>,
    // <PrivateRoute nextUrl="/timetable" forStudent={true} component={TimetableScreen}/>,
    // <PrivateRoute nextUrl="/success" forStudent={true} component={App}/>,
    // <PrivateRoute nextUrl="/student-subject-details" forStudent={true} component={StudentSubjectDetailScreen}/>
];
