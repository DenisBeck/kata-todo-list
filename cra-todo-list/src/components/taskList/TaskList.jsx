import Task from "../task";

import './TaskList.css';

const TaskList = ({ todoTasks, onDeleteTask, onChangeStatus }) => {
    return (
        <ul className="todo-list">
            {todoTasks.map(item => (
                <Task 
                    {...item} 
                    onDeleteTask={ (id) => onDeleteTask(id) } 
                    onChangeStatus={ (id, statusValue) => onChangeStatus(id, statusValue) } 
                />
            ))}
        </ul>
    )
}

export default TaskList;
