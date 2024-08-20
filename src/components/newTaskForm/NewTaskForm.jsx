/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState({
    label: '',
    minutes: '',
    seconds: '',
  });

  const onChangeHandler = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newTask.label && newTask.minutes && newTask.seconds) {
      onAddTask(newTask);
    }
    setNewTask({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  const { label, minutes, seconds } = newTask;

  return (
    <form onSubmit={onSubmitHandler} className="new-todo-form">
      <input
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        onChange={onChangeHandler}
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
        onChange={onChangeHandler}
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
        onChange={onChangeHandler}
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

export default NewTaskForm;
