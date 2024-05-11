import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITrainCharacteristic } from './types';
import { RootState } from '../../app/store';
import { setSelectedTrain } from '../trains/trainsSlice';

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

export const characteristicsReducer = characteristicsSlice.reducer;