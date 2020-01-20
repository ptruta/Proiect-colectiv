import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import GroupIcon from '@material-ui/icons/Group';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import classNames from 'classnames';
import Timetable from 'components/nex-timetable';
import moment from "moment";
import { timetableService } from 'services/timetable-service';
import PropTypes from 'prop-types';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://i.pinimg.com/originals/b8/50/b2/b850b204aa2627b3ee98224891da3f9f.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '175px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const _events = {
  monday: [
    {
      id: 1,
      name: "Lab Medii de proiectare si programare",
      type: "lab",
      startTime: moment("2018-02-23T11:00:00"),
      endTime: moment("2018-02-23T13:00:00")
    }
  ],
  tuesday: [
    {
      id: 2,
      name: "Curs Analiza",
      type: "curs",
      startTime: moment("2018-02-22T12:00:00"),
      endTime: moment("2018-02-22T14:00:00")
    },
    {
      id: 3,
      name: "Seminar Arhitectura Sistemelor de Calcul",
      type: "seminar",
      startTime: moment("2018-02-22T14:00:00"),
      endTime: moment("2018-02-22T16:00:00")
    }
  ],
  wednesday: [],
  thursday: [],
  friday: [
    {
      id: 4,
      name: "Lab Metode Avansate de Programare",
      type: "lab",
      startTime: moment("2018-02-22T08:00:00"),
      endTime: moment("2018-02-22T10:00:00")
    }
  ]
};

class StudentTimetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    const events = await timetableService.fetchTimetable();
    this.setState({ events: events });
  }

  redirectToDetails(subjectId){
    this.props.history.push('/student-subject-details', {subjectId: subjectId})
  }

  render() {
    return (
      <Container>
        <Timetable events={this.state.events} redirect={this.redirectToDetails.bind(this)}/>
      </Container>
    );
  }
}

StudentTimetable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(style)(StudentTimetable);

// const getClassByLocation = (classes, location) => {
//   if (location.includes('L')) return classes.firstRoom;
//   if (location === 'Room 2') return classes.secondRoom;
//   return classes.thirdRoom;
// };

// const Header = withStyles(style, { name: 'Header' })(({
//   children, appointmentData, classes, ...restProps
// }) => (
//   <AppointmentTooltip.Header
//     {...restProps}
//     className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
//     appointmentData={appointmentData}
//   >
//     <IconButton
//       onClick={() => alert(JSON.stringify(appointmentData))}
//       className={classes.commandButton}
//     >
//       <MoreIcon />
//     </IconButton>
//   </AppointmentTooltip.Header>
// ));

// const Content = withStyles(style, { name: 'Content' })(({
//   children, appointmentData, classes, ...restProps
// }) => (
//   <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
//     <Grid container alignItems="center">
//       <Grid item xs={2} className={classes.textCenter}>
//         <Room className={classes.icon} />
//       </Grid>
//       <Grid item xs={10}>
//         <span>{appointmentData.location}</span>
//       </Grid>
//       <Grid item xs={2} className={classes.textCenter}>
//         <GroupIcon className={classes.icon} />
//       </Grid>
//       <Grid item xs={10}>
//         <span>{appointmentData.formation}</span>
//       </Grid>
//     </Grid>
//   </AppointmentTooltip.Content>
// ));

// const CommandButton = withStyles(style, { name: 'CommandButton' })(({
//   classes, ...restProps
// }) => (
//   <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
// ));

// const theme = createMuiTheme({ palette: { type: "light", primary: pink } });

// export default class StudentTimetable extends React.Component {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         data: [
//           {
//             title: "Parallel and Distributed Programming",
//             startDate: new Date(2020, 0, 17, 12, 0),
//             endDate: new Date(2020, 0, 17, 14, 0),
//             id: 1,
//             location: "L308",
//             formation: "931/1"
//           },
//           {
//             title: "Parallel and Distributed Programming",
//             startDate: new Date(2020, 0, 17, 14, 0),
//             endDate: new Date(2020, 0, 17, 16, 0),
//             id: 2,
//             location: "L308",
//             formation: "932/1"
//           },
//           {
//             title: "Parallel and Distributed Programming",
//             startDate: new Date(2020, 0, 17, 16, 0),
//             endDate: new Date(2020, 0, 17, 18, 0),
//             id: 3,
//             location: "L308",
//             formation: "931/2"
//           },
//           {
//             title: "Parallel and Distributed Programming",
//             startDate: new Date(2020, 0, 17, 18, 0),
//             endDate: new Date(2020, 0, 17, 20, 0),
//             id: 4,
//             location: "L001",
//             formation: "932/2"
//           }
//         ]
//       };
//     }
  
//     render() {
//       const { data } = this.state;
  
//       return (
//         console.log(data),
//         <GridContainer>
//           <GridItem>
//             <h3>
//               Your schedule for the current week is:
//             </h3>
//           </GridItem>
//           <GridItem>
//           <MuiThemeProvider theme={theme}>
//             <Paper>
//               <Scheduler data={data}>
//                 <ViewState currentDate="2020-01-16" />
//                 <WeekView startDayHour={8} endDayHour={20} />
//                 <Appointments />
//                 <AppointmentTooltip
//                   headerComponent={Header}
//                   contentComponent={Content}
//                   commandButtonComponent={CommandButton}
//                   showCloseButton 
//                 />
//               </Scheduler>
//             </Paper>
//           </MuiThemeProvider>
//           </GridItem>
//         </GridContainer>
//       );
//     }
//   }