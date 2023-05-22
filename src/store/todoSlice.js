import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Can not delete the dask. Server error");
      }
      dispatch(deleteTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id} `,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Can not toggle the task. Server error");
      }

      dispatch(toggleTodoCompleted({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );
      if (!response.ok) {
        throw new Error("Can not add the task. Server error");
      }

      const data = await response.json();
      console.log(data);

      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoCompleted(state, action) {
      const change = state.todos.find((todo) => todo.id === action.payload.id);
      change.completed = !change.completed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { addTodo, deleteTodo, toggleTodoCompleted } = todoSlice.actions;
export default todoSlice.reducer;
