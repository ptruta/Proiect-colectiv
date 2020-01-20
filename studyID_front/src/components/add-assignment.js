import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const categories = ['General','Analiza'];
export default class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeTitle(input) {
        this.title=input;
      }
    handleSubmit(event) {
      this.props.onSubmit({
        title: this.title.value,
        content: this.content.value,
        deadline:this.deadline.value,
      });
      this.title.value='';
      this.content.value = '';
      this.deadline.value='';
      event.preventDefault();
    }
    render() {
      return (
        <div className="post-form">
          <form onSubmit={this.handleSubmit}>

            <label>
              Title:
              <input type="text" class="form-control" ref={(input) => this.title = input} />
            </label>
            <label>
              Content:
              <input type="text" ref={(input) => this.content = input} />
            </label>
            <label>
              Deadline:
              <input type="text" ref={(input) => this.deadline = input} />
            </label>
            <button className="button">Submit</button>
          </form>
        </div>
      )
    }
  }