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
          // <Container component="main" maxWidth="sm" >
          <GridContainer>
            <GridItem>
               {/* <CssBaseline /> */}
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

// export default function TeacherAssignments() {
//   const classes = useStyles();
//   const [selectedClass, setSelectedClass] = React.useState('');

//   const handleChange = event => {
//       setSelectedClass(event.target.value);
//   }

//   return (

//     //  note: hide until a class is selected

    
//     <GridContainer> 
//        <GridItem xs={12} sm={12} md={12}>
//                 <FormControl style={{minWidth: 300}} className={classes.formControl}>
//                     <InputLabel id="class-label">Class</InputLabel>
//                     <Select
//                         labelId="class-label"
//                         id="class-select"
//                         value={selectedClass}
//                         onChange={handleChange}
//                     >
//                     <MenuItem value={10}>Mobile Programming - Laboratory</MenuItem>
//                     <MenuItem value={20}>Parallel and Distributed Programming - Seminary</MenuItem>
//                     <MenuItem value={30}>Parallel and Distributed Programming - Laboratory</MenuItem>
//                     </Select>
//                 </FormControl>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//             <CustomInput
//                     labelText="Title"
//                     id="title"
//                     formControlProps={{
//                     fullWidth: true
//                     }}
//             />
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}> 
//             <CustomInput
//                     labelText="Content"
//                     id="about-me"
//                     formControlProps={{
//                     fullWidth: true
//                     }}
//                     inputProps={{
//                     multiline: true,
//                     rows: 5
//                     }}
//             />
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}> 
//             <CustomInput
//                     labelText="Deadline"
//                     id="about-me"
//                     formControlProps={{
//                     fullWidth: true
//                     }}
//             />
//         </GridItem>
//         <GridItem xs={12} sm={12} md={12}>
//             <Button color="primary" size="lg">
//                 Submit
//             </Button>
//         </GridItem>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>||Assignment title||</h4>
//             <p className={classes.cardCategoryWhite}>
//               Posted || in class ||class_name||.
//             </p>
//           </CardHeader>
//           <CardBody>
//             <p>
//                 ||Assignment contents||.
//             </p>
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }
