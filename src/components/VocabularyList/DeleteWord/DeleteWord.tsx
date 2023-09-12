import {FC, memo} from 'react';
import Image from 'next/image';

import deleteIcon from '../../../../public/images/delete.svg';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteWord} from '@/app/api/api/api';

type DeleteListItemProps = {
  itemId: string,
}

export const DeleteWord:FC<DeleteListItemProps> = memo(({ itemId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: { _id: string }) => deleteWord(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['words'] }),
  });

  const handleClick = (id:string) => {
    mutation.mutate({ _id: id });
  }

  return (
    <button
      type="button"
      className="delete-btn"
      onClick={() => handleClick(itemId)}
    >
      <Image width={24} height={24} src={deleteIcon.src} alt="Delete icon" />
    </button>
  )
});

DeleteWord.displayName = 'DeleteWord';
