import React from 'react';
import { ITrainCharacteristic } from '../types';

interface ICharacteristicCell {
    index: number;
    type: keyof ITrainCharacteristic;
    value: number;
    valueMutator: (index: number, characteristic: keyof ITrainCharacteristic, newValue: number) => void;
}

function isValidCharacteristic(type: keyof ITrainCharacteristic, value: unknown): boolean {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value))
        return false;

    switch (type) {
        case 'speed':
            return Number.isInteger(value) && value >= 0;
        case 'force':
            // Base force data include some intergers, so I assume we validate both ints and floats
            return value > 0
        case 'engineAmperage':
            return Number.isInteger(value) && value > 0;
        default:
            return false;
    };
}

export const CharacteristicCell: React.FC<ICharacteristicCell> = React.memo((props: ICharacteristicCell) => {
    const { index, type, value, valueMutator } = props;
    console.log(`Cell from row ${index}, of type ${type} with value ${value} rendered!`);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [cellValue, setCellValue] = React.useState<string>(value.toString());
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [isValid] = React.useState<boolean>(isValidCharacteristic(type, value));

    const cellClickHandler = () => {
        setIsEditing(prev => !prev);
    };

    const blurHandler = () => {
        setIsEditing(false);

        // Guard against invalid inputs
        const valAsNumber = (
            cellValue.trim() === ''
            || cellValue.trim() === '-'
            || isNaN(+cellValue)
        )
            ? 0
            : +cellValue;

        // If value is changed -> update state
        if (valAsNumber !== value)
            valueMutator(index, type, valAsNumber);

        // If cell displayed value is invalid number (differs from the parsed number -> update it)
        if (cellValue !== valAsNumber.toString())
            setCellValue(valAsNumber.toString());
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Filter out illegal symbols
        if (value === '' || /^-?\d*\.?\d*$/.test(value))
            setCellValue(value);
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
        <td
            onClick={cellClickHandler}
            style={!isValid ? { backgroundColor: 'red', color: 'white' } : {}}
        >
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