import React from 'react';
import { ITrainCharacteristic } from '../types';
import { useCharacteristicCell } from '../hooks';

interface ICharacteristicCell {
    index: number;
    type: keyof ITrainCharacteristic;
    value: number;
}

export const CharacteristicCell: React.FC<ICharacteristicCell> = React.memo(
    (props: ICharacteristicCell) => {
        const { index, type, value } = props;
        console.log(`Cell from row ${index}, of type ${type} with value ${value} rendered!`);
        const {
            isValid,
            inputRef,
            cellValue,
            isEditing,
            blurHandler,
            cellClickHandler,
            changeHandler,
            keyPressHandler
        } = useCharacteristicCell(value, index, type);

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
    }
);