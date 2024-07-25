/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

import Task from '../task';

import './TaskList.css';

function TaskList(props) {
  const { todoTasks, ...otherProps } = props;
  return (
    <ul className="todo-list">
      {todoTasks.map((item) => (
        <Task key={item.id} {...item} {...otherProps} />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  todoTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskList;
