import React from 'react';
import { TrainTableRow } from '../TrainTableRow/TrainTableRow';
import { loadTrains, selectAllTrains, selectError, selectLoadingState } from '../../trainsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const TrainsTable = () => {
    console.log('Trains Table rendered!');
    const dispatch = useAppDispatch();
    const trains = useAppSelector(selectAllTrains);
    const isLoading = useAppSelector(selectLoadingState);
    const error = useAppSelector(selectError);

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