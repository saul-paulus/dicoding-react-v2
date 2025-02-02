const BASE_URL = 'https://notes-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('accessToken');

const putAccessToken = (token) => localStorage.setItem('accessToken', token);

const fetchWithToken = async (url, option = {}) => {
  return fetch(url, {
    ...option,
    headers: {
      ...option.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    alert('Terjadi kesalahan pada proses registrasi');
    return { error: true };
  }
};

const authLogin = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    alert('Terjadi kesalahan pada proses login');
    return { error: true, data: null };
  }
};

const getUserLogged = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    return { error: true, data: null };
  }
};

//  Get Notes (non-archived)
const getNotes = async () =>{
    try{
      const response = await fetchWithToken(`${BASE_URL}/notes`,{
        method: "GET"
      });
      const responseJson = await response.json();

      if(responseJson.status !== 'success'){
        alert(responseJson.message);
        return {error: true, data: []}
      }
      return {error: false, data: responseJson.data};
    }catch(error){
      return { error: true, data: null };
    }
}

// Get Archived Notes
const getNoteArchive = async ()=>{
  try{
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`,{
      method:"GET"
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
      alert(responseJson.message);
      return {error: true, data: []}
    }
    return {error: false, data: responseJson.data};
  }catch(error){
    return { error: true, data: null };
  }
}

const getNotesById = async (note_id) =>{
  try{
    const response = await fetchWithToken(`${BASE_URL}/notes/${note_id}`);
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
      alert(responseJson.message);
      return {error: true, data: []}
    }
    return {error: false, data: responseJson.data};
  }catch(error){
    return { error: true, data: null };
  }
}

const postUnarchive = async (note_id) =>{
  try{
    const response = await fetchWithToken(`${BASE_URL}/notes/${note_id}/unarchive`,{
      method:"POST"
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
      alert(responseJson.message);
      return {error: true, data: []}
    }
    return {error: false, data: responseJson.data};
  }catch(error){
    return { error: true, data: null };
  }
}

const postArchive = async (note_id) =>{
  try{
    const response = await fetchWithToken(`${BASE_URL}/notes/${note_id}/archive`,{
      method:"POST"
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
      alert(responseJson.message);
      return {error: true, data: []}
    }
    return {error: false, data: responseJson.data};
  }catch(error){
    return { error: true, data: null };
  }
}

//  Delete Note
const deleteNote = async (note_id) =>{
  try{
    const response = await fetchWithToken(`${BASE_URL}/notes/${note_id}`,{
      method:"DELETE"
    });
    const responseJson = await response.json();

    if(responseJson.status !== 'success'){
      alert(responseJson.message);
      return {error: true}
    }
    return {error: false};
  }catch(error){
    return { error: true, data: null };
  }
}


const createNote = async ({title,body}) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title,body})
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true };
    }
    return { error: false };
  } catch (error) {
    alert('Terjadi kesalahan pada proses registrasi');
    return { error: true };
  }
};

export {
  putAccessToken,
  fetchWithToken,
  registerUser,
  authLogin,
  getUserLogged,
  getNotes,
  getNotesById,
  postUnarchive,
  postArchive,
  createNote,
  getNoteArchive,
  deleteNote
};
