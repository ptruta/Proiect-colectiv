import React, {Component, Fragment} from 'react';
import NewsForm from './news-form';
import NewsFeed from './news-feed';
import SearchBar from './search-bar';
import {timetableService } from '../services/timetable-service'
import newsService  from '../services/news-service'
import subjectsService from '../services/subjects-service';
import Select from 'react-select'
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";

export default class TeacherNewsFeed extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          posts: [
           
          ],
          subjects: [

          ],
          selectedSubject : undefined,
          professor: undefined
        }
    
        this.handleNewPost = this.handleNewPost.bind(this);
      }
      async componentDidMount(){
        const prof = await timetableService.fetchMeInfo();
        const subjects = await subjectsService.getTaughtSubjects(prof.id);
        this.setState({
          subjects: subjects,
          professor: prof
        })
      }
    
      async handleNewPost(post) {

        if (this.state.selectedSubject == undefined){
          alert("Please select subject");
          return;
        }
        await newsService.addNews( {
          title: post.title,
          content: post.content,
          subjectId: this.state.selectedSubject.value.subject.id
        })
        
        await this.handleSelectSubject(this.state.selectedSubject)
      }


      async handleSelectSubject(subject){
        this.setState({
          selectedSubject : subject
        })
        const news = await newsService.getTeacherNews(subject.value.subject.id);
        this.setState({
          posts: news
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

        const subjects = this.mapSubjectsToOptions(this.state.subjects);
        if (subjects.length == 0){
          return null;
        }
        return (
          <div className="feed" style={{display: 'flex', flexDirection: 'column', justifyContent:'space-between'}}>
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
            <h4>Post a new Announcement</h4>
            </CardHeader>
            <CardBody>
            <NewsForm onSubmit={this.handleNewPost.bind(this)} />
            </CardBody>
          </Card>
            
          <NewsFeed posts={this.state.posts}/>
          </div>
        )
      }
}