import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h2>Hello, World</h2>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Holidays at a glance:</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Starting Date", "Ending Date", "Description"]}
                tableData={[
                  ["23.12.2019", "05.01.2020", "Winder Holiday"],
                  ["10.01.2020", "16.02.2020", "Intersemestrial Break"],
                  ["24.01.2020", "-", "Union Day"],
                  ["20.04.2020", "26.04.2020", "Spring Break / Easer Holiday"],
                  ["01.05.2020", "-", "Labour Day"],
                  ["01.06.2020", "-", "International Children's Day"],
                  ["08.06.2020", "-", "2nd Day of Pentecost"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Useful Links:</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableData={[
                  [<a href="https://www.ubbcluj.ro/ro/">University Website</a>],
                  [<a href="http://www.cs.ubbcluj.ro/">Faculty Website</a>],
                  [<a href="https://moodle.cs.ubbcluj.ro/">Moodle</a>],
                  [<a href="http://www.cs.ubbcluj.ro/files/orar/2019-1/">Official Timetable for the Entire Faculty</a>],
                  [<a href="https://www.scs.ubbcluj.ro/webmail/">SCS Webmail</a>]
                ]}
              >
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
