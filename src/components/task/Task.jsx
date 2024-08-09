import { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  constructor({ id, label, onEditTask, onChangeStatus }) {
    super();

    this.state = {
      editingTask: label,
      isPlaying: false,
    };

    this.onChangeHandler = (e) => {
      this.setState({
        editingTask: e.target.value,
      });
    };

    this.onSubmitHandler = (e) => {
      const { editingTask } = this.state;
      if (e.code === 'Enter' || e.type === 'blur') {
        if (label === editingTask) {
          onChangeStatus(id, 'active');
        } else {
          onEditTask(id, { label: editingTask });
        }
      }
      if (e.code === 'Escape') {
        onChangeStatus(id, 'active');
        this.setState({
          editingTask: label,
        });
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
  }

  componentDidUpdate() {
    const { id, minutes, seconds, status, onEditTask } = this.props;
    const { isPlaying } = this.state;

    clearTimeout(this.timer);
    this.timer = null;
    let secondsCount = minutes * 60 + Number(seconds);

    if (isPlaying && secondsCount > 0 && status !== 'complete') {
      this.timer = setTimeout(() => {
        secondsCount--;
        const sec = String(secondsCount % 60);
        onEditTask(id, {
          minutes: String(Math.floor(secondsCount / 60)),
          seconds: sec.length < 2 ? `0${sec}` : sec,
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { editingTask, isPlaying } = this.state;

    const { id, label, minutes, seconds, status, created, wasEdited, onChangeStatus, onDeleteTask } = this.props;

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
            <span className="title">{label}</span>
            <span className="description">
              <button
                type="button"
                className={`icon icon-play ${status === 'complete' && 'disabled'} ${isPlaying && 'active'}`}
                onClick={() => this.onPlayTimer()}
                disabled={status === 'complete'}
                aria-label="play"
              />
              <button
                type="button"
                className={`icon icon-pause ${status === 'complete' && 'disabled'} ${!isPlaying && 'active'}`}
                onClick={() => this.onPauseTimer()}
                disabled={status === 'complete'}
                aria-label="pause"
              />
              {`${minutes}:${seconds}`}
            </span>
            <span className="created">{`${wasEdited ? 'edited' : 'created'} ${created} ago`}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => onChangeStatus(id, 'editing')}
            aria-label="edit"
          />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} aria-label="destroy" />
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
