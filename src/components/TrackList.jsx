const TrackList = (props) => {
  return (
    <div>
      <h2>Track List</h2>
      <ul>
        {props.tracks.map((track) => (
          <li key={track._id} onClick={() => props.onSelect(track)}>
            {track.title} by {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;