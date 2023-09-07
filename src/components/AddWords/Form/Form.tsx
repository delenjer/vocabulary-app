import React, {FC} from 'react';

import {Controller, useForm} from 'react-hook-form';
import {Input} from '@/components/Input/Input';
import {Textarea} from '@/components/Textarea/Textarea';
import {Button} from '@/components/Button/Button';
import {FormValues, WordsDto} from '@/models/models';
import {UseMutateFunction} from '@tanstack/react-query';
import {researchWord} from '@/app/api/api/api';
import {existWordState} from '@/utils/storageStore/storageStore';

type FormProps = {
  mutationHandle: UseMutateFunction<Response, unknown, WordsDto>,
};

export const Form:FC<FormProps> = ({ mutationHandle }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      wordField: '',
      transcriptionField: '',
      translateField: '',
    },
  });

  const onSubmit = async (data:FormValues) => {

    const { existWordId } = await researchWord({ word: data.wordField });

    if (existWordId) {
      existWordState(existWordId._id);

      return;
    }

    localStorage.removeItem("existWordId");


    if (data.wordField && data.translateField) {
      mutationHandle({
        word: data.wordField,
        translate: data.translateField,
        transcription: data.transcriptionField,
      });
    }

    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="wordField"
        control={control}
        render={(
          { field: { onChange, value, name } }) => (
          <Input
            name={name}
            value={value}
            handleChange={onChange}
            placeholder={'Add new word'}
            wrapperClass="field"
          />
        )}
      />

      <Controller
        name="transcriptionField"
        control={control}
        render={(
          { field: { onChange, value, name } }) => (
          <Input
            name={name}
            value={value}
            handleChange={onChange}
            placeholder={'Add transcription'}
            wrapperClass="field"
          />
        )}
      />

      <Controller
        name="translateField"
        control={control}
        render={(
          { field: { onChange, value, name } }) => (
          <Textarea
            value={value}
            name={name}
            handleChange={onChange}
            placeholder={'Add Translate'}
            wrapperClass="field"
          />
        )}
      />

      <Button
        text={'Add'}
        buttonType="submit"
        buttonClass="form-button"
      />
    </form>
  )
}
