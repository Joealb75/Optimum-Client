import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.js"

export function submitConsultation(newConsultationData) {
  return new Promise((resolve, reject) => {
    fetchWithoutResponse('consultation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newConsultationData),
    }).then(resolve).catch(reject);
  });
}

export function getAllConsultations() {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('Optimum_User'));
  
      // Extract the token from the user object
      const token = user ? user.token : null;
  
      if (!token) {
        console.error('No token found');
        reject('No token found');
        return;
      }
  
      fetchWithResponse('consultation', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(resolve).catch(reject);
    });
  }


export function getConsultationById(id) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));

    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      reject('No token found');
      return;
    }

    fetchWithResponse(`consultation/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}

export function updateConsultation(id, data) {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithResponse(`consultation/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
}


export function deleteConsultation(id) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));

    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      reject('No token found');
      return;
    }

    fetchWithResponse(`consultation/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}