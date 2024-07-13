import { Component } from 'react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Footer from "./components/footer";
import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";

import './App.css';

export default class App extends Component {

  constructor () {
    super();

    this.state = {
      tasks: [
        { id: '1', label: 'Completed task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 20)), status: 'complete' },
        { id: '2', label: 'Editing task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'editing' },
        { id: '3', label: 'Active task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'active' },
      ]
    }

    this.deleteTask = (id) => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.filter(item => Number(item.id) !== Number(id));
        return {
          tasks: newTasks
        }
      });
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
    const { tasks } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList 
            todoTasks={ tasks } 
            onDeleteTask={ this.deleteTask }
            onChangeStatus={ this.changeStatus }
          />
          <Footer />
        </section>
      </section>
    );
  }
  
}

