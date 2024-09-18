import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import { FirebaseContext } from '../../Context/FirebaseContext';
import Heart from '../../assets/Heart';
import './Post.css';
import Post from '../Post';

function Posts() {
  const [products, setProducts] = useState([]);
  const { firebaseApp } = useContext(FirebaseContext);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const snapshot = await getDocs(collection(db, 'products'));
      let allItems = [];
      snapshot.forEach((doc) => {
        allItems.push({ ...doc.data(), id: doc.id });
      });
      setProducts(allItems);
    };
    fetchData();
  }, []);

  return (
    <div className='postParentDiv'>
      <div className='moreView'>
        <div className='heading'>
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className='cards'>
          {products.map((product) => {
            return <Post key={product.id} {...product} />;
          })}
        </div>
      </div>
      <div className='recommendations'>
        <div className='heading'>
          <span>Fresh recommendations</span>
        </div>
        <div className='cards'>
          <div className='card'>
            <div className='favorite'>
              <Heart></Heart>
            </div>
            <div className='image'>
              <img src='../../../Images/R15V3.jpg' alt='' />
            </div>
            <div className='content'>
              <p className='rate'>&#x20B9; 250000</p>
              <span className='kilometer'>Two Wheeler</span>
              <p className='name'> YAMAHA R15V3</p>
            </div>
            <div className='date'>
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
