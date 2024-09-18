import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../Context/FirebaseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { firebaseApp } = useContext(FirebaseContext);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    //Sign in User
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(userCred => {
        history.push('/');
        setError(null);
      })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <div>
      <div className='loginParentDiv'>
        <img width='200px' height='200px' src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fname'>Email</label>
          <br />
          <input
            className='input'
            type='email'
            name='email'
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <label htmlFor='lname'>Password</label>
          <br />
          <input
            className='input'
            type='password'
            name='password'
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
        <div>{error && <h4>An Error occurred</h4>}</div>
      </div>
    </div>
  );
}

export default Login;
