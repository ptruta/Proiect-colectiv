import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from "components/Card/CardHeader.js";
import FormControl from '@material-ui/core/FormControl';
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import AssignmentAddComponent from 'components/assignment-add-component.js';
import PropTypes from 'prop-types';
import Button from "components/CustomButtons/Button.js";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

// const useStyles = makeStyles(styles);

class TeacherAssignments extends React.Component {
   
  render() {
      return(
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                  <AssignmentAddComponent/>
            </GridItem>  
          </GridContainer>
          
      );
  }
}
TeacherAssignments.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TeacherAssignments);
