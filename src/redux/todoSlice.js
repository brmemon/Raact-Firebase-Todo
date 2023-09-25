import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    mainTask:[],
    user: 'ok'
}
export const todo = createSlice({
    name:"Todo",
    initialState,
    reducers: { 
        addItem: (state ,  action) =>{
           state.mainTask.push(action.payload)
        },
        deleteItem: (state ,  action) =>{
            state.mainTask = state.mainTask.filter((item ,ind) => ind != action.payload)
        },
        updateItem: (state , action) =>{
            state.mainTask[action.payload.index] = action.payload.value 
        },
        EmptyMainTask: (state, action) => {
            state.mainTask = []
        },
        setMainTask: (state, action) => {
            state.mainTask = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
    
}) 
export const {addItem, deleteItem, updateItem, EmptyMainTask, setUser, setMainTask} = todo.actions 
export default todo.reducer;
