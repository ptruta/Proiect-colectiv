import React , {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';

export default class SearchBarAssignments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        if (event.target.value === '') {
        this.props.onFilter('');
        }
    }

    handleKeyUp(event) {
        if (event.key === 'Enter') {
        this.props.onFilter(this.state.value);
        }
    }

    render() {
        return (
            <TextField
                fullWidth
                id="standard-textarea"
                label="Filter by Assignment Content"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                multiline
            variant="filled"
            />
        )
    }
}