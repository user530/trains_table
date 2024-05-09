import { useAppSelector } from '../../app/hooks'
import { selectChosenTrain } from '../trains/trainsSlice';

export const CharacteristicsTable = () => {
    console.log('Characteristics Table rendered!');
    const selectedTrain = useAppSelector(selectChosenTrain);

    if (!selectedTrain)
        return <></>;

    const { characteristics } = selectedTrain;

    const clickHandler = (e: any) => { console.log(e.target) };

    return (
        <table>
            <thead>
                <tr>
                    <td>Ток двигателя</td>
                    <td>Сила тяги</td>
                    <td>Скорость</td>
                </tr>
            </thead>
            <tbody>
                {
                    characteristics.map(
                        ({ speed, force, engineAmperage }) => (
                            <tr
                                key={speed + force + engineAmperage}
                                onClick={clickHandler}
                            >
                                <td>{engineAmperage}</td>
                                <td>{force}</td>
                                <td>{speed}</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
} 