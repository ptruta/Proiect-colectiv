import React , {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';

export default class SearchBar extends React.Component{
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
        <GridContainer classname="search-bar">
            <label>
            {/* <input type="search" value={this.state.value}
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                placeholder="Filter by category or content..." /> */}
            </label>
            <GridItem>
            <TextField
            id="standard-textarea"
            label="Filter by assignment"
            placeholder="Filter by assugnment"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            multiline
            variant="filled"
        />
        </GridItem>
        </GridContainer>
        )
    }
}