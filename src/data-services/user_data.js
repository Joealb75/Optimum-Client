import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.js"

export function getAllOfficeUsers() {

    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    
    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
        console.error('No token found');
        return;
    }

    return fetchWithResponse('officeuser', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
    })
}

export async function getAllUsers() {
  const user = JSON.parse(localStorage.getItem('Optimum_User'));
  
  const token = user ? user.token : null;

  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  return fetchWithResponse('users', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export async function getAllUsers_NoToken() {
  return fetchWithResponse('users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function getAllOfficeUsers_noToken() {
  return fetchWithResponse('officeuser', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        }
  })
}

export function getUserByID(userId) {

  return fetchWithResponse(`users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function getOfficeUserByUserID(currentUser) {
  
    if (!currentUser || !currentUser.id) {
      console.error('Invalid currentUser object');
      return Promise.reject(new Error('Invalid currentUser object'));
    }
  
    const currentUserId = currentUser.id;
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
  
    // Extract the token from the user object
    const token = user ? user.token : null;
  
    if (!token) {
      console.error('No token found');
      return Promise.reject(new Error('No token found'));
    }
  
    return fetchWithResponse(`officeuser/by_user_id?user_id=${currentUserId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
  
  export function updateUser(userId, userData) {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;
  
    if (!token) {
      console.error('No token found');
      throw new Error('No token found');
    }
  
    return fetchWithoutResponse(`users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  }
  
  export async function updateOfficeUser(id, data) {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;
  
    if (!token) {
      console.error('No token found');
      throw new Error('No token found');
    }
  
    return fetchWithResponse(`officeuser/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: data,
    });
  }
  
  