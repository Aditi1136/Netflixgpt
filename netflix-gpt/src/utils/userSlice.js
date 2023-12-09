import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: 'user',
        initialState : null,
        reducers:{     //Here we use reducers
            addUser: (state, action) =>{
                return action.payload;  //it will change the initial state value
            },
            removeUser: (state, action) =>{
                return null
            }
        }
    }
)

export const {addUser,removeUser} = userSlice.actions;

export default userSlice.reducer; 
