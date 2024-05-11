import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { CharacteristicCell } from './CharacteristicCell';
import { selectAllCharacteristics, selectCharacteristicsErrors } from '../characteristicsSlice';

export const CharacteristicsTable = () => {
    console.log('Characteristics Table rendered!');

    const characteristics = useAppSelector(selectAllCharacteristics);
    const charErrors = useAppSelector(selectCharacteristicsErrors);

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
                        ({ speed, force, engineAmperage }, ind) => {
                            // All errors for this characteristic
                            const thisCharErrors = charErrors.filter(err => err.charIndex === ind);

                            // Specific errors
                            const ampValid = thisCharErrors.findIndex(err => err.charName === 'engineAmperage') < 0;
                            const forceValid = thisCharErrors.findIndex(err => err.charName === 'force') < 0;
                            const speedValid = thisCharErrors.findIndex(err => err.charName === 'speed') < 0;

                            return (
                                <tr key={ind} >
                                    <CharacteristicCell
                                        key={'engineAmperage' + engineAmperage}
                                        index={ind}
                                        type='engineAmperage'
                                        value={engineAmperage}
                                        isValid={ampValid}
                                    />
                                    <CharacteristicCell
                                        key={'force' + force}
                                        index={ind}
                                        type='force'
                                        value={force}
                                        isValid={forceValid}
                                    />
                                    <CharacteristicCell
                                        key={'speed' + speed}
                                        index={ind}
                                        type='speed'
                                        value={speed}
                                        isValid={speedValid}
                                    />
                                </tr>
                            )
                        }
                    )
                }
            </tbody>
        </table>
    );
} 