const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

export const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    const tracks = await res.json();
    return tracks;
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

export const updateTrack = async (formData, trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: 'PUT',
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

export const deleteTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};