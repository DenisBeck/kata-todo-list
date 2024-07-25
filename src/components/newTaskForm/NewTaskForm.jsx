/* eslint-disable jsx-a11y/no-autofocus */
import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
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
      const { task } = this.state;
      if (e.code === 'Enter' && task) {
        onAddTask(task);
        this.setState({
          task: '',
        });
      }
    };
  }

  render() {
    const { task } = this.state;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onChangeHandler}
        onKeyUp={this.onSubmitHandler}
        value={task}
        autoFocus
      />
    );
  }
}

NewTaskForm.defaultProps = {
  onAddTask: () => {
    alert('New Task Is Not Added');
  },
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};
