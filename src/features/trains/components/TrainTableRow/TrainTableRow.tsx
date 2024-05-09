import React from 'react';

interface ITrainTableRow {
    id: number;
    name: string;
    description: string;
}

export const TrainTableRow: React.FC<ITrainTableRow> = (props: ITrainTableRow) => {
    const { id, name, description } = props;

    const clickHandler = () => {
        console.log('Clicked table row ', id);
    };

    return (
        <tr onClick={clickHandler}>
            <td>{name}</td>
            <td>{description}</td>
        </tr>
    );
}