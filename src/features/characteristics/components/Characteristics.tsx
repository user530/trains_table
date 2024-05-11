import { useAppSelector } from '../../../app/hooks'
import { selectChosenTrain } from '../../trains/trainsSlice'
import { selectAllCharacteristics, selectCharacteristicsErrors } from '../characteristicsSlice';
import { CharacteristicRow } from './CharacteristicRow';
import { CharacteristicsTable } from './CharacteristicsTable';

export const Characteristics = () => {
    console.log('Characteristics rendered');
    const selectedTrain = useAppSelector(selectChosenTrain);
    const characteristics = useAppSelector(selectAllCharacteristics);
    const charErrors = useAppSelector(selectCharacteristicsErrors);

    if (!selectedTrain)
        return <></>

    const { name, description } = selectedTrain;

    const btnClickHandler = () => {
        const sortedCharacteristics = [...characteristics].sort(
            (firstChar, secondChar) => (firstChar.speed - secondChar.speed)
        );

        console.log(sortedCharacteristics);
    }

    return (
        <div>
            <h2>{name}</h2>
            <h5>{description}</h5>

            <CharacteristicsTable >
                {
                    characteristics && characteristics.map(
                        (characteristic, index) => (
                            <CharacteristicRow
                                key={index}
                                rowIndex={index}
                                rowCharacteristics={characteristic}
                            />
                        )
                    )
                }
            </CharacteristicsTable>

            <button
                disabled={charErrors.length > 0}
                onClick={btnClickHandler}
            >Отправить данные</button>
        </div>
    )
}