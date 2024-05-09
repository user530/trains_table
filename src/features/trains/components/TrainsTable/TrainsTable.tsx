import { TrainTableRow } from '../TrainTableRow/TrainTableRow';

export const TrainsTable = () => {
    const placeholderData = [
        {
            id: 1,
            name: 'Train1',
            description: 'Description Train1',
            characteristics: [
                {
                    "speed": 0,
                    "force": 677.18,
                    "engineAmperage": 1150
                },
                {
                    "speed": 10,
                    "force": 584.08,
                    "engineAmperage": 1030
                },
                {
                    "speed": 20,
                    "force": 548.8,
                    "engineAmperage": 980
                },
            ]
        },
        {
            id: 2,
            name: 'Train2',
            description: 'Description Train2',
            characteristics: [
                {
                    "speed": 0,
                    "force": 677.18,
                    "engineAmperage": 1150
                },
                {
                    "speed": 10,
                    "force": 584.08,
                    "engineAmperage": 1030
                },
                {
                    "speed": 20,
                    "force": 548.8,
                    "engineAmperage": 980
                },
            ]
        },
        {
            id: 3,
            name: 'Train3',
            description: 'Description Train3',
            characteristics: [
                {
                    "speed": 0,
                    "force": 677.18,
                    "engineAmperage": 1150
                },
                {
                    "speed": 10,
                    "force": 584.08,
                    "engineAmperage": 1030
                },
                {
                    "speed": 20,
                    "force": 548.8,
                    "engineAmperage": 980
                },
            ]
        },
    ];

    return (
        <table>
            <thead>
                <tr>
                    <td>Название</td>
                    <td>Описание</td>
                </tr>
            </thead>

            <tbody>
                {
                    placeholderData.map(
                        (train) => <TrainTableRow key={train.id} {...train} />
                    )
                }
            </tbody>
        </table>
    )
}