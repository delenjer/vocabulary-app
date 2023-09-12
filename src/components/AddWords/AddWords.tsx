'use client'

import React from 'react';

import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import {addWord} from '@/app/api/api/api';
import {WordsDto} from '@/models/models';
import {Form} from '@/components/AddWords/Form/Form';

export const AddWords = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newWords:WordsDto) => addWord(newWords),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['words'] }),
  });

  return (
    <Form
      mutationHandle={mutation.mutate}
    />
  )
}
