import React, {Component} from 'react';
import SearchBar from '../components/search-bar.js';
import Paper from '@material-ui/core/Paper';
import GridContainer from './Grid/GridContainer.js';
import GridItem from './Grid/GridItem.js';
import CardHeader from './Card/CardHeader.js';


class AssignmentComponent extends React.Component{
    render() {

        const subject = this.props.subject;
        const assgn = this.props.assignment;
        const prof = this.props.prof;
        return (
  
          <div>
            <br></br>
              {/* <GridItem  color="primary"> */}
              <CardHeader color="primary">{subject.name}</CardHeader>
              {/* <div className="about">
              <span className="subject">{prof.firstName} {prof.lastName}</span>
              </div> */}
              <CardHeader color="primary">{assgn.content}</CardHeader>
              
              <CardHeader color="primary">{assgn.deadline}</CardHeader>
              {/* </GridItem> */}
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
            <SearchBar onFilter={this.handleFilter}/>
            {filteredAssigns}
            </GridItem>
             
            {/* </div> */}
            </GridContainer>
        )
      }
}