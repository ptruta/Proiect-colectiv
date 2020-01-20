import React, {Component} from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const categories = ['General','Graph Algorithms','Parallel and Distributed Programming'];
export default class NewsForm extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        title:"",
        content:""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    changeTitle(event) {
      this.setState({
        title: event.target.value
      });
    }
    changeContent(event) {
      console.log("Event is",event)
      this.setState({
        content: event.target.value
      });
    }
    handleSubmit(event) {
      this.props.onSubmit({
        title: this.state.title,
        content: this.state.content
      });
      
      event.preventDefault();
    }
    
    render() {
      return (
        <div className="post-form">
          <div>      
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                    fullWidth: true,
                    onChange:this.changeTitle.bind(this)
                    }}
            />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                    labelText="Content"
                    id="content"
                    formControlProps={{
                    fullWidth: true,
                    onChange:this.changeContent.bind(this)
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                      }}
            />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <Button color="primary" size="lg" onClick={this.handleSubmit.bind(this)}>
                          Submit
              </Button>
              </GridItem>
          </GridContainer>
          </div>
        </div>
      )
    }
  }