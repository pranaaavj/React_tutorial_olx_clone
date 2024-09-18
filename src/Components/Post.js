import React from 'react';
import Heart from '../assets/Heart';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import { PostContext } from '../Context/PostContext';

function Post(props) {
  const { name, category, URL, price, date } = props;
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  const handleClick = () => {
    setPostDetails(props);
    localStorage.setItem('postDetails', JSON.stringify(props));
    history.push('/view');
  };

  return (
    <div className='card'>
      <div className='favorite'>
        <Heart></Heart>
      </div>
      <div className='image'>
        <img src={URL} alt='product image' onClick={handleClick} />
      </div>
      <div className='content'>
        <p className='rate'>&#x20B9;{price}</p>
        <span className='kilometer'>{category}</span>
        <p className='name'> {name}</p>
      </div>
      <div className='date'>
        <span>{date}</span>
      </div>
    </div>
  );
}

export default Post;
