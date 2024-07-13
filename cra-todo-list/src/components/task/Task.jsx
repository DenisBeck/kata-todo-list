import './Task.css';

const Task = ({ id, label, status, created }) => {
    let statusClass = '';
    if(status === 'complete') {
        statusClass = 'completed';
    } else if (status === 'editing') {
        statusClass = 'editing';
    }

    return (
        <li key={ id } className={ statusClass }>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{ label }</span>
                    <span className="created">{ `created ${created} ago` }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            { status === 'editing' && <input type="text" class="edit" value="Editing task" /> }
        </li>
    )
}

export default Task;
