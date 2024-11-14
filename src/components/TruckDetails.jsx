const TruckDetails = (props) => {
    if (!props.selected)
      return (
        <div>
          <h1>NO DETAILS</h1>
        </div>
      );
  
    return (
      <div>
        <h1>{props.selected.title}</h1>
        <h2>Artist: {props.selected.artist}</h2>
        <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  };
  
  export default TruckDetails;
  