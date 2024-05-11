import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { CharacteristicCell } from './CharacteristicCell';
import { selectAllCharacteristics } from '../characteristicsSlice';

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
                        ({ speed, force, engineAmperage }, ind) => (
                            <tr key={ind} >
                                <CharacteristicCell
                                    key={'engineAmperage' + engineAmperage}
                                    index={ind}
                                    type='engineAmperage'
                                    value={engineAmperage}
                                />
                                <CharacteristicCell
                                    key={'force' + force}
                                    index={ind}
                                    type='force'
                                    value={force}
                                />
                                <CharacteristicCell
                                    key={'speed' + speed}
                                    index={ind}
                                    type='speed'
                                    value={speed}
                                />
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
} 