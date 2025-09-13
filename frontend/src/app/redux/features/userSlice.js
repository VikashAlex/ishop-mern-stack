import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetails: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTouser: (state, { data }) => {  
            console.log(data)
        }
    },
})


export const { addTouser } = userSlice.actions

export default userSlice.reducer