import React, { FC, useState } from "react";

import {VocabularyItem} from '@/models/models';
import { SliderControl } from "./SliderControl";
import { DeleteWord } from "../VocabularyList/DeleteWord/DeleteWord";
import { toggleVisibleType } from "../VocabularyList/VocabularyList";

type ListDto = {
  data?: VocabularyItem[],
  toggleVisible: toggleVisibleType,
  listKey: string;
}

export const Slider:FC<ListDto> = ({ data, toggleVisible, listKey }) => {
    const [indexElement, setIndexElement] = useState<number>(0);

    const lastIndexElement: number = data && data.length - 1 || 0;

    const handleClickNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number) => {
      event.preventDefault();

      let counter:number = index + 1;
      let isToEnd:boolean = counter > lastIndexElement;

      setIndexElement(isToEnd ? 0 : counter);
    }

    const handleClickPrev = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number) => {
      event.preventDefault();

      let counter:number = index;
      let isToFirst:boolean = counter < 0;

      setIndexElement(isToFirst ? lastIndexElement : counter);
    } 

    return (
      <div className="slider">
        {
          data && data.map((item, i) => (
            <div
              key={item._id}
              className={indexElement === i ? 'slider__item' : 'hide'}
            >
              <p className={toggleVisible.word ? 'slider__text' : 'slider__text is-hide'}>
                  { item.word }
                </p>

              <span className="slider__text slider__text--transcription">
                [ {item.transcription || ' - '} ]
              </span>

              <p className={
                  toggleVisible.translate ?
                    'slider__text slider__text--translate' :
                    'slider__text slider__text--translate is-hide'
                  }>
                    { item.translate }
                </p> 

              <div className="slider__action">
                <DeleteWord itemId={item._id} listKey={listKey} />
              </div>

              <SliderControl
                text={'Prev'}
                handleClickDirection={(event) => handleClickPrev(event, i - 1)}
              />

              <SliderControl
                text={'Next'}
                handleClickDirection={(event) => handleClickNext(event, i)}
              />
            </div>
          ))
        }
		  </div>
    );
}