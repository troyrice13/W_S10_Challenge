import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    status: 'idle',
    error: null
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        ordersLoading(state) {
            state.status = 'loading';
        },
        ordersReceived(state, action) {
            state.status = 'fulfilled';
            state.orders = action.payload
        },
        ordersFetchFailed(state, action) {
            state.status = 'failed';
            state.orders = action.payload
        }
    }
})

export const { ordersLoading, ordersReceived, ordersFetchFailed} = pizzaSlice.actions

export default pizzaSlice.reducer