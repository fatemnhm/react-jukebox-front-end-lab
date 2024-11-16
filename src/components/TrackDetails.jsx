const TrackDetails = (props) => {
  // return if props.selected is null
  if (!props.selected)
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );

  // Function to handle delete
  const handleDelete = () => {
    props.handleDeleteTrack(props.selected._id);
  };

  return (
    // return statement if props.selected has a truthy value
    <div>
      <h1>{props.selected.title}</h1>
      <h2>Artist: {props.selected.artist}</h2>
      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TrackDetails;
