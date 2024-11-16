import { useState, useEffect } from 'react';

// Services
import * as trackService from './services/tracksService';

// Components
import TrackList from './components/TrackList';
import TrackDetails from './components/TrackDetails';
import TrackForm from './components/TrackForm';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function getTracks() {
      try {
        const allTracks = await trackService.index();
        if (allTracks.error) {
          throw new Error(allTracks.error);
        }
        setTracks(allTracks);
      } catch (error) {
        console.log(error);
      }
    }

    getTracks();
  }, []);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleCreate = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([...tracks, newTrack]);
      toggleForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);
      setTracks(tracks.map(track => (track.id === trackId ? updatedTrack : track)));
      setSelected(updatedTrack);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (trackId) => {
    try {
      await trackService.deleteTrack(trackId);
      setTracks(tracks.filter(track => track.id !== trackId));
      setSelected(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Track Manager</h1>
      <button onClick={toggleForm}>
        {isFormOpen ? 'Close Form' : 'Add New Track'}
      </button>
      {isFormOpen && <TrackForm onSubmit={handleCreate} />}
      <TrackList tracks={tracks} onSelect={updateSelected} />
      {selected && (
        <TrackDetails
          track={selected}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}