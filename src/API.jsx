export function auth(authData) {
  return sendRequest('POST', '/auth', authData, null);
}

export function getProfile(token) {
  return sendRequest('GET', '/private/me', null, token);
}

export function getNews(token, id = null) {
  const response = sendRequest('GET', '/private/news', null, token);
  if (id !== null) {
    return response.find(news => news.id === id);
  }
  return response;
}

function sendRequest(method, url, data, token) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token !== null) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  if (data !== null) {
    options.body = data;
  }

  return new Promise((resolve) => {
    fetch(`http://localhost:7070${url}`, options)
      .then(response => {
        if (response.ok) {
          resolve(response.json());
        }
        else if (response.status === 401) {
          Local.remove();
          location.href = '/';
        }
        else {
          response.json().then(json => {
            alert(json.message);
            location.href = '/';
          }
          );
        }
      });
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