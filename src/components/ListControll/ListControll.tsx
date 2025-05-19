import { FC } from "react";
import { Button } from "../Button/Button"

type ListControllType = {
    action: React.Dispatch<React.SetStateAction<string>>;
};

export const ListControll:FC<ListControllType> = ({action}) => {

    const handlrClick = (val: string) => {
        action(val);
    }

    return (
        <div className="list-control">
            <Button
                buttonType="button"
                text="New words"
                handleButtonClick={() => handlrClick('new')}
            />

            <Button
                buttonType="button"
                text="Сontinue study"
                handleButtonClick={() => handlrClick('old')}
            />        
        </div>
    )
}
