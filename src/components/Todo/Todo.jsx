//packages
import React from "react";
import { useDispatch } from "react-redux";

//actions
import { toggleStatus } from "../../store/todoSlice";
import { deleteTodos } from "../../store/todoSlice";

export const Todo = ({ title, id, completed }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleStatus(id))}
        />
        <span>{title}</span>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => dispatch(deleteTodos(id))}
        >
          &times;
        </span>
      </li>
    </div>
  );
};

export default Todo;
