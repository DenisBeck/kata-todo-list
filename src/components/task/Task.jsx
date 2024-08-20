/* eslint-disable react/no-did-update-set-state */
import { createRef, useEffect, useState } from 'react';

import Timer from '../timer/Timer';

import './Task.css';

function Task({
  id,
  label,
  seconds,
  status,
  created,
  wasEdited,
  onEditTask,
  onChangeStatus,
  onDeleteTask,
  selectedTab,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [editingLabel, setEditingLabel] = useState(label);

  const inputRef = createRef(null);

  // let timerId = null;

  const onChangeHandler = (e) => {
    setEditingLabel(e.target.value);
  };

  const onChangeStatusHandler = () => {
    onChangeStatus(id, 'editing');
  };

  const submitEditing = () => {
    onEditTask(id, { label: editingLabel }, true);
  };
  const resetEditing = () => {
    setEditingLabel(label);
    onEditTask(id, { label }, false);
  };
  const onSubmitHandler = (e) => {
    if (e.code === 'Escape' || e.type === 'blur') {
      resetEditing();
    } else if (e.code === 'Enter') {
      submitEditing();
    }
  };

  const onPlayTimer = () => {
    setIsPlaying(true);
  };

  const onPauseTimer = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    let timerId;
    if (isPlaying && seconds > 0 && status === 'active') {
      timerId = setTimeout(() => {
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
    return () => clearTimeout(timerId);
  }, [label, status, seconds, isPlaying]);

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
            onPauseTimer={onPauseTimer}
            onPlayTimer={onPlayTimer}
          />
          <span className="created">{`${wasEdited ? 'edited' : 'created'} ${created} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onChangeStatusHandler} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} aria-label="destroy" />
      </div>
      {status === 'editing' && (
        <input
          ref={inputRef}
          type="text"
          className="edit"
          onChange={onChangeHandler}
          onKeyDown={onSubmitHandler}
          onBlur={onSubmitHandler}
          value={editingLabel}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      )}
    </li>
  );
}

export default Task;
