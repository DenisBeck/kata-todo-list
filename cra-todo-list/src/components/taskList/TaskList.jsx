import Task from "../task";

import './TaskList.css';

const TaskList = ({ todoTasks }) => {
    return (
        <ul className="todo-list">
            {todoTasks.map(item => <Task {...item} />)}
        </ul>
    )
}

export default TaskList;
