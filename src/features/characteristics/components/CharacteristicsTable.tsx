import React from 'react';
import { useAppSelector } from '../../../app/hooks'
import { selectCharacteristics } from '../../trains/trainsSlice';
import { ITrainCharacteristic } from '../types';
import { CharacteristicCell } from './CharacteristicCell';

export const CharacteristicsTable = () => {
    console.log('Characteristics Table rendered!');
    const characteristics = useAppSelector(selectCharacteristics);
    console.log(characteristics);
    const [mutableData, setMutableData] = React.useState<ITrainCharacteristic[]>(characteristics ?? []);
    console.log(mutableData);

    React.useEffect(
        () => {
            setMutableData(characteristics ?? []);
        },
        [characteristics]
    );

    const mutateCell = React.useCallback(
        (index: number, characteristic: keyof ITrainCharacteristic, newValue: number) => {
            if (mutableData[index] && characteristic in mutableData[index])
                setMutableData(
                    (prevData) => prevData.map(
                        (item, ind) => ind !== index ? item : { ...item, [characteristic]: newValue }
                    )
                );
        },
        []
    );

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
                    mutableData.map(
                        ({ speed, force, engineAmperage }, ind) => (
                            <tr key={ind} >
                                <CharacteristicCell
                                    key={'engineAmperage' + engineAmperage}
                                    index={ind}
                                    type='engineAmperage' value={engineAmperage}
                                    valueMutator={mutateCell}
                                />
                                <CharacteristicCell
                                    key={'force' + force}
                                    index={ind}
                                    type='force' value={force}
                                    valueMutator={mutateCell}
                                />
                                <CharacteristicCell
                                    key={'speed' + speed}
                                    index={ind}
                                    type='speed' value={speed}
                                    valueMutator={mutateCell}
                                />
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
} 