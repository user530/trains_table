import React from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setSelectedTrain } from '../../trainsSlice'
import { ITrain } from '../../types';

interface ITrainTableRow {
    trainData: ITrain;
}

export const TrainTableRow: React.FC<ITrainTableRow> = (props: ITrainTableRow) => {
    const { trainData: { id, name, description } } = props;
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        console.log('Clicked table row ', id);
        dispatch(setSelectedTrain(props.trainData));
    };

    return (
        <tr onClick={clickHandler}>
            <td>{name}</td>
            <td>{description}</td>
        </tr>
    );
}