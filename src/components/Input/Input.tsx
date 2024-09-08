import {FC} from 'react';
import {Field} from '@/models/actionElements/actionElementsModel';
import {labelClassHandle} from '@/helper/handleClassFeild';

export const Input:FC<Field> = (
{
  value,
  handleChange,
  name,
  placeholder,
  wrapperClass,
  error,
}) => (
  <div className={labelClassHandle('field-wrapper', error)}>
    <label
      className={`${wrapperClass} field-label`}
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
  </div>
);
