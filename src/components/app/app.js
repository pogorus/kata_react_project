import React, { useState } from 'react';

import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

function App() {
  let nextId = 100;

  const [tasksData, setTasksData] = useState([
    { label: 'Drink Coffee', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 1 },
    { label: 'Make React App', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 2 },
    { label: 'Have a lunch', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 3 },
  ]);

  const [filterData, setFilterData] = useState([
    { label: 'All', isActive: true, id: 1 },
    { label: 'Active', isActive: false, id: 2 },
    { label: 'Comleted', isActive: false, id: 3 },
  ]);

  const deleteItem = (id) => {
    setTasksData((tasksData) => {
      const index = tasksData.findIndex((el) => el.id === id);
      return [...tasksData.slice(0, index), ...tasksData.slice(index + 1)];
    });
  };

  const addItem = (text) => {
    const newItem = {
      label: text,
      createdAt: Date.now(),
      done: false,
      hidden: false,
      editing: false,
      id: nextId++,
    };

    const activeFilter = filterData.find((el) => el.isActive === true).id;

    if (activeFilter === 3) {
      newItem.hidden = true;
    }

    setTasksData((tasksData) => {
      return [newItem, ...tasksData];
    });
  };

  const onToggleDone = (id) => {
    const activeFilter = filterData.find((el) => el.isActive === true).id;
    const newData = [...tasksData];
    newData.forEach((el) => {
      if (el.id === id) {
        el.done = !el.done;
        if (activeFilter !== 1) {
          el.hidden = !el.hidden;
        }
      }
    });

    setTasksData(() => newData);
  };

  const onDeletedAll = () => {
    const newData = tasksData.filter((el) => !el.done);
    setTasksData(() => newData);
  };

  const onFilterClick = (id) => {
    const clickIndex = filterData.findIndex((el) => el.id === id);
    const activeIndex = filterData.findIndex((el) => el.isActive === true);

    if (clickIndex !== activeIndex) {
      const newData = [...filterData];
      newData[clickIndex].isActive = true;
      newData[activeIndex].isActive = false;

      setFilterData(() => newData);
    }

    setTasksData((tasksData) => {
      if (id === 2) {
        const newData = [...tasksData];
        newData.forEach((el) => (el.done === true ? (el.hidden = true) : (el.hidden = false)));

        return newData;
      }

      if (id === 3) {
        const newData = [...tasksData];
        newData.forEach((el) => (el.done === true ? (el.hidden = false) : (el.hidden = true)));

        return newData;
      }
      const newData = [...tasksData];
      newData.forEach((el) => (el.hidden = false));

      return newData;
    });
  };

  const onEditing = (id) => {
    const newData = [...tasksData];

    newData.forEach((el) => (el.id === id ? (el.editing = true) : el.editing));

    setTasksData(() => newData);
  };

  const onEdited = (id, text) => {
    const newData = [...tasksData];
    newData.forEach((el) => {
      if (el.id === id) {
        el.label = text;
        el.editing = false;
      }
    });
    setTasksData(() => newData);
  };

  const doneCount = tasksData.filter((el) => el.done).length;
  const taskCount = tasksData.length - doneCount;

  return (
    <section className="todoapp">
      <AppHeader onAdded={addItem} />
      <section className="main">
        <TaskList
          tasks={tasksData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditing={onEditing}
          onEdited={onEdited}
        />
      </section>
      <Footer taskCount={taskCount} filterData={filterData} onDeletedAll={onDeletedAll} onFilterClick={onFilterClick} />
    </section>
  );
}

export default App;
