

import React,{Component} from 'react';
import { routeList } from './route-list';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

export default class AppRouter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
            <Router>
                {routeList}
            </Router>
            </div>
        );
    }
}