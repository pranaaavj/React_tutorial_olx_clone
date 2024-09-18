import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Context/FirebaseContext';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const history = useHistory();
  const { firebaseApp } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    // Creating new user
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const newUser = userCredential.user;
        const db = getFirestore(firebaseApp);

        await updateProfile(newUser, { displayName: user.username });
        const usersCollection = collection(db, 'users');
        return addDoc(usersCollection, {
          uid: newUser.uid,
          username: user.username,
          email: user.email,
          phone: user.phone,
        });
      })
      .then(() => history.push('/login'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='signupParentDiv'>
        <img width='200px' height='200px' src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fname'>Username</label>
          <br />
          <input
            className='input'
            type='text'
            name='name'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <br />
          <label htmlFor='fname'>Email</label>
          <br />
          <input
            className='input'
            type='email'
            name='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <label htmlFor='lname'>Phone</label>
          <br />
          <input
            className='input'
            type='number'
            name='phone'
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <br />
          <label htmlFor='lname'>Password</label>
          <br />
          <input
            className='input'
            type='password'
            name='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
//
