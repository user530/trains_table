import { IsArray, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ITrain } from '../types';
import { TrainCharacteristic } from '../../characteristics/dtos/characteristic.dto';
import { Type } from 'class-transformer';

export class Train implements ITrain {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TrainCharacteristic)
    characteristics: TrainCharacteristic[];
}