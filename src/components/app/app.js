import React, { Component } from 'react';

import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  nextId = 100;

  state = {
    tasksData: [
      { label: 'Drink Coffee', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 1 },
      { label: 'Make React App', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 2 },
      { label: 'Have a lunch', createdAt: Date.now(), done: false, hidden: false, editing: false, id: 3 },
    ],
    filterData: [
      { label: 'All', isActive: true, id: 1 },
      { label: 'Active', isActive: false, id: 2 },
      { label: 'Comleted', isActive: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ tasksData }) => {
      const index = tasksData.findIndex((el) => el.id === id);
      const newData = [...tasksData.slice(0, index), ...tasksData.slice(index + 1)];

      return {
        tasksData: newData,
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      createdAt: Date.now(),
      done: false,
      hidden: false,
      editing: false,
      id: this.nextId++,
    };

    this.setState(({ tasksData, filterData }) => {
      const activeFilter = filterData.find((el) => el.isActive === true).id;

      if (activeFilter === 3) {
        newItem.hidden = true;
      }

      const newData = [newItem, ...tasksData];
      return { tasksData: newData };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasksData, filterData }) => {
      const newData = [...tasksData];
      const activeFilter = filterData.find((el) => el.isActive === true).id;

      newData.forEach((el) => {
        if (el.id === id) {
          el.done = !el.done;
          if (activeFilter !== 1) {
            el.hidden = !el.hidden;
          }
        }
      });

      return {
        tasksData: newData,
      };
    });
  };

  onDeletedAll = () => {
    this.setState(({ tasksData }) => {
      const newData = tasksData.filter((el) => !el.done);
      return { tasksData: newData };
    });
  };

  onFilterClick = (id) => {
    this.setState(({ filterData }) => {
      const clickIndex = filterData.findIndex((el) => el.id === id);
      const activeIndex = filterData.findIndex((el) => el.isActive === true);

      if (clickIndex !== activeIndex) {
        const newData = [...filterData];
        newData[clickIndex].isActive = true;
        newData[activeIndex].isActive = false;

        return {
          filterData: newData,
        };
      }
    });

    this.setState(({ tasksData }) => {
      if (id === 2) {
        const newData = [...tasksData];
        newData.forEach((el) => (el.done === true ? (el.hidden = true) : (el.hidden = false)));

        return {
          tasksData: newData,
        };
      }
      if (id === 3) {
        const newData = [...tasksData];
        newData.forEach((el) => (el.done === true ? (el.hidden = false) : (el.hidden = true)));

        return {
          tasksData: newData,
        };
      }
      const newData = [...tasksData];
      newData.forEach((el) => (el.hidden = false));

      return {
        tasksData: newData,
      };
    });
  };

  onEditing = (id) => {
    this.setState(({ tasksData }) => {
      const newData = [...tasksData];

      newData.forEach((el) => (el.id === id ? (el.editing = true) : el.editing));

      return {
        tasksData: newData,
      };
    });
  };

  onEdited = (id, text) => {
    this.setState(({ tasksData }) => {
      const newData = [...tasksData];

      newData.forEach((el) => {
        if (el.id === id) {
          el.label = text;
          el.editing = false;
        }
      });
      return {
        tasksData: newData,
      };
    });
  };

  render() {
    const { tasksData, filterData } = this.state;
    const doneCount = tasksData.filter((el) => el.done).length;
    const taskCount = tasksData.length - doneCount;

    return (
      <section className="todoapp">
        <AppHeader onAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={tasksData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditing={this.onEditing}
            onEdited={this.onEdited}
          />
        </section>
        <Footer
          taskCount={taskCount}
          filterData={filterData}
          onDeletedAll={this.onDeletedAll}
          onFilterClick={this.onFilterClick}
        />
      </section>
    );
  }
}
