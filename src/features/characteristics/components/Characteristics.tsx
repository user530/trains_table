import { useAppSelector } from '../../../app/hooks'
import { selectChosenTrain } from '../../trains/trainsSlice'
import { CharacteristicsTable } from './CharacteristicsTable';

export const Characteristics = () => {
    const selectedTrain = useAppSelector(selectChosenTrain);

    if (!selectedTrain)
        return <></>

    const { name, description } = selectedTrain;

    return (
        <div>
            <h2>{name}</h2>
            <h5>{description}</h5>
            <CharacteristicsTable />
        </div>
    )
}