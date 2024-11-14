const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trucks`;

export const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    const trucks = await res.json();
    return trucks;
  } catch (err) {
    console.log(err);
  }
};

export const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateTruck = async (formData, truckId) => {
  try {
    const res = await fetch(`${BASE_URL}/${truckId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteTruck = async (truckId) => {
  try {
    const res = await fetch(`${BASE_URL}/${truckId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
