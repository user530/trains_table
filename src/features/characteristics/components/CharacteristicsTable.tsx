import { PropsWithChildren } from 'react';

export const CharacteristicsTable = ({ children }: PropsWithChildren) => {
    console.log('Characteristics Table rendered!');

    return (
        <table className='table-auto w-full mb-4 text-center'>
            <thead>
                <tr className='bg-gray-200 font-semibold text-gray-500'>
                    <td className='px-4 py-4'>Ток двигателя</td>
                    <td className='px-4 py-4'>Сила тяги</td>
                    <td className='px-4 py-4'>Скорость</td>
                </tr>
            </thead>

            <tbody>
                {children}
            </tbody>
        </table>
    );
}