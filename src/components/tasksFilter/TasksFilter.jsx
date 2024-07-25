import PropTypes from 'prop-types';
import './TasksFilter.css';

function TasksFilter(props) {
  const { selectedTab, onSelectTab } = props;

  const tabs = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Active' },
    { id: '3', title: 'Completed' },
  ];

  return (
    <ul className="filters">
      {tabs.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={item.title === selectedTab ? 'selected' : null}
            onClick={() => onSelectTab(item.title)}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.defaultProps = {
  selectedTab: 'All',
  onSelectTab: () => {
    alert('Selected Tasks cannot Be Shown');
  },
};

TasksFilter.propTypes = {
  onSelectTab: PropTypes.func,
  selectedTab: PropTypes.oneOf(['All', 'Active', 'Completed']),
};

export default TasksFilter;
