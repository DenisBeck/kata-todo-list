import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Footer from './components/footer';
import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    let maxId = 100;

    this.state = {
      tasks: [
        {
          id: '1',
          label: 'Completed task',
          seconds: 12 * 60 + 25,
          created: formatDistanceToNow(new Date(2024, 6, 13, 17, 20), { includeSeconds: true }),
          status: 'completed',
          wasEdited: false,
        },
        {
          id: '2',
          label: 'Editing task',
          seconds: 12 * 60 + 25,
          created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15), { includeSeconds: true }),
          status: 'editing',
          wasEdited: false,
        },
        {
          id: '3',
          label: 'Active task',
          seconds: 12 * 60 + 25,
          created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15), { includeSeconds: true }),
          status: 'active',
          wasEdited: false,
        },
      ],
      selectedTab: 'All',
    };

    this.selectTab = (title) => {
      this.setState({ selectedTab: title });
    };

    this.addTask = ({ label, minutes, seconds }) => {
      this.setState((state) => {
        const { tasks } = state;
        const newTask = {
          id: maxId++,
          label,
          seconds: minutes * 60 + +seconds,
          created: formatDistanceToNow(new Date(), { includeSeconds: true }),
          status: 'active',
        };
        return { ...state, tasks: [...tasks, newTask] };
      });
    };

    this.deleteTask = (id) => {
      this.setState((state) => {
        const { tasks } = state;
        const newTasks = tasks.filter((item) => item.id !== id);
        return { ...state, tasks: newTasks };
      });
    };

    this.editTask = (id, valueObject, isCreatedChanged) => {
      this.setState((state) => {
        const { tasks } = state;
        const newTasks = tasks.map((item) => {
          if (item.id === id) {
            const { created } = item;
            const newItem = {
              ...item,
              ...valueObject,
              created: isCreatedChanged ? formatDistanceToNow(new Date()) : created,
              wasEdited: isCreatedChanged,
              status: 'active',
            };
            return newItem;
          }
          return item;
        });
        return { ...state, tasks: newTasks };
      });
    };

    this.deleteCompleted = () => {
      this.setState((state) => {
        const newTasks = state.tasks.filter((item) => item.status !== 'complete');
        return {
          ...state,
          tasks: newTasks,
        };
      });
    };

    this.changeStatus = (id, statusValue) => {
      this.setState((state) => {
        const { tasks } = state;

        const changedTasks = tasks
          .map((item) => {
            if (item.status === 'editing') {
              const newItem = { ...item };
              newItem.status = 'active';
              return newItem;
            }
            return item;
          })
          .map((item) => {
            if (Number(item.id) === Number(id)) {
              const newItem = { ...item };
              newItem.status = statusValue;
              return newItem;
            }
            return item;
          });

        return { ...state, tasks: changedTasks };
      });
    };
  }

  render() {
    const { selectedTab, tasks } = this.state;
    const activeCount = tasks.filter((item) => item.status !== 'complete').length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todoTasks={tasks}
            selectedTab={selectedTab}
            onDeleteTask={this.deleteTask}
            onChangeStatus={this.changeStatus}
            onEditTask={this.editTask}
          />
          <Footer
            activeCount={activeCount}
            selectedTab={selectedTab}
            onSelectTab={this.selectTab}
            onDeleteCompleted={this.deleteCompleted}
          />
        </section>
      </section>
    );
  }
}
