import * as yup from 'yup';

export const schema = yup.object().shape({
  wordField: yup.string()
    .matches(/^[a-zA-Z]+$/, 'Field must contain only English letters')
    .required('Field is required'),
  transcriptionField: yup.string().required('Transcription is required'),
  translateField: yup.string()
    .matches(/^[а-яА-Я]+,?$/, 'Field must contain only Ukrainian letters')
    .required('Translation is required'),
});
