const TruckList = (props) => {
    const trucks = props.truckList.map((truck) =>
      <a key={truck._id} onClick={() => props.updateSelected(truck)}>
        <li>{truck.title}</li>
      </a>
  );
 

return (
    <div>
      <h1>Truck List</h1>
      {!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{trucks}</ul>}
    </div>
  );

}

export default TruckList