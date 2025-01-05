import React, { useState } from 'react';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return [x, y];
  }

  function getXYMessage() {
    const [x, y] = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (direction === 'up' && row > 0) return index - 3;
    if (direction === 'down' && row < 2) return index + 3;
    if (direction === 'left' && col > 0) return index - 1;
    if (direction === 'right' && col < 2) return index + 1;

    return index;
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);

    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage('');
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    const [x, y] = getXY();

    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y, steps, email }),
      });
      const data = await response.json();
      setMessage(data.message || 'An error occurred');
    } catch {
      setMessage('An unexpected error occurred');
    }

    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{steps === 1 ? '' : 's'}</h3>
        <h3 id="message">{message}</h3>
      </div>
      <div id="grid">
        {Array(9).fill(null).map((_, idx) => (
          <div key={idx} className={`square ${index === idx ? 'active' : ''}`}>
            {index === idx ? 'B' : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>RESET</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <button id="submit" type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

