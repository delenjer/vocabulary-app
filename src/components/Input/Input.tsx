import {FC} from 'react';
import {Field} from '@/models/actionElements/actionElementsModel';

export const Input:FC<Field> = (
{
  value,
  handleChange,
  name,
  placeholder,
  wrapperClass,
}) => (
  <label
    className={wrapperClass ? `field-label ${ wrapperClass}` : 'field-label input-label'}
  >
    <input
      value={value}
      name={name || 'text'}
      type="text"
      placeholder={placeholder}
      className="input"
      onChange={(e) => handleChange(e.target.value)}
    />
  </label>
);
