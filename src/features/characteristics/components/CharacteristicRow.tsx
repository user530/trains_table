import React from 'react';
import { ITrainCharacteristic } from '../types';
import { CharacteristicCell } from './CharacteristicCell';

interface ICharacteristicRow {
    rowIndex: number;
    rowCharacteristics: ITrainCharacteristic;
}

export const CharacteristicRow: React.FC<ICharacteristicRow> = React.memo(
    (props: ICharacteristicRow) => {
        const { rowIndex, rowCharacteristics } = props;
        const { engineAmperage, force, speed } = rowCharacteristics;
        console.log(`Row ${rowIndex} rendered`)

        return (
            <tr>
                <CharacteristicCell
                    key={'engineAmperage' + engineAmperage}
                    index={rowIndex}
                    type='engineAmperage'
                    value={engineAmperage}
                />
                <CharacteristicCell
                    key={'force' + force}
                    index={rowIndex}
                    type='force'
                    value={force}
                />
                <CharacteristicCell
                    key={'speed' + speed}
                    index={rowIndex}
                    type='speed'
                    value={speed}
                />
            </tr>
        );
    }
);