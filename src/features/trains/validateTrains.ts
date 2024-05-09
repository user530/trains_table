import { plainToClass } from 'class-transformer';
import { Train } from './dtos/train.dto';
import { validate } from 'class-validator';
import { TrainsCollection } from './dtos/trainsCollection.dto';

export async function validateTrains(data: unknown): Promise<Train[]> {
    if (!Array.isArray(data))
        throw new Error('Trains data validation failed!');

    // Add id-s if no present
    const dataWithIds = data.map((item, ind) => ({ ...item, id: item.id ?? ind + 1 }));

    const trainCollection = plainToClass(TrainsCollection, { trains: dataWithIds });

    const errors = await validate(trainCollection);

    if (errors.length > 0)
        throw new Error('Trains data validation failed!');

    return dataWithIds as Train[];
}