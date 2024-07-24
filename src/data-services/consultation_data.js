import { fetchWithResponse } from "./fetcher.js"

export function getAllConsultations() {
    
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    
    // Extract the token from the user object
    const token = user ? user.token : null;

    if (!token) {
        console.error('No token found');
        return;
    }

    return fetchWithResponse('consultation', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
}
