import './Task.css';

const Task = ({ id, label, status, created, onChangeStatus, onDeleteTask }) => {
    let statusClass = '';
    let toggleStatus = 'editing';
    if (status === 'complete') {
        statusClass = 'completed';
        toggleStatus = 'active'
    } else if (status === 'editing') {
        statusClass = 'editing';
    } else {
        toggleStatus = 'complete';
    }
    
    return (
        <li key={ id } className={ statusClass }>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description" onClick={ () => onChangeStatus(id, toggleStatus)}>{ label }</span>
                    <span className="created">{ `created ${created} ago` }</span>
                </label>
                <button className="icon icon-edit" onClick={ () => onChangeStatus(id, 'editing') }></button>
                <button className="icon icon-destroy" onClick={ () => onDeleteTask(id) }></button>
            </div>
            { status === 'editing' && <input type="text" class="edit" value={ label } /> }
        </li>
    )
}

export default Task;
