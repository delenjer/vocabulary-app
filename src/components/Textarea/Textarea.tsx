import {FC} from 'react';
import {Field} from '@/models/actionElements/actionElementsModel';
import {labelClassHandle} from '@/helper/handleClassFeild';

export const Textarea:FC<Field> = (
{
  value,
  name,
  handleChange,
  placeholder,
  wrapperClass,
  error,
}) => (
  <div className={labelClassHandle('field-wrapper', error)}>
    <label className={`${wrapperClass} field-label field-textarea`}>
    <textarea
      value={value}
      className="textarea"
      name={name || 'text'}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
    />
    </label>
  </div>
);
