import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddTask: () => {
      alert('New Task Is Not Added');
    },
  };

  static propTypes = {
    onAddTask: PropTypes.func,
  };

  constructor({ onAddTask }) {
    super();

    this.state = {
      task: '',
    };

    this.onChangeHandler = (e) => {
      this.setState({
        task: e.target.value,
      });
    };

    this.onSubmitHandler = (e) => {
      if (e.code === 'Enter' && this.state.task) {
        onAddTask(this.state.task);
        this.setState({
          task: '',
        });
      }
    };
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onChangeHandler}
        onKeyUp={this.onSubmitHandler}
        value={this.state.task}
        autoFocus
      />
    );
  }
}
