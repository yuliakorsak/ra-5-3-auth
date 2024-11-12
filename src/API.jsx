export function auth(authData) {
  const response = sendRequest('POST', '/auth', authData, null)
  return response;
}

export function getProfile(token) {
  const response = sendRequest('GET', '/private/me', null, token);
  return response;
}

export function getNews(token, id = null) {
  const response = sendRequest('GET', '/private/news', null, token);
  if (id !== null) {
    return response.find(news => news.id === id);
  }
  return response;
}

function sendRequest(method, url, data, token) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
      else if (xhr.response && xhr.response.message) {
        alert(xhr.response.message);
        location.href = '/';
      }
      else {
        if (xhr.status === 401) {
          Local.remove();
        }
        location.href = '/';
      }
    };
    xhr.open(method, `http://localhost:7070${url}`);
    if (token !== null) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send('Authorization', `Bearer ${token}`);
    }
    else {
      xhr.send(data);
    }
  });
}

export class Local {
  static user = 'NetoSocial_User';
  static token = 'NetoSocial_Token';

  static getToken() {
    return localStorage.getItem(this.token);
  }

  static setToken(value) {
    localStorage.setItem(this.token, value);
  }

  static getUser() {
    return localStorage.getItem(this.user);
  }

  static setUser(value) {
    localStorage.setItem(this.user, JSON.stringify(value));
  }

  static remove() {
    localStorage.removeItem(this.user);
    localStorage.removeItem(this.token);
  }
}