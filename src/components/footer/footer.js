import React from 'react';
import PropTypes, { number } from 'prop-types';

import TaskFilter from '../task-filter/task-filter';
import './footer.css';

function Footer(props) {
  const { filterData, taskCount, onFilterClick, onDeletedAll } = props;
  const filters = filterData.map((item) => (
    <TaskFilter
      key={item.id}
      label={item.label}
      isActive={item.isActive}
      onFilterClick={() => onFilterClick(item.id)}
    />
  ));

  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <ul className="task-filter">{filters}</ul>
      <button type="button" className="clear-completed" onClick={onDeletedAll}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onFilterClick: () => {},
  onDeletedAll: () => {},
};

Footer.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object).isRequired,
  taskCount: number.isRequired,
  onFilterClick: PropTypes.func,
  onDeletedAll: PropTypes.func,
};

export default Footer;
