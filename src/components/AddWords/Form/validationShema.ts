import * as yup from 'yup';

export const schema = yup.object().shape({
  wordField: yup.string()
    .matches(/^[a-zA-Z]+$/, 'Field must contain only English letters')
    .required('Field is required'),
  transcriptionField: yup.string().matches(/^$|^[a-zA-Z]+$/, "Field must be empty or contain only letters"),
  translateField: yup.string()
    .matches(/[а-яА-Я]/, 'Field must contain only Ukrainian letters')
    .required('Translation is required'),
});
