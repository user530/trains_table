import { TrainsTable } from './TrainsTable';

export const Trains = () => {
    return (
        <div className='w-full md:w-1/3 py-4 px-4 bg-white flex flex-col justify-center items-center shrink-0'>
            <h2 className='text-2xl font-semibold mb-3 self-start'>Поезда</h2>

            <TrainsTable />
        </div>
    )
}