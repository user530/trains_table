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
            console.log('Load Trains fired.');
            const data = await fetchTrains();
            console.log('Data fetched:', data);
            const trains = await validateTrains(data);
            console.log('Data validated:', trains);
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
                state.error = null;
                state.isLoading = true;
            })
            .addCase(loadTrains.fulfilled, (state, action) => {
                console.log('Resolved!');
                state.trains = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(loadTrains.rejected, (state, action) => {
                console.log('Rejected!');
                state.error = action.payload ?? 'Failed to load trains';
                state.isLoading = false;
            })
    },
})

export const { setTrains, resetTrains, setSelectedTrain, resetSelectedTrain } = trainsSlice.actions;

export const selectTrainsState = (state: RootState) => state.trains;

export const trainsReducer = trainsSlice.reducer; 