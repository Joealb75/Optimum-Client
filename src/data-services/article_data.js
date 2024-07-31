import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.js";

//!--------------- GET

export function getAllArticles() {
  return new Promise((resolve, reject) => {

    fetchWithResponse('articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}

export function getAllTags() { //! NOTE TAG NAMES NOT M2M table 
  return new Promise((resolve, reject) => {

    fetchWithResponse('tags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}

export function getAllArticleTags() { 
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('Optimum_User'));
      const token = user ? user.token : null;
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      fetchWithResponse('articletags', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(resolve).catch(reject);
    });
  }

export function getArticleByID(id) {
  return new Promise((resolve, reject) => {

    fetchWithResponse(`articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}

//!--------------- UPDATE

export function updateArticle(id, data) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithResponse(`articles/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resolve).catch(reject);
  });
}

export function updateTag(id, data) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithResponse(`tags/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resolve).catch(reject);
  });
}

//!--------------- CREATE

export function createNewArticle(newArticle) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithoutResponse('articles', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newArticle)
    }).then(resolve).catch(reject);
  });
}

export function createNewTag(newTag) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithoutResponse('tags', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTag)
    }).then(resolve).catch(reject);
  });
}

//!--------------- DELETE

export function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithResponse(`articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}

export function deleteTag(id) {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('Optimum_User'));
    const token = user ? user.token : null;

    if (!token) {
      console.error('No token found');
      return;
    }

    fetchWithResponse(`tags/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(resolve).catch(reject);
  });
}
