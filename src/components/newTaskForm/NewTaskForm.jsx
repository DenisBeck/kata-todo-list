/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    const { onAddTask } = props;

    this.state = {
      task: {
        label: '',
        minutes: '',
        seconds: '',
      },
    };

    this.onChangeHandler = (e) => {
      this.setState(({ task }) => ({
        task: { ...task, [e.target.name]: e.target.value },
      }));
    };

    this.onSubmitHandler = (e) => {
      e.preventDefault();
      const { task } = this.state;
      if (task.label) {
        onAddTask(task);
        this.setState({
          task: {
            label: '',
            minutes: '',
            seconds: '',
          },
        });
      }
    };
  }

  render() {
    const { label, minutes, seconds } = this.state.task;

    return (
      <form onSubmit={this.onSubmitHandler} className="new-todo-form">
        <input
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          onChange={this.onChangeHandler}
          value={label}
          required
          autoFocus
        />
        <input
          type="number"
          min="0"
          name="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onChangeHandler}
          value={minutes}
          required
          autoFocus
        />
        <input
          type="number"
          max="59"
          min="0"
          name="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onChangeHandler}
          value={seconds}
          required
          autoFocus
        />
        <button type="submit" hidden>
          Submit
        </button>
      </form>
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
