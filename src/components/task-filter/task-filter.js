import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

export default class TaskFilter extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onFilterClick: PropTypes.func.isRequired,
  };

  render() {
    const { label, isActive, onFilterClick } = this.props;

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
}
