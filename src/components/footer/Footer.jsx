/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

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

Footer.defaultProps = {
  onDeleteCompleted: () => {
    alert('Completed Tasks cannot Be Removed');
  },
};

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  onDeleteCompleted: PropTypes.func,
};

export default Footer;
