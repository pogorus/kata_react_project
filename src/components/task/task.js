import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import TaskTimer from '../task-timer/task-timer';

function Task(props) {
  const onPressEnter = (e) => {
    const { onEdited } = props;
    if (e.keyCode === 13 && e.target.value !== '') {
      onEdited(e.target.value);
    }
  };

  const { label, createdAt, done, hidden, editing, onDeleted, onToggleDone, onEditing } = props;

  let classes = '';

  if (done) {
    classes += 'completed';
  }
  if (hidden) {
    classes += ' hidden';
  }
  if (editing) {
    classes += ' editing';
  }

  return (
    <li className={classes}>
      <div className="view">
        <input onChange={onToggleDone} className="toggle" type="checkbox" />
        <label>
          <span className="description">{label}</span>
          <TaskTimer />
          <span className="created">{formatDistanceToNow(createdAt, { includeSeconds: true })}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditing} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input type="text" className="edit" defaultValue={label} onKeyDown={onPressEnter} />
    </li>
  );
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onEdited: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
};

export default Task;
