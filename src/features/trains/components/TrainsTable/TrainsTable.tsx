import React from 'react';
import { TrainTableRow } from '../TrainTableRow/TrainTableRow';
import { loadTrains, selectTrainsState } from '../../trainsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const TrainsTable = () => {
    const dispatch = useAppDispatch();
    const { trains, selectedTrain, error, isLoading } = useAppSelector(selectTrainsState);

    React.useEffect(
        () => {
            dispatch(loadTrains());
        },
        []
    )

    if (isLoading)
        return <span>Spinner</span>;

    if (error)
        return <span>Error: {error}</span>

    return (
        <>
            {selectedTrain && <h2>Selected {selectedTrain?.name}</h2>}
            <table>
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Описание</td>
                    </tr >
                </thead >

                <tbody>
                    {
                        trains.map(
                            (train) => <TrainTableRow key={train.id} trainData={train} />
                        )
                    }
                </tbody>
            </table >
        </>
    )
}