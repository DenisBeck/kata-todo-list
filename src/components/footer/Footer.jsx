/* eslint-disable react/jsx-props-no-spreading */
import TasksFilter from '../tasksFilter';

import './Footer.css';

function Footer(props) {
  const { activeCount, onDeleteCompleted, ...otherProps } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter {...otherProps} />
      <button type="button" className="clear-completed" onClick={() => onDeleteCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
