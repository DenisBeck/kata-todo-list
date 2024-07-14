import TasksFilter from "../tasksFilter";

import './Footer.css';

const Footer = (props) => {
  const { activeCount, onDeleteCompleted, ...otherProps } = props;
  return (
      <footer className="footer">
        <span className="todo-count">{ activeCount } items left</span>
        <TasksFilter {...otherProps} />
        <button className="clear-completed" onClick={ () => onDeleteCompleted() }>Clear completed</button>
      </footer>
  )
}

export default Footer;