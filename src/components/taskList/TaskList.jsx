import PropTypes from 'prop-types';

import Task from '../task';

import './TaskList.css';

const TaskList = (props) => {
  const { todoTasks, ...otherProps } = props;
  return (
    <ul className="todo-list">
      {todoTasks.map((item) => (
        <Task key={item.id} {...item} {...otherProps} />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  todoTasks: PropTypes.array.isRequired,
};

export default TaskList;
