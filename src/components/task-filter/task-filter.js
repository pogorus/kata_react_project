import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

function TaskFilter(props) {
  const { label, isActive, onFilterClick } = props;

  let classes = '';
  if (isActive) {
    classes += 'selected';
  }

  return (
    <li>
      <button type="button" className={classes} onClick={onFilterClick}>
        {label}
      </button>
    </li>
  );
}

TaskFilter.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default TaskFilter;
