import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getProfile, Local } from '../API';

export default function Toolbar() {
  const token = Local.getToken();
  const [authorized, setAuthorized] = useState(token !== null);
  const navigate = useNavigate();


  if (authorized) {
    const user = JSON.parse(Local.getUser());
    const logout = () => {
      Local.remove();
      setAuthorized(false);
      navigate('/');
    };
    return (
      <div className="toolbar">
        <div className="title">Neto Social</div>
        <div className="profile">
          <p className="greeting">{"Hello, " + user.name}</p>
          <img className="userpic" src={user.avatar} alt={`${user.name}'s avatar`} />
          <button className="input logout_button" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
  else {
    const login = (e) => {
      e.preventDefault();
      const data = [...(new FormData(e.target)).values()];
      auth(JSON.stringify({ login: data[0], password: data[1] })).then(result => {
        if (result) {
          Local.setToken(result.token);
          getProfile(result.token).then(result => {
            Local.setUser(result)
            setAuthorized(true);
            navigate('/news');
          });
        }
      });
    }
    return (
      <div className="toolbar">
        <div className="title">Neto Social</div>
        <form className="login_form" onSubmit={login}>
          <input type="text" name="login" className="input login_input" placeholder="Username" />
          <input type="password" name="password" className="input login_input" placeholder="Password" />
          <button type="submit" className="input login_button">Login</button>
        </form>
      </div>
    );
  }
}