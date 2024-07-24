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

export function getOfficeUserByID(currentUser) {
    
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    
    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
        console.error('No token found');
        return;
    }

    return fetchWithResponse('', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
    })
}