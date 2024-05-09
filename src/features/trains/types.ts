import { ITrainCharacteristic } from '../characteristics/types';

export interface ITrain {
    id: number;
    name: string;
    description: string;
    characteristics: ITrainCharacteristic[];
}