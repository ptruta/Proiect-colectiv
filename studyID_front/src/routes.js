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
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import ScheduleIcon from '@material-ui/icons/Schedule';
import CreateIcon from '@material-ui/icons/Create';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LinkIcon from '@material-ui/icons/Link';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import AttendanceTable from "views/TableList/AttendanceTable.js";
import StudentNews from "views/News/StudentNews.js";
import StudentTimetable from "views/Timetables/StudentTimetable.js";
import StudentAssignments from "views/Assignments/StudentAssignments.js";
import StudentSubjectsScreen from 'views/Subjects/StudentSubjects';
import StudentSubjectScreen from 'views/Details/SubjectDetails'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "News",
    icon: Notifications,
    component: StudentNews,
    layout: "/admin"
  },
  {
    path: "/timetable",
    name: "Timetable",
    icon: ScheduleIcon,
    component: StudentTimetable,
    layout: "/admin"
  },
  {
    path: "/enrolledClasses",
    name: "Classes",
    icon: CreateIcon,
    component:StudentSubjectsScreen,
    layout:"/admin"
  },
];

export default dashboardRoutes;
