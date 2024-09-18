import React, { useState } from 'react';

const Input = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = () => {
    if (input1 == input2) {
      setState('matched');
    } else {
      setState('not matched');
    }
  };

  return (
    <div>
      <input
        type='text'
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <input
        type='text'
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <button onClick={handleSubmit}>Click me</button>
      {state && <h1>{state}</h1>}
    </div>
  );
};

export default Input;
