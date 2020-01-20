import React, {Component} from 'react';
import SearchBarAssignments from '../components/search-bar-assign.js';
import Paper from '@material-ui/core/Paper';
import GridContainer from './Grid/GridContainer.js';
import GridItem from './Grid/GridItem.js';
import CardHeader from './Card/CardHeader.js';
import CardBody from './Card/CardBody.js';
import Card from './Card/Card.js';


class AssignmentComponent extends React.Component{
    render() {

        const subject = this.props.subject;
        const assgn = this.props.assignment;
        const prof = this.props.prof;
        return (
  
          <div>
            <br></br>
              <Card>
                <CardHeader color="primary">
                  <p>{subject.name}</p>
                </CardHeader>
                <CardBody>
                  <p>Deadline of the assignment: {assgn.deadline}</p>
                  <p>{assgn.content}</p>
                </CardBody>
              </Card>
        </div>
        )
      }
    }


export default class AssignmentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          assignments: 
             []
          ,
          subject: undefined,
          filteredAssignments: []
        }
    
        this.handleFilter = this.handleFilter.bind(this);
      }


      componentWillReceiveProps(newProps){
        console.log('updated', newProps)
        this.state.assignments = newProps.assignments;
        this.state.filteredAssignments = newProps.assignments;
      }
    
      handleFilter(filter) {
        console.log('filter is', filter)
        filter = filter.trim()
        this.setState({
          filteredAssignments: this.state.assignments.filter((assign) =>
            this.props.subject.name.toUpperCase().includes( filter.toUpperCase()) ||
              assign.content.includes(filter) || filter === ""
          )
        });
      }
    
      render() {
          console.log("state", this.state)

        const filteredAssigns = this.state.filteredAssignments.map((assgn, index) =>
            <AssignmentComponent key={index} assignment={assgn} subject={this.props.subject} />
        );
        return (
          // <div elevation={3} style={{display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop: '100px'}}>
            <GridContainer>
            {/* <div className="feed"> */}
            <GridItem  xs={12} sm={12} md={12} color="primary">
            <SearchBarAssignments onFilter={this.handleFilter}/>
            {filteredAssigns}
            </GridItem>
             
            {/* </div> */}
            </GridContainer>
        )
      }
}