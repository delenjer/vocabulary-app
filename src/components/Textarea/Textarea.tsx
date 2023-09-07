import {FC} from 'react';
import {Field} from '@/models/actionElements/actionElementsModel';

export const Textarea:FC<Field> = (
{
  value,
  name,
  handleChange,
  placeholder,
  wrapperClass,
}) => (
  <label className={`field-label ${ wrapperClass}`}>
    <textarea
      value={value}
      className="textarea"
      name={name || 'text'}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
    />
  </label>
);
