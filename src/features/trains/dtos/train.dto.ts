import { IsArray, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ITrain } from '../types';
import { TrainCharacteristic } from '../../characteristics/dtos/characteristic.dto';
import { Expose, Type } from 'class-transformer';

export class Train implements ITrain {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainCharacteristic)
    characteristics: TrainCharacteristic[];
}