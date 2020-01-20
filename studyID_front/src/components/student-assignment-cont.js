import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StudentAssignment from './student-assignment';

const classes = {
  root: {
    width: '100%',
  },
  heading: {

  },
};

export default class StudentAssignmentContainer extends React.Component{

    constructor(props){
        super(props);
        
    }


    mapToComponent(){
        return this.props.assignments.map( assign => <StudentAssignment {...assign} /> )
    }

render(){
  return (
    <div>
        {this.mapToComponent()}
    </div>
  );
    }
}