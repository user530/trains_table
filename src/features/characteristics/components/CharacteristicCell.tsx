import React from 'react';
import { ITrainCharacteristic } from '../types';

interface ICharacteristicCell {
    index: number;
    type: keyof ITrainCharacteristic;
    value: number;
    valueMutator: (index: number, characteristic: keyof ITrainCharacteristic, newValue: number) => void;
}

export const CharacteristicCell: React.FC<ICharacteristicCell> = React.memo((props: ICharacteristicCell) => {
    const { index, type, value, valueMutator } = props;
    console.log(`Cell from row ${index} of type ${type} is rendered`);
    const [cellValue, setCellValue] = React.useState<number>(value);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const cellClickHandler = () => {
        setIsEditing(prev => !prev);
    };

    const blurHandler = () => {
        console.log('Validating');
        setIsEditing(() => false);
        if (cellValue !== value)
            valueMutator(index, type, cellValue);
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAsNum = +e.target.value;

        if (isNaN(inputAsNum)) return;

        setCellValue(inputAsNum);
    };

    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputRef.current) return;

        if (e.key === 'Enter')
            inputRef.current.blur();
    };

    React.useEffect(
        () => {
            // Focus input element on edit toggle
            if (isEditing && inputRef.current)
                inputRef.current.focus();
        },
        [isEditing]
    );

    return (
        <td onClick={cellClickHandler}>
            {
                isEditing
                    ?
                    <input
                        ref={inputRef}
                        type='text'
                        value={cellValue}
                        onChange={changeHandler}
                        onKeyDown={keyPressHandler}
                        onBlur={blurHandler}
                    />
                    : cellValue
            }
        </td>
    );
})