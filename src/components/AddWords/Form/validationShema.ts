import * as yup from 'yup';

export const schema = yup.object().shape({
  wordField: yup.string().required('Field is required'),
  transcriptionField: yup.string().notRequired(),
  translateField: yup.string()
    .matches(/[а-яА-Я]/, 'Field must contain only Ukrainian letters')
    .required('Translation is required'),
});
