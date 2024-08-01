import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm(props) {
  const onPressEnter = (e) => {
    const { onAdded } = props;
    if (e.keyCode === 13 && e.target.value !== '') {
      onAdded(e.target.value);
      e.target.value = '';
    }
  };

  return <input className="new-task-form" placeholder="What needs to be done?" autoFocus onKeyDown={onPressEnter} />;
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};

export default NewTaskForm;
