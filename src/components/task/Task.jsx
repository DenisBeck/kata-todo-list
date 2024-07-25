import { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  constructor({ id, label, onEditTask }) {
    super();

    this.state = {
      editingTask: label,
    };

    this.onChangeHandler = (e) => {
      this.setState({
        editingTask: e.target.value,
      });
    };

    this.onSubmitHandler = (e) => {
      const { editingTask } = this.state;
      if (e.code === 'Enter' || e.type === 'blur') {
        onEditTask(id, editingTask);
      }
    };
  }

  render() {
    const { editingTask } = this.state;

    const { id, label, status, created, wasEdited, onChangeStatus, onDeleteTask } = this.props;

    let statusClass = null;
    if (status === 'complete') {
      statusClass = 'completed';
    } else if (status === 'editing') {
      statusClass = 'editing';
    }

    return (
      <li className={statusClass}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={status === 'complete'}
            onChange={() => onChangeStatus(id, status === 'complete' ? 'active' : 'complete')}
          />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">{`${wasEdited ? 'edited' : 'created'} ${created} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onChangeStatus(id, 'editing')}>
            {' '}
          </button>
          <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)}>
            {' '}
          </button>
        </div>
        {status === 'editing' && (
          <input
            type="text"
            className="edit"
            onChange={this.onChangeHandler}
            onKeyUp={this.onSubmitHandler}
            onBlur={this.onSubmitHandler}
            value={editingTask}
          />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  wasEdited: false,
  status: 'active',
  onChangeStatus: () => {
    alert('Task Status Is Not Changed');
  },
  onDeleteTask: () => {
    alert('Task Is Not Removed');
  },
  onEditTask: () => {
    alert('Task Cannot Be Edited');
  },
};

Task.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  wasEdited: PropTypes.bool,
  status: PropTypes.oneOf(['active', 'editing', 'complete']),
  onChangeStatus: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
};
