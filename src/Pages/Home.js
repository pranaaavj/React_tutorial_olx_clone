import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext, FirebaseContext } from '../Context/FirebaseContext';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  //Context
  const { setUser } = useContext(AuthContext);
  const { firebaseApp } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });
  return (
    <div className='homeParentDiv'>
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
