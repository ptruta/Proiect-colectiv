
import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const props = [ "description", "deadline", "forWhat", "no"]
const classes = {
    root: {
      width: '100%',
    },
    heading: {
   
    },
  };

const own = {
    assignmentCard: {
        height: 100,
        width : 300,
        borderRadius: 25,
        display: 'flex'
    },
    cardHeader: {
        display: 'flex',
    },
    filler: {
        flexGrow: 10
    },
    cardBody:{
        display: 'flex',
        flexDirection: 'column'
    }
}

export default class StudentAssignment extends React.Component{

    render(){
        return (
            // <div>
            //     <div style={own.assignmentCard}>
            //         <div style={own.cardHeader}>
            //             <div>{this.props.forWhat}Work</div>
            //             <div style={own.filler}/>
            //             <div>#{this.props.no}</div>
            //         </div>
            //         <div style={own.cardBody}>
            //             <div>{this.props.description}</div>
            //             <div>{this.props.deadline}</div>
            //         </div>
            //     </div>

            // </div>
            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{this.props.forWhat} Work #{this.props.no}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {this.props.description}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        );

    }
}