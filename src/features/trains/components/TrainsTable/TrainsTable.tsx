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
        return <Spinner />;

    if (error)
        return <span>Error: {error}</span>

    return (
        <table className='table-auto w-full mb-4'>
            <thead>
                <tr className='bg-gray-200 font-semibold text-gray-500'>
                    <td className='px-4 py-4'>Название</td>
                    <td className='px-4 py-4'>Описание</td>
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
    )
}

export const Spinner = () => {
    const spinAnimation: React.CSSProperties & { [key: string]: unknown } = {
        animation: 'spin 2s linear infinite',
        '@keyframes spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        },
        border: '4px solid #ccc',
        borderTop: '4px solid blue',
        borderRadius: '50%',
        width: '50px',
        height: '50px'
    };

    return (
        <div
            className='spinner border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin'
            style={spinAnimation}
        ></div>
    )
} 