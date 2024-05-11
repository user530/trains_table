import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITrainCharacteristic } from './types';
import { RootState } from '../../app/store';
import { setSelectedTrain } from '../trains/trainsSlice';
import { isValidCharacteristic } from './validation'

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
            // Guard clause
            if (
                !state.characteristics[charIndex]
                || !(charName in state.characteristics[charIndex])
            ) return;

            // Check if input value is valid
            const isValid = isValidCharacteristic(charName, charValue);

            // Check if there is an error for that characteristic
            const errIndex = state.errors.findIndex(
                err => (err.charIndex === charIndex && err.charName === charName)
            );

            // Clear characteristic error
            if (isValid && errIndex >= 0)
                state.errors.splice(errIndex, 1); // Thanks Immer =P

            // Add characteristic error
            if (!isValid && errIndex === -1)
                state.errors.push({ charIndex, charName });

            // Update characteristic error
            state.characteristics[charIndex][charName] = charValue;
        },
    },
    extraReducers: (builder) => {
        builder
            // Update characteristics when train selection changes
            .addCase(setSelectedTrain, (state, action) => {
                if (!action.payload) return;

                state.characteristics = action.payload.characteristics;
            })
    }
})

export const { updateCharacteristic } = characteristicsSlice.actions;

export const selectAllCharacteristics = (state: RootState) => state.selectedTrainInfo.characteristics;
export const selectCharacteristicsErrors = (state: RootState) => state.selectedTrainInfo.errors;

export const characteristicsReducer = characteristicsSlice.reducer;