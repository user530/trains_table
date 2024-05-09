import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Train } from './train.dto';
import { ITrain, ITrainsCollection } from '../types';

export class TrainsCollection implements ITrainsCollection {
    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Train)
    trains: ITrain[];
}