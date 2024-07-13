import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Footer from "./components/footer";
import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";

import './App.css';

function App() {

  const tasks = [
    { id: '1', label: 'Completed task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 20)), status: 'complete' },
    { id: '2', label: 'Editing task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'editing' },
    { id: '3', label: 'Active task', created: formatDistanceToNow(new Date(2024, 6, 13, 17, 15)), status: 'active' },
  ]

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todoTasks={ tasks } />
        <Footer />
      </section>
    </section>
  );
}

export default App;
