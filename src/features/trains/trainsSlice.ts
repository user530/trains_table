import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITrain } from './types';
import { fetchTrains } from './trainsAPI';
import { validateTrains } from './validateTrains';
import { RootState } from '../../app/store';

export interface ITrainsState {
    trains: ITrain[];
    selectedTrain: ITrain | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ITrainsState = {
    trains: [],
    selectedTrain: null,
    isLoading: false,
    error: null,
}

export const loadTrains = createAsyncThunk<ITrain[], void, { rejectValue: string }>(
    'trains/loadTrains',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchTrains();

            const trains = await validateTrains(data);

            return trains;
        } catch (error) {
            console.error(error);
            return rejectWithValue((error as Error).message || 'Something went wrong during train load!');
        }
    }
)

const trainsSlice = createSlice({
    name: 'trains',
    initialState,
    reducers: {
        setTrains(state, action: PayloadAction<ITrain[]>) {
            state.trains = action.payload;
        },
        resetTrains(state) {
            state.trains = [];
        },
        setSelectedTrain(state, action: PayloadAction<ITrain>) {
            state.selectedTrain = action.payload;
        },
        resetSelectedTrain(state) {
            state.selectedTrain = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadTrains.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadTrains.fulfilled, (state, action) => {
                state.error = null;
                state.trains = action.payload;
                state.isLoading = false;
            })
            .addCase(loadTrains.rejected, (state, action) => {
                state.error = action.payload ?? 'Failed to load trains';
                state.isLoading = false;
            })
    },
})

export const { setTrains, resetTrains, setSelectedTrain, resetSelectedTrain } = trainsSlice.actions;

export const selectAllTrains = (state: RootState) => state.trains.trains;
export const selectChosenTrain = (state: RootState) => state.trains.selectedTrain;
export const selectCharacteristics = (state: RootState) => state.trains.selectedTrain?.characteristics;
export const selectError = (state: RootState) => state.trains.error;
export const selectLoadingState = (state: RootState) => state.trains.isLoading;

export const trainsReducer = trainsSlice.reducer; 