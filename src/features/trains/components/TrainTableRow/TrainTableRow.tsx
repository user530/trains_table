import React from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setSelectedTrain } from '../../trainsSlice'
import { ITrain } from '../../types';

interface ITrainTableRow {
    trainData: ITrain;
}

export const TrainTableRow: React.FC<ITrainTableRow> = (props: ITrainTableRow) => {
    console.log(`Train row ${props.trainData.id} rendered!`);
    const { trainData: { id, name, description } } = props;
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        console.log('Clicked table row ', id);
        dispatch(setSelectedTrain(props.trainData));
    };

    return (
        <tr onClick={clickHandler}>
            <td className='border px-4 py-3 hover:cursor-pointer'>{name}</td>
            <td className='border px-4 py-3 hover:cursor-pointer'>{description}</td>
        </tr>
    );
}