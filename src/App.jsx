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

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <TrackList
        trackList={tracks}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm handleAddTrack={handleAddTrack} />
      ) : (
        <TrackDetails selected={selected} />
      )}
    </>
  );
}