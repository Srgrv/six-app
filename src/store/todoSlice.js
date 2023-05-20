import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        text: action.payload.value,
        id: new Date().toISOString(),
        completed: false,
      });
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoCompleted(state, action) {
      const change = state.todos.find((todo) => todo.id === action.payload.id);
      change.completed = !change.completed;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodoCompleted } = todoSlice.actions;
export default todoSlice.reducer;
