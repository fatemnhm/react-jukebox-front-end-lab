const TrackList = (props) => {
  const tracks = props.trackList.map((track) => (
    <a key={track._id} onClick={() => props.updateSelected(track)}>
      <li>{track.title} by {track.artist}</li>
    </a>
  ));

  return (
    <div>
      <h1>Track List</h1>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
      <ul>
        {!props.trackList.length ? (
          <h2>No Tracks Yet!</h2>
        ) : (
          <ul>{tracks}</ul>
        )}
      </ul>
    </div>
  );
};

export default TrackList;
