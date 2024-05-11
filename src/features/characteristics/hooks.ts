import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateCharacteristic } from './characteristicsSlice';
import { ITrainCharacteristic } from './types';

// const { index, type, value, isValid } = props;
export const useCharacteristicCell = (value: number, index: number, type: keyof ITrainCharacteristic) => {
    const dispatch = useAppDispatch();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [cellValue, setCellValue] = React.useState<string>(value.toString());
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

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
            dispatch(updateCharacteristic({ charIndex: index, charName: type, charValue: valAsNumber }));

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

    return {
        inputRef,
        cellValue,
        isEditing,
        cellClickHandler,
        blurHandler,
        changeHandler,
        keyPressHandler,
    };
}