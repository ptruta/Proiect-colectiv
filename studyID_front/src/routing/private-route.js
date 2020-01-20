import {  Route, Redirect } from "react-router-dom";
import React,{Component} from 'react';
import { User } from "../models/login/user";
import PropTypes from 'prop-types';
import { getUser} from '../misc/login-utils'; 



export default class PrivateRoute extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const user = getUser();
        const comp = this.props.component;
        const nextUrl = this.props.nextUrl;
        if(!user){
            return <Redirect to="/invalid"/>;
        }
        if(this.props.forStudent === undefined){
            return <Route exact path={nextUrl}  component={comp}/>
        }
        if(this.props.forStudent && user.role == "STUDENT"){
            return <Route exact path={nextUrl} component={comp}/>;
        }
        if(!this.props.forStudent && user.role == "PROFESSOR"){
            return <Route exact path={nextUrl} component={comp}/>;
        }
        return <Redirect to="/invalid"/>;
        //return <Route exact path={this.props.nextUrl} component={this.props.component}/>
    }




}