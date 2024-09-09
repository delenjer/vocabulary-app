import React, {FC, useState} from 'react';

import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Input} from '@/components/Input/Input';
import {Textarea} from '@/components/Textarea/Textarea';
import {Button} from '@/components/Button/Button';
import {FormValues, WordsDto} from '@/models/models';
import {UseMutateFunction} from '@tanstack/react-query';
import {researchWord} from '@/app/api/api/api';
import {existWordState} from '@/utils/storageStore/storageStore';
import {schema} from '@/components/AddWords/Form/validationShema';
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import {addWord} from '@/app/api/api/api';

type FormData = {
  wordField: string,
  transcriptionField?: string,
  translateField: string,
};

export const Form = () => {
  const [isShow, setShow] = useState(false);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newWords:WordsDto) => addWord(newWords),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['words'] }),
  });

  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      wordField: '',
      transcriptionField: '',
      translateField: '',
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:FormData) => {
    const { existWordId } = await researchWord({ word: data.wordField });
    let newData:WordsDto = {
      word: data.wordField,
      translate: data.translateField,
    }

    if (existWordId) {
      existWordState(existWordId._id);

      return;
    }

    localStorage.removeItem("existWordId");

    if (data.transcriptionField) {
      newData.transcription = data.transcriptionField
    }


    if (data.wordField && data.translateField) {
      mutation.mutate(newData);
    }

    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="wordField"
        control={control}
        rules={{ required: true }}
        render={(
          { field: { onChange, value, name } }) => (
          <Input
            name={name}
            value={value}
            handleChange={onChange}
            placeholder={'Add new word'}
            wrapperClass="field"
            error={!!errors.wordField}
          />
        )}
      />

      <div>
        {
          isShow && (
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
          )
        }

        <label className="checkbox">
          <input type="checkbox" checked={isShow} onChange={() => setShow(!isShow)}/>

          {isShow ? 'Hide Transcription Field' : 'Show Transcription Field'}
        </label>
      </div>

      <Controller
        name="translateField"
        control={control}
        rules={{ required: true }}
        render={(
          { field: { onChange, value, name } }) => (
          <Textarea
            value={value}
            name={name}
            handleChange={onChange}
            placeholder={'Add Translate'}
            wrapperClass="field"
            error={!!errors.translateField}
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
