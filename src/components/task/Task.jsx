/* eslint-disable react/no-did-update-set-state */
import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import Timer from '../timer/Timer';

import './Task.css';

export default class Task extends Component {
  constructor({ id, label, onEditTask, onChangeStatus }) {
    super();

    this.state = {
      prevLabel: label,
      editingTask: label,
      isPlaying: true,
    };

    this.inputRef = createRef();

    this.onChangeHandler = (e) => {
      this.setState({
        editingTask: e.target.value,
      });
    };

    this.onChangeStatusHandler = () => {
      onChangeStatus(id, 'editing');
    };

    this.submitEditing = () => {
      const { editingTask } = this.state;
      onEditTask(id, { label: editingTask }, true);
    };
    this.resetEditing = () => {
      const { prevLabel } = this.state;
      onEditTask(id, { label: prevLabel }, false);
    };
    this.onSubmitHandler = (e) => {
      if (e.code === 'Escape' || e.type === 'blur') {
        this.resetEditing();
      } else if (e.code === 'Enter') {
        this.submitEditing();
      }
    };

    this.onPlayTimer = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this.onPauseTimer = () => {
      this.setState({
        isPlaying: false,
      });
    };

    this.setTimer = () => {
      const { isPlaying } = this.state;
      const { seconds, status } = this.props;

      clearTimeout(this.timer);
      this.timer = null;

      if (isPlaying && seconds > 0 && status === 'active') {
        this.timer = setTimeout(() => {
          const sec = seconds - 1;
          onEditTask(
            id,
            {
              seconds: sec,
            },
            false
          );
        }, 1000);
      }
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    const { label, status } = this.props;

    if (label !== prevProps.label || status !== prevProps.status) {
      this.setState({
        prevLabel: prevProps.label,
        editingTask: label,
      });
    }

    this.setTimer();

    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { editingTask, isPlaying } = this.state;

    const { id, label, seconds, status, created, wasEdited, onChangeStatus, onDeleteTask, selectedTab } = this.props;

    if ((selectedTab === 'Active' && status !== 'active') || (selectedTab === 'Completed' && status !== 'completed')) {
      return <li />;
    }

    return (
      <li className={status}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={status === 'completed'}
            onChange={() => onChangeStatus(id, status === 'completed' ? 'active' : 'completed')}
          />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <Timer
              isPlaying={isPlaying}
              seconds={status === 'completed' ? 0 : seconds}
              status={status}
              onPauseTimer={this.onPauseTimer}
              onPlayTimer={this.onPlayTimer}
            />
            <span className="created">{`${wasEdited ? 'edited' : 'created'} ${created} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.onChangeStatusHandler} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} aria-label="destroy" />
        </div>
        {status === 'editing' && (
          <input
            ref={this.inputRef}
            type="text"
            className="edit"
            onChange={this.onChangeHandler}
            onKeyUp={this.onSubmitHandler}
            onBlur={this.onSubmitHandler}
            value={editingTask}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
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
  status: PropTypes.oneOf(['active', 'editing', 'completed']),
  onChangeStatus: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
};
