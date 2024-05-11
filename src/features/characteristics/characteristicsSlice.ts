import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITrainCharacteristic } from './types';
import { RootState } from '../../app/store';

interface ICharacteristicError {
    charIndex: number;
    charName: keyof ITrainCharacteristic;
}

interface ICharacteristicUpdate extends ICharacteristicError {
    charValue: number;
}

export interface ICharacteristicsState {
    characteristics: ITrainCharacteristic[];
    errors: ICharacteristicError[],
}

const initialState: ICharacteristicsState = {
    characteristics: [],
    errors: [],
}

const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState,
    reducers: {
        updateCharacteristic(state, action: PayloadAction<ICharacteristicUpdate>) {
            const { charIndex, charName, charValue } = action.payload;
            if (state.characteristics[charIndex] && charName in state.characteristics[charIndex]) {
                state.characteristics[charIndex][charName] = charValue;
            }
        },
    }
})

export const { updateCharacteristic } = characteristicsSlice.actions;

export const selectCharacteristic = (state: RootState, index: number, key: keyof ITrainCharacteristic): number | undefined => {
    const characteristic = state.selectedTrainInfo.characteristics[index]
    if (!characteristic || !(key in characteristic))
        return undefined;

    return state.selectedTrainInfo.characteristics[index][key];
}

export const characteristicsReducer = characteristicsSlice.reducer;