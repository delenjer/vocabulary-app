import React, { FC, useState } from "react";

import {VocabularyItem} from '@/models/models';
import { SliderControl } from "./SliderControl";
import { DeleteWord } from "../VocabularyList/DeleteWord/DeleteWord";

type ListDto = {
  data?: VocabularyItem[],
}

export const Slider:FC<ListDto> = ({ data }) => {
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
						<p className="slider__text">{ item.word }</p>

            <span className="slider__text slider__text--transcription">
              [ {item.transcription || ' - '} ]
            </span>

						<p className="slider__text slider__text--translate">{ item.translate }</p>

            <SliderControl
              text={'Prev'}
              handleClickDirection={(event) => handleClickPrev(event, i - 1)}
            />

            <SliderControl
              text={'Next'}
              handleClickDirection={(event) => handleClickNext(event, i)}
            />

            <DeleteWord itemId={item._id} />
					</div>
				))
			}
		</div>
    );
}