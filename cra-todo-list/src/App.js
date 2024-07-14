import { Component } from 'react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Footer from "./components/footer";
import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";

import './App.css';

export default class App extends Component {

  constructor () {
    super();

    let maxId = 100;

    this.state = {
      tasks: [
        { id: '1', label: 'Completed task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 20)), status: 'complete' },
        { id: '2', label: 'Editing task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'editing' },
        { id: '3', label: 'Active task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'active' },
      ],
      selectedTab: 'All'
    }

    this.getFilteredTasks = (state) => {
      const { tasks, selectedTab } = state;
      return tasks.filter(item => {
        switch (selectedTab) {
          case 'All': 
            return true;
          case 'Completed':
            return item.status === 'complete';
          default:
            return item.status !== 'complete';
        }
      })
    }

    this.selectTab = (title) => {
      this.setState({ selectedTab: title })
    }

    this.addTask = (text) => {
      this.setState(({ tasks }) => {
        const newTask = {
          id: maxId++,
          label: text,
          created: formatDistanceToNow(new Date()),
          status: 'active'
        }

        return {
          tasks: [...tasks, newTask]
        }
      })
    }

    this.deleteTask = (id) => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.filter(item => Number(item.id) !== Number(id));
        return {
          tasks: newTasks
        }
      });
    }

    this.deleteCompleted = () => {
      this.setState((state) => {
        const newTasks = state.tasks.filter(item => item.status !== 'complete');
        return {
          ...state, tasks: newTasks
        }
      })
    }

    this.changeStatus = (id, statusValue) => {
      if (statusValue === 'editing') {
        this.setState(({ tasks }) => { 
          const notEditing = tasks.map(item => {
            if (item.status === 'editing') {
              item.status = 'active';
            }
            return item;
          })
          return {
            tasks: notEditing
          }
        })
      }
      this.setState(({ tasks }) => {
        const changedTasks = tasks.map(item => {
          if (Number(item.id) === Number(id)) {
            item.status = statusValue;
          }
          return item;
        });
        return {
          tasks: changedTasks
        }
      })
    }
  }

  render () {
    const { selectedTab, tasks } = this.state;
    const filteredTasks = this.getFilteredTasks(this.state);
    const activeCount = tasks
                          .filter(item => item.status !== 'complete')
                          .length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={ this.addTask } />
        </header>
        <section className="main">
          <TaskList 
            todoTasks={ filteredTasks } 
            onDeleteTask={ this.deleteTask }
            onChangeStatus={ this.changeStatus }
          />
          <Footer 
            activeCount={ activeCount }
            selectedTab={ selectedTab }
            onSelectTab={ this.selectTab } 
            onDeleteCompleted={ this.deleteCompleted }
          />
        </section>
      </section>
    );
  }
  
}

