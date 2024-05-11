import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectAllCharacteristics } from '../characteristicsSlice';
import { CharacteristicRow } from './CharacteristicRow';

export const CharacteristicsTable = () => {
    console.log('Characteristics Table rendered!');

    const characteristics = useAppSelector(selectAllCharacteristics);

    if (!characteristics)
        return <></>;

    return (
        <table>
            <thead>
                <tr>
                    <td>Ток двигателя</td>
                    <td>Сила тяги</td>
                    <td>Скорость</td>
                </tr>
            </thead>
            <tbody>
                {
                    characteristics.map(
                        (characteristic, index) => (
                            <CharacteristicRow
                                key={index}
                                rowIndex={index}
                                rowCharacteristics={characteristic}
                            />
                        )
                    )
                }
            </tbody>
        </table>
    );
}