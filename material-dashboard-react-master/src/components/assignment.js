import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

export default class Assignment extends React.Component {
    render() {
      return (
        <div className="post">
            <div className="postTitle">
            <span className="label">{this.props.value.title}</span>
            </div>
            <div className="about">
            <span>Deadline:{this.props.value.deadline}</span>
            </div>
            <div className="content">
            <span>{this.props.value.content}</span>
            </div>
            
      </div>
      )
    }
  }
