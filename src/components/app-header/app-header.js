import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';

function AppHeader(props) {
  const { onAdded } = props;
  return (
    <header className="AppHeader">
      <h1>todos</h1>
      <NewTaskForm onAdded={(text) => onAdded(text)} />
    </header>
  );
}

AppHeader.defaultProps = {
  onAdded: () => {},
};

AppHeader.propTypes = {
  onAdded: PropTypes.func,
};

export default AppHeader;
