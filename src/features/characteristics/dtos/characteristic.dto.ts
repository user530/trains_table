import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { ITrainCharacteristic } from '../types';
import { Expose } from 'class-transformer';

export class TrainCharacteristic implements ITrainCharacteristic {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    speed: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    force: number;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    engineAmperage: number;
}