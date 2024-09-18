import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../Context/PostContext';
import { FirebaseContext } from '../../Context/FirebaseContext';
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from 'firebase/firestore';
import './View.css';

function View() {
  const { postDetails, setPostDetails } = useContext(PostContext);
  const [user, setUser] = useState({});
  // const { name, price, URL, createatedBy, createdAt, category } = postDetails;

  const { firebaseApp } = useContext(FirebaseContext);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const storedPostDetails = localStorage.getItem('postDetails');
    if (storedPostDetails) {
      setPostDetails(JSON.parse(storedPostDetails));
    }
  }, [setPostDetails]);

  useEffect(() => {
    if (postDetails && postDetails.createdBy) {
      const fetchUser = async () => {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', postDetails.createdBy)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        }
      };
      fetchUser();
    }
  }, [db, postDetails]);

  if (!postDetails || Object.keys(postDetails).length == 0) {
    return <h1>LOADING...</h1>;
  }

  return (
    postDetails && (
      <div className='viewParentDiv'>
        <div className='imageShowDiv'>
          <img src={postDetails.URL} alt={postDetails.name} />
        </div>
        <div className='rightSection'>
          <div className='productDetails'>
            <p>&#x20B9; {postDetails.price}</p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
          <div className='contactDetails'>
            {user && (
              <>
                {console.log(user)}
                <p>Seller details</p>
                <p>{user.username}</p>
                <p>{user.phone}</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}
export default View;
