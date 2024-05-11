import { ITrainCharacteristic } from './types';

export function isValidCharacteristic(type: keyof ITrainCharacteristic, value: unknown): boolean {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value))
        return false;

    switch (type) {
        case 'speed':
            return Number.isInteger(value) && value >= 0;
        case 'force':
            // Base force data include some intergers, so I assume we validate both ints and floats
            return value > 0
        case 'engineAmperage':
            return Number.isInteger(value) && value > 0;
        default:
            return false;
    };
}