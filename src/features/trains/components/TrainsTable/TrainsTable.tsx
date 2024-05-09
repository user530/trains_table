import React from 'react';
import { TrainTableRow } from '../TrainTableRow/TrainTableRow';
import { fetchTrains } from '../../trainsAPI';
import { ITrain } from '../../types';
import { loadTrains, selectTrainsState } from '../../trainsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const TrainsTable = () => {
    const dispatch = useAppDispatch();
    const { trains, error, isLoading } = useAppSelector(selectTrainsState);

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
                        (train) => <TrainTableRow key={train.id} {...train} />
                    )
                }
            </tbody>
        </table >
    )
}