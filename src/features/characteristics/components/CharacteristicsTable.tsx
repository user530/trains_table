import { PropsWithChildren } from 'react';

export const CharacteristicsTable = ({ children }: PropsWithChildren) => {
    console.log('Characteristics Table rendered!');

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
                {children}
            </tbody>
        </table>
    );
}