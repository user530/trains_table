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
                className={'border px-4 py-3 relative hover:bg-gray-100' + (!isValid ? ' bg-red-200' : '')}
            >
                {
                    isEditing
                        ?
                        <div className='absolute inline-block inset-0'>
                            <input
                                className='w-full h-full text-center border-0 focus:ring-0 focus:outline-none'
                                ref={inputRef}
                                type='text'
                                value={cellValue}
                                onChange={changeHandler}
                                onKeyDown={keyPressHandler}
                                onBlur={blurHandler}
                            />
                        </div>
                        : cellValue
                }
            </td>
        );
    }
);