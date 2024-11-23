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

  // Load API data when the component mounts
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

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }

      const newTracksList = tracks.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );

      setTracks(newTracksList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormView = (track) => {
    if (!track.title) {
      setSelected(null);
    }

    setIsFormOpen(!isFormOpen);
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }

      setTracks(tracks.filter((track) => track._id !== trackId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
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
        <TrackForm
          handleAddTrack={handleAddTrack}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <TrackDetails
          selected={selected}
          handleFormView={handleFormView}
          handleRemoveTrack={handleRemoveTrack}
        />
      )}
    </>
  );
}
