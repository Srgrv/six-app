//package
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../../store/todoSlice";

//styles
import "../../styles/App.css";

//components
import Todos from "../Todos/Todos";
import Field from "../Field/Field";

const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({ value }));
    setValue("");
  };

  return (
    <div>
      <Field value={value} setValue={setValue} addTodo={addTask} />
      <Todos />
    </div>
  );
};

export default App;
