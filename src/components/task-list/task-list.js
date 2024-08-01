import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

function TaskList(props) {
  const { tasks, onDeleted, onToggleDone, onEditing, onEdited } = props;

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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditing: PropTypes.func,
  onEdited: PropTypes.func,
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditing: () => {},
  onEdited: () => {},
};

export default TaskList;
