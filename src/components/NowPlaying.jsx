const NowPlaying = (props) => {

  if (!props.selected)
    return (
      <div>
        <h1>NO TRACK IS PLAYING</h1>
      </div>
    );


  return (
    <div>
      <h1>{props.selected.title}</h1>
      <h2>Artist: {props.selected.artist}</h2>
      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
      <button onClick={() => props.handleRemoveTrack(props.selected._id)}>
          Delete
        </button>
    </div>
  );
};

export default NowPlaying;


