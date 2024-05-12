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

    const { name } = selectedTrain;

    const btnClickHandler = () => {
        const sortedCharacteristics = [...characteristics].sort(
            (firstChar, secondChar) => (firstChar.speed - secondChar.speed)
        );

        console.log(sortedCharacteristics);
    };

    return (
        <div className='w-full md:w-2/3 flex flex-col'>
            <div className='w-full py-4 px-4 bg-white'>
                <h2 className='text-2xl font-semibold mb-1'>Характеристики</h2>
                <h5 className='text-lg font-semibold mb-3'>{name}</h5>

                <CharacteristicsTable>
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
            </div>

            <button
                className='bg-white border-solid border-2 border-gray-500 text-gray-700 hover:bg-gray-700 hover:text-white active:bg-gray-900 font-bold py-4 px-4 rounded block mx-auto mt-10 disabled:cursor-not-allowed transition duration-300'
                disabled={charErrors.length > 0}
                onClick={btnClickHandler}
            >Отправить данные</button>
        </div>
    )
}