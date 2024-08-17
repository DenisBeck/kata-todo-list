/* eslint-disable react/no-did-update-set-state */
function Timer({ seconds, status, isPlaying, onPauseTimer, onPlayTimer }) {
  const taskMinutes = Math.floor(seconds / 60);
  const taskSeconds = seconds % 60;
  const taskSecondsWithZero = taskSeconds < 10 ? `0${taskSeconds}` : taskSeconds;

  return (
    <span className="description">
      <button
        type="button"
        className={`icon icon-play ${status === 'completed' && 'disabled'} ${isPlaying && 'active'}`}
        onClick={() => onPlayTimer()}
        disabled={status === 'completed'}
        aria-label="play"
      />
      <button
        type="button"
        className={`icon icon-pause ${status === 'completed' && 'disabled'} ${!isPlaying && 'active'}`}
        onClick={() => onPauseTimer()}
        disabled={status === 'completed'}
        aria-label="pause"
      />
      <span>{`${taskMinutes}:${taskSecondsWithZero}`}</span>
    </span>
  );
}

export default Timer;
