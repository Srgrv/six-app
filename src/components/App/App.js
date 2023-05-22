//package
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//actions
import { addNewTodo, fetchTodos } from "../../store/todoSlice";

//styles
import "../../styles/App.css";

//components
import Todos from "../Todos/Todos";
import Field from "../Field/Field";

const App = () => {
  const [value, setValue] = useState("");
  const { status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addNewTodo(value));
    setValue("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <Field value={value} setValue={setValue} addTodo={addTask} />

      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error occered: {error}</h2>}
      <Todos />
    </div>
  );
};

export default App;
