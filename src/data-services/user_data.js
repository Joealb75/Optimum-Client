export const getAllOfficeUsers = () => {
    return fetch("http://localhost:8000/officeuser").then((res) => res.json())}

