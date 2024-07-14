import './TasksFilter.css';

const TasksFilter = ({ selectedTab, onSelectTab }) => {
  
  const tabs = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Active' },
    { id: '3', title: 'Completed' },
  ]

  return (
    <ul className="filters">
      {
        tabs.map(item => (
          <li key={ item.id }>
            <button 
              className={ item.title === selectedTab ? 'selected' : null }
              onClick={ () => onSelectTab(item.title) }
            >
              { item.title }
            </button>
          </li>
        ))
      }
    </ul>
  )
}

export default TasksFilter;