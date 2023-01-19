import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loginUser as loginUserAction } from '../actions/userActions'
import { verifyUser } from "../actions/userActions"

export interface UserState {
    data: any,
    authenticated: boolean,
    token: string | undefined,
    isLoading?: boolean,
    error?: any,
}

const initialState: UserState = {
    data: undefined,
    authenticated: false,
    token: undefined,
    isLoading: false,
    error: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.data = action.payload
            state.authenticated = true
            state.token = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginUserAction.fulfilled, (state: any, action) => {
            state = action.payload

            return ({...state, isLoading: false})
        })
        builder.addCase(verifyUser.pending, (state: any, action) => {
            console.log('Pending verify user...')
            state.isLoading = true
            state.data = undefined
        })
        builder.addCase(verifyUser.fulfilled, (state: any, action) => {
            console.log(action.payload, 'payload')
            console.log('No longer pending user verify...')
            state.data = action.payload.data
            state.isLoading = false
            state.authenticated = action.payload.authenticated
        })
        .addCase(verifyUser.rejected, (state: any, action) => {
            console.log('Rejected Verify User')
            state.data = undefined
            state.isLoading = false
        })
    }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer