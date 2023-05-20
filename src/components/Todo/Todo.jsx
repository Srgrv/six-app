//packages
import React from "react";
import { useDispatch } from "react-redux";

//actions
import { toggleTodoCompleted } from "../../store/todoSlice";
import { deleteTodo } from "../../store/todoSlice";

export const Todo = ({ text, id, completed }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleTodoCompleted({ id }))}
        />
        <span>{text}</span>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => dispatch(deleteTodo({ id }))}
        >
          &times;
        </span>
      </li>
    </div>
  );
};

export default Todo;
