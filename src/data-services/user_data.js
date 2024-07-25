import { fetchWithResponse } from "./fetcher.js"

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

export function getUserByID() {
    
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    
    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
        console.error('No token found');
        return;
    }

    return fetchWithResponse('users', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
    })
}

// http://localhost:8000/officeuser/by_user_id?user_id=3

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
  
  