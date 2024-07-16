import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onEditing: () => {},
    onEdited: () => {},
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditing: PropTypes.func,
    onEdited: PropTypes.func,
  };

  render() {
    const { tasks, onDeleted, onToggleDone, onEditing, onEdited } = this.props;

    const elements = tasks.map((item) => (
      <Task
        key={item.id}
        {...item}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        onEditing={() => onEditing(item.id)}
        onEdited={(text) => onEdited(item.id, text)}
      />
    ));

    return <ul className="task-list">{elements}</ul>;
  }
}
