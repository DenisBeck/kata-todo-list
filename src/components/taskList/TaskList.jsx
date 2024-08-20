/* eslint-disable react/jsx-props-no-spreading */
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

export default TaskList;
