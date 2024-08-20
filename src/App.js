import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Footer from './components/footer';
import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';

import './App.css';

const initialTasks = [
  {
    id: '1',
    label: 'Completed task',
    seconds: 12 * 60 + 25,
    created: formatDistanceToNow(new Date(2024, 6, 13, 17, 20), { includeSeconds: true }),
    status: 'completed',
    wasEdited: false,
  },
  {
    id: '2',
    label: 'Editing task',
    seconds: 12 * 60 + 25,
    created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15), { includeSeconds: true }),
    status: 'editing',
    wasEdited: false,
  },
  {
    id: '3',
    label: 'Active task',
    seconds: 12 * 60 + 25,
    created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15), { includeSeconds: true }),
    status: 'active',
    wasEdited: false,
  },
];

let maxId = 100;

function App() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [tasks, setTasks] = useState(initialTasks);

  const activeCount = tasks.filter((item) => item.status !== 'completed').length;

  const selectTab = (title) => {
    setSelectedTab(title);
  };

  const addTask = ({ label, minutes, seconds }) => {
    const newTask = {
      id: maxId++,
      label,
      seconds: minutes * 60 + +seconds,
      created: formatDistanceToNow(new Date(), { includeSeconds: true }),
      status: 'active',
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id, valueObject, isCreatedChanged) => {
    setTasks((t) => {
      const newTasks = t.map((item) => {
        if (item.id === id) {
          const { created } = item;
          const newItem = {
            ...item,
            ...valueObject,
            created: isCreatedChanged ? formatDistanceToNow(new Date()) : created,
            wasEdited: isCreatedChanged,
            status: 'active',
          };
          return newItem;
        }
        return item;
      });
      return newTasks;
    });
  };

  const deleteCompleted = () => {
    const newTasks = tasks.filter((item) => item.status !== 'completed');
    setTasks(newTasks);
  };

  const changeStatus = (id, statusValue) => {
    setTasks((t) => {
      const changedTasks = t
        .map((item) => {
          if (item.status === 'editing') {
            const newItem = { ...item };
            newItem.status = 'active';
            return newItem;
          }
          return item;
        })
        .map((item) => {
          if (Number(item.id) === Number(id)) {
            const newItem = { ...item };
            newItem.status = statusValue;
            return newItem;
          }
          return item;
        });
      return changedTasks;
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todoTasks={tasks}
          selectedTab={selectedTab}
          onDeleteTask={deleteTask}
          onChangeStatus={changeStatus}
          onEditTask={editTask}
        />
        <Footer
          activeCount={activeCount}
          selectedTab={selectedTab}
          onSelectTab={selectTab}
          onDeleteCompleted={deleteCompleted}
        />
      </section>
    </section>
  );
}

export default App;
