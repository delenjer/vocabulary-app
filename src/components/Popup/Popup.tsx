'use client'

import React, {FC, memo } from 'react';
import {VocabularyItem} from '@/models/models';

type PopupProps = {
  setOpen: (arg0: boolean) => void,
  data?: VocabularyItem
}

export const Popup:FC<PopupProps> = memo(({ setOpen, data }) => {
  const handleClick = (event:React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest('.popup-wrapper')) {
      return;
    }

    setOpen(false);
  }

  return (
    <div
      className="overlay"
      onClick={handleClick}
    >
      <div className="popup-wrapper">
        <h3>This word is exist!</h3>

        <ul>
          <li>{ data?.word }</li>
          <li>{ data?.translate }</li>
        </ul>
      </div>
    </div>
  )
});

Popup.displayName = 'Popup';
