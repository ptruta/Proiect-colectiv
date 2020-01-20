import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
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
import StudentAssignment from '../../components/student-assignment.js';
import PropTypes from 'prop-types'
import AssignmentList from '../../components/assignment-list.js'

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


// class StudentAssignmentContainer extends React.Component{

//   constructor(props){
//       super(props);
//       this.state = {
//         selectedClass: '',
//         setSelectedClass: '',
//       };
//   }

//   mapToComponent(){
//     return this.props.assignments.map( assign => <StudentAssignment {...assign} /> )
// }

// render(){
//   const { ...assign } = this.props.assignments.map(assign => <StudentAssignment {...assign}/>);
// return (
  
//   <div>
//       {this.mapToComponent()}
//   </div>
// );
//   }
// }

  
// StudentAssignmentContainer.propTypes = {
//   classes: PropTypes.object.isRequired
// };
// export default withStyles(styles)(StudentAssignmentContainer);

class StudentAssignments extends React.Component{
  
  constructor(props){
          super(props);
          this.state = {
            assignments: []
          };
      }
  render(){
  return (

    <AssignmentList />);
  }
}
StudentAssignments.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(StudentAssignments);
    //  note: hide until a class is selected
    // <GridContainer> 
    //   <GridItem xs={12} sm={12} md={12}>
    //     <FormControl style={{minWidth: 300, marginLeft: 20}} className={classes.formControl}>
    //         <InputLabel id="class-label">Class</InputLabel>
    //         <Select
    //             labelId="class-label"
    //             id="class-select"
    //             value={selectedClass}
    //             onChange={handleChange}
    //         >
    //         <MenuItem value={10}>Mobile Programming - Laboratory</MenuItem>
    //         <MenuItem value={20}>Parallel and Distributed Programming - Seminary</MenuItem>
    //         <MenuItem value={30}>Parallel and Distributed Programming - Laboratory</MenuItem>
    //     </Select>
    //   </FormControl>
    //   </GridItem>
    //   <GridItem xs={12} sm={12} md={12}>
    //     <Card>
    //       <CardHeader color="primary">
    //         <h4 className={classes.cardTitleWhite}>||Assignment title||</h4>
    //         <p className={classes.cardCategoryWhite}>
    //           Posted by ||teacher_name|| in class ||class_name||.
    //         </p>
    //       </CardHeader>
    //       <CardBody>
    //         <p>
    //             ||Assignment contents||.
    //         </p>
    //       </CardBody>
    //     </Card>
    //   </GridItem>
    // </GridContainer>
//   );
// }
