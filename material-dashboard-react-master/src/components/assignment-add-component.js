import React, { Component, Fragment } from "react";
import AddAssignment from "./add-assignment";
import Assignment from "./assignment";
import {timetableService} from '../services/timetable-service';
import subjectsService from '../services/subjects-service';
import assignmentService from '../services/assignment-service';
import AssignmentList from "./assignment-list";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import {getDateInFormat} from '../misc/time-utils';
 
import "react-datepicker/dist/react-datepicker.css";
import CardBody from "./Card/CardBody";
import CardHeader from "components/Card/CardHeader.js";
import GridItem from "./Grid/GridItem";
import GridContainer from "./Grid/GridContainer";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Card from "components/Card/Card.js";

class AssignmentForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        selectedDate : new Date(),
        title : "",
        content : ""
      }
    }
  

    formatDate(){
      return getDateInFormat(this.state.selectedDate)
    }

    changeTitle(event){
      this.setState({
        title: event.target.value
      })
    }

    changeContent(event){
      this.setState({
        content: event.target.value
      })
    }

    handleSubmit(event) {
      this.props.onSubmit({
        deadline: this.formatDate(),
        content: this.state.content
      });
      event.preventDefault();
    }

    changeDate(newDate){
      this.setState({
        selectedDate : newDate
      })
    }

    render() {
      const classes = this.props;
      return (
        <div className="post-form">
            <CardBody>
              Deadline:
              <DatePicker
           selected={this.state.selectedDate}
             onChange={this.changeDate.bind(this)}
              />
            </CardBody>
            <CardBody>
              {/* Content: */}
              <CustomInput
                        labelText="Content"
                        id="content"
                        formControlProps={{
                            fullWidth: true,
                            onChange: this.changeContent.bind(this),
                          }}
                          inputProps={{
                            onChange:(input) => this.content = input,
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                              </InputAdornment>
                            )
                          }}
                    /> 
              {/* <CustomInput type="text" ref={(input) => this.content = input} /> */}
            </CardBody>
            <CardBody>
            <CustomInput
                        labelText="Title"
                        id="title"
                        formControlProps={{
                            fullWidth: true,
                            //onChange:(input) => this.title = input,
                          }}
                          inputProps={{
                            //onChange:(input) => this.title = input,
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                              </InputAdornment>
                            )
                          }}
                    />
              {/* Title: */}
              {/* <CustomInput type="text" ref={(input) => this.content = input} /> */}
            </CardBody>
            <GridItem  xs={12} sm={12} md={12} color="primary">
              <Button color="primary" onClick={this.handleSubmit.bind(this)} className="button">Post</Button>
            </GridItem>
        </div>
      )
    }
  }

export default class AssignmentAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [

      ],
      selectedSubject : undefined,
      professor: undefined,
      assignments: []
    };

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  async handleNewPost(assgn) {

    console.log('NEW ASSG',this.state)
    if (this.state.selectedSubject == undefined){
      alert("Please select subject");
      return;
    }
    await assignmentService.addAssign(
      assgn.content, assgn.deadline, this.state.selectedSubject.value.subject.id, this.state.professor.id);

    await this.handleSelectSubject(this.state.selectedSubject)
  }

  async componentDidMount(){
    const prof = await timetableService.fetchMeInfo();
    const subjects = await subjectsService.getTaughtSubjects(prof.id);
    console.log("Subjects", subjects)
    this.setState({
      subjects: subjects,
      professor: prof,
      selectedSubject: { value : subjects[0], label : subjects[0].name}
    })
  }

  async handleSelectSubject(subject){
    this.setState({
      selectedSubject : subject
    })
    // const assignments = await newsService.getTeacherNews(subject.value.subject.id);
    // this.setState({
    //   posts: news
    // })
    
    const assignments = await assignmentService.getAssignments(subject.value.subject.id, this.state.professor.id)
    this.setState({
      assignments: assignments
    })
  }    

  mapSubjectsToOptions(subjects){
    return subjects.map(sbj => {
        return {
          value: sbj,
          label : sbj.subject.name
        }
    });
  }


  render() {
   
    console.log("ADD STATE", this.state)
    const subjects = this.mapSubjectsToOptions(this.state.subjects);
    if (subjects.length == 0){
      return null;
    }
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4>Your Subjects:</h4>
          </CardHeader>
          <CardBody>
          <Fragment style={{margin: '35px !important'}}>
      <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={subjects[0]}
      onChange={this.handleSelectSubject.bind(this)}
      name="color"
      options={subjects}
      
      />
      </Fragment>
          </CardBody>
        </Card>

      <br/>
      <br/>
      <Card>
        <CardHeader color="primary">
          <h4>Add a new Assignment</h4>
        </CardHeader>
        <CardBody>
        <AssignmentForm onSubmit={this.handleNewPost} />
        </CardBody>
      </Card>
      
      { this.state.selectedSubject !=  undefined ? <AssignmentList assignments={this.state.assignments} subject={this.state.selectedSubject.value.subject}/> : null}
      </div>
    )
  }
}
