import { IsDecimal, IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { ITrainCharacteristic } from '../types';

export class TrainCharacteristic implements ITrainCharacteristic {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    speed: number;

    @IsNotEmpty()
    @IsDecimal()
    @IsPositive()
    force: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    engineAmperage: number;
}