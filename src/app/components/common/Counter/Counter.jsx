import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '../Button';

const Counter = ({ name, label, value, min, max, onChange }) => {
  const [counterValue, setValue] = useState(+value || 0);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange({ target: { name, value: +counterValue } });
  }, [counterValue, name]);

  const handleIncrease = e => {
    e.preventDefault();
    if (counterValue >= max) return;
    setValue(counterValue + 1);
  };
  const handleDecrease = e => {
    e.preventDefault();
    if (counterValue <= min) return;
    setValue(counterValue - 1);
  };

  return (
    <div className='counter-wrapper'>
      {label && <p className='counter-label'>{label}</p>}
      <div className='counter-buttons__wrapper'>
        <Button type='circle' variant='contained' size='small' aria-label='reduce' onClick={handleDecrease}>
          <RemoveIcon fontSize='small' />
        </Button>
        <input className='counter-input' type='text' value={counterValue} readOnly />
        <Button type='circle' variant='contained' size='small' aria-label='increase' onClick={handleIncrease}>
          <AddIcon fontSize='small' />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
