import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { Fragment, useContext, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Create.css';
import Header from '../Header/Header';

import { AuthContext, FirebaseContext } from '../../Context/FirebaseContext';

const Create = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    URL: '',
  });
  const { firebaseApp } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const date = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, price, image } = product;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `images/${image.name}`);
    const db = getFirestore(firebaseApp);
    try {
      const snapshot = await uploadBytes(storageRef, image);

      const URL = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        URL,
        createdBy: user.uid,
        createdAt: date.toDateString(),
      });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className='centerDiv'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>Name</label>
            <br />
            <input
              className='input'
              type='text'
              name='Name'
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <br />
            <label htmlFor='fname'>Category</label>
            <br />
            <input
              className='input'
              type='text'
              name='category'
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
            <br />
            <label htmlFor='fname'>Price</label>
            <br />
            <input
              className='input'
              type='number'
              name='Price'
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <br />
            <br />
            <img
              alt='Posts'
              width='200px'
              height='200px'
              src={
                product.image ? URL.createObjectURL(product.image) : null
              }></img>

            <br />
            <input
              type='file'
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files[0] })
              }
            />
            <br />
            <button className='uploadBtn' type='submit'>
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
