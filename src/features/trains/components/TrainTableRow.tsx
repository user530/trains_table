import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setSelectedTrain } from '../trainsSlice'
import { ITrain } from '../types';

interface ITrainTableRow {
    trainData: ITrain;
}

export const TrainTableRow: React.FC<ITrainTableRow> = (props: ITrainTableRow) => {
    const { trainData: { name, description } } = props;
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(setSelectedTrain(props.trainData));
    };

    return (
        <tr
            className='border-solid border-b-2 border-gray-200 cursor-pointer last:border-0 hover:bg-gray-100 active:bg-gray-200' onClick={clickHandler}
        >
            <td className='border px-4 py-3'>{name}</td>
            <td className='border px-4 py-3'>{description}</td>
        </tr>
    );
}