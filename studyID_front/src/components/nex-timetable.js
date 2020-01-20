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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import classNames from 'classnames';
import { connectProps } from '@devexpress/dx-react-core';


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

const getClassByLocation = (classes, location) => {
  if (location.includes('L')) return classes.firstRoom;
  if (location === 'Room 2') return classes.secondRoom;
  return classes.thirdRoom;
};


const Header = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
    <IconButton
      onClick={() => { appointmentData.redirect()  }}
      className={classes.commandButton}
    >
        <ArrowForwardIcon/>
    </IconButton>
  </AppointmentTooltip.Header>
));

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Room className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
      <Grid item xs={2} className={classes.textCenter}>
        <GroupIcon className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.formation}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

const CommandButton = withStyles(style, { name: 'CommandButton' })(({
  classes, ...restProps
}) => (
  <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
));

const theme = createMuiTheme({ palette: { type: "light", primary: pink } });

export default class Timetable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
      //[
        // {
        //   title: "Parallel and Distributed Programming",
        //   startDate: new Date(2019, 11, 27, 12, 0),
        //   endDate: new Date(2019, 11, 27, 14, 0),
        //   id: 1,
        //   location: "L308",
        //   formation: "931/1"
        // },
        // {
        //   title: "Parallel and Distributed Programming",
        //   startDate: new Date(2019, 11, 27, 14, 0),
        //   endDate: new Date(2019, 11, 27, 16, 0),
        //   id: 2,
        //   location: "L308",
        //   formation: "932/1"
        // },
        // {
        //   title: "Parallel and Distributed Programming",
        //   startDate: new Date(2019, 11, 27, 16, 0),
        //   endDate: new Date(2019, 11, 27, 18, 0),
        //   id: 3,
        //   location: "L308",
        //   formation: "931/2"
        // },
        // {
        //   title: "Parallel and Distributed Programming",
        //   startDate: new Date(2019, 11, 27, 18, 0),
        //   endDate: new Date(2019, 11, 27, 20, 0),
        //   id: 4,
        //   location: "L001",
        //   formation: "932/2"
        // }
      //]
    };
  }

  componentWillReceiveProps(newProps){
      this.state.data = newProps.events;
      console.log('receiving data', newProps)
  }

  getCurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + "-" +mm + '-' + dd;
    return today;
  }

  mapRedirectToData(data){
    data.forEach( subj => {
        subj['redirect'] = () => { this.props.redirect(subj.subjectDto.id, subj.formation, subj.classType) }
    });
  }

  render() {
    const { data } = this.state;
    this.mapRedirectToData(data);

    console.log("state data", data)
    console.log("..",   {
          title: "Parallel and Distributed Programming",
          startDate: new Date(2019, 11, 27, 12, 0),
          endDate: new Date(2019, 11, 27, 14, 0),
          id: 1,
          location: "L308",
          formation: "931/1"
        },)
    connectProps(Header, () => {
      return {
        redirect : this.props.redirect
      }
    });
    return (
      <Container maxWidth="m">
        <MuiThemeProvider theme={theme}>
          <Paper>
            <Scheduler data={data}>
              <ViewState currentDate={this.getCurrentDate()}/>
              <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]}/>
              <Appointments />
              <AppointmentTooltip
                headerComponent={Header}
                contentComponent={Content}
                commandButtonComponent={CommandButton}
                showCloseButton 
                redirect={this.props.redirect}
              />
            </Scheduler>
          </Paper>
        </MuiThemeProvider>
      </Container>
    );
  }
}