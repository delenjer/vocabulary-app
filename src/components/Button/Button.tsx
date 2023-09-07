import React, {FC} from 'react';

type ButtonProps = {
  buttonType?: 'submit' | 'reset' | 'button' | undefined,
  text?: string,
  buttonClass?: string,
  handleButtonClick?: (event: React.MouseEvent<HTMLElement>) => void,
}

export const Button:FC<ButtonProps> = (
{
  buttonType,
  text,
  handleButtonClick,
  buttonClass
}) => (
  <button
    type={buttonType}
    className={`button ${ buttonClass }`}
    onClick={handleButtonClick}
  >
    {text}
  </button>
);
