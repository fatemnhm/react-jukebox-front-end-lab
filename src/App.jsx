import { useState, useEffect } from 'react';

// Services
import * as truckService from './services/trucksService';

// Components
import TruckList from './components/TruckList';
import TruckDetails from './components/TruckDetails';
import TruckForm from './components/TruckForm';

export default function App() {
  const [trucks, setTrucks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function getTrucks() {
      try {
        const allTrucks = await truckService.index();
        if (allTrucks.error) {
          throw new Error(allTrucks.error);
        }
        setTrucks(allTrucks);
      } catch (error) {
        console.log(error);
      }
    }

    getTrucks();
  }, []);

  const updateSelected = (truck) => {
    setSelected(truck);
  };

  const handleAddTruck = async (formData) => {
    try {
      const newTruck = await truckService.create(formData);
      setTrucks([newTruck, ...trucks]);
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
      <TruckList
        truckList={trucks}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TruckForm handleAddTruck={handleAddTruck} />
      ) : (
        <TruckDetails selected={selected} />
      )}
    </>
  );
}
