import React, { FC} from "react";

type SliderControlDto = {
	handleClickDirection: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
	text: string;
}

export const SliderControl:FC<SliderControlDto> = ({handleClickDirection, text}) => (
	<button
		className="slider__control"
    type="button"
    onClick={(event) => handleClickDirection(event, 0)}
  >
    {text}
  </button>
);
