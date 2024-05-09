import React from 'react';
import { TrainTableRow } from '../TrainTableRow/TrainTableRow';
import { fetchTrains } from '../../trainsAPI';
import { ITrain } from '../../types';

export const TrainsTable = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [trains, setTrains] = React.useState<ITrain[]>([]);

    React.useEffect(
        () => {
            try {
                setIsLoading(true);
                fetchTrains(process.env.REACT_APP_TRAINS_URL ?? 'badurl')
                    .then(
                        data => {
                            if (!Array.isArray(data))
                                throw new Error('Wrong data type!');

                            const trainsData: ITrain[] = (data as any[]).map(
                                (item, index) => ({
                                    id: index,
                                    name: item.name ?? 'No name',
                                    description: item.description ?? 'No description',
                                    characteristics: item.characteristics ?? [],
                                })
                            );

                            setTrains(trainsData);
                        }
                    )
                    .catch(
                        err => console.error(err)
                    )
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

        },
        []
    )

    return (
        isLoading
            ? <span>Spinner</span>
            : <table>
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Описание</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        trains.map(
                            (train) => <TrainTableRow key={train.id} {...train} />
                        )
                    }
                </tbody>
            </table>
    )
}