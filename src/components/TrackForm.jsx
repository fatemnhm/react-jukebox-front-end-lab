import { useState } from 'react';

const TrackForm = (props) => {
  const initialState = props.selected ? props.selected : { title: '', artist: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
      props.handleAddTrack(formData);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="title"> Title </label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="artist"> Artist </label>
        <input id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
        <button onClick={handleSubmit} type="submit">
          {props.selected ? 'Update Track' : 'Add New Track'}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;