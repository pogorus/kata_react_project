import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  };

  onPressEnter = (e) => {
    const { onAdded } = this.props;
    if (e.keyCode === 13 && e.target.value !== '') {
      onAdded(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    return (
      <input className="new-task-form" placeholder="What needs to be done?" autoFocus onKeyDown={this.onPressEnter} />
    );
  }
}
