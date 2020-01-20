import React from 'react';
import { Container } from '@material-ui/core';
import AssignmentContainer from 'components/student-assignment-cont';
import subjectService from 'services/subjects-service'; 
import Paper from '@material-ui/core/Paper';
import NewsFeed from 'components/news-feed';
import AssignmentList from 'components/assignment-list';
import assignmentService from 'services/assignment-service'
import {animateScroll} from "react-scroll";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import routes from "routes.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


// const [image, setImage] = React.useState(bgImage);
// const [mobileOpen, setMobileOpen] = React.useState(false);
// const [color, setColor] = React.useState("blue");


//const props = [ "description", "deadline", "forWhat", "no"]

const dummy = {
    teachers : [ {firstName: 'Motogna', lastName: 'Simona' }, { firstName: 'Tirban', lastName: 'Paul'}, {firstName: 'Guran', lastName: 'Adriana'}],
    subject: {name: 'Limbaje formale si tehnici de compilare'},
    myAssignments: [
        {   
            description: "Well, it's just for looking at the contents, once. You can also just put a break point and evaluate this.props in the debugger. Nowadays, even console.log will do the job (at least in Chrome you can expand values printed like that) - and even console.log is nothing to use in production. ",    
            deadline: '2019-04-04',
            forWhat: 'Seminary',
            no : 1
        },
        {
            description: "The approach being taken for 4.0 is to strip out all the batteries included kind of features and get back to just basic routing. If you need query string parsing or async loading or Redux integration or something else very specific, then you can add that in with a library specifically for your use case. Less cruft is packed in that you don't need and you can customize things to your specific preferences and needs.",
            deadline: '2019-12-21',
            forWhat: 'Lab',
            no : 4
        }
    ]
}

export default class StudentSubjectScreen extends React.Component{

    constructor(props){
        super(props)
        const subjectId = this.props.location.state.subjectId;
        this.state = {
            subjectId : subjectId,
            teachers : [],
            news : [],
            subject: undefined,
            myAssignments: [],
            labAttendances : [],
            seminaryAttendances: [],
            news: [],
            __rawData : {}
        }
    }


    async componentDidMount(){
        const details = await subjectService.getSubjectDetails(this.state.subjectId);
        this.setState({
            subject: details.subject,
            teachers: details.professors.map(prof => prof.professor),
            __rawData: details
        })
        await this.fetchNews();
        await this.fetchAssignments();
        
    }

    async fetchNews(){
        const news = await subjectService.getNews(this.state.subjectId);
        this.setState({
            news: news
        })
    }
    async fetchAssignments(){
        const assigns = await assignmentService.getAssignments(this.state.subjectId)
        this.setState({
            myAssignments : assigns
        })
    }

    mapProffesors(profs){
        return profs.map(prof => <li>Dr. {prof.firstName} {prof.lastName}</li>)
    }
    
    render(){

        console.log('news', this.state.news)

        if (this.state.subject == undefined){
            return <h1>Subject is loading</h1>
        }
        return (
          
            <Container className="scrollable-auto">
                  
                <br></br>
                <CardHeader color="primary">
                    <h4 style={{marginTop: "0px",minHeight: "auto",fontWeight: "300",marginBottom: "3px"}}>{this.state.subject.name}</h4>
                </CardHeader>
            <br/>
            <CardBody>
            {/* <Paper elevation={3} style={{display: 'flex', flexDirection:'column', justifyContent:'center',  paddingBottom: '30px', paddingLeft: '10px'}}> */}
                {/* <div className="label">Professor list: </div> */}
                <h3>Professor list:</h3>
                {this.mapProffesors(this.state.teachers)}
            {/* </Paper> */}
            </CardBody>
            <br/><br/>
            {/* <Paper elevation={3} style={{paddingBottom: '30px'}}> */}
            <Card>
                <CardHeader color="primary">
                <h5 style={{marginTop: "0px",minHeight: "auto",fontWeight: "300",marginBottom: "3px"}}>Course news:</h5>
                </CardHeader>
                <CardBody>
                <NewsFeed posts={this.state.news} />
                </CardBody>
            </Card>
            {/* <div className="label">Course news</div> */}
            {/* <h3>Assignments</h3>
            <h5>My assignments</h5> */}
            {/* </Paper> */}
            <br/> <br/>
            <Card>
            {/* <Paper elevation={3} style={{paddingBottom: '30px'}}> */}
            <CardHeader color="primary">
                <h5 style={{marginTop: "0px",minHeight: "auto",fontWeight: "300",marginBottom: "3px"}}>Course assignments:</h5>
            </CardHeader>   
            <CardBody>       
                {/* <div className="label">Course assignments</div> */}
            <AssignmentList assignments={this.state.myAssignments} subject={this.state.subject}/>
            </CardBody>  
            {/* </Paper> */}
            </Card>
            </Container>

        );
    }
}