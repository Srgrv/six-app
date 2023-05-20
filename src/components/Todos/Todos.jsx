//packages
import React from "react";
import { useSelector } from "react-redux";

//components
import Todo from "../Todo/Todo";

export const Todos = ({ toggleTodoCompleted, deleteTodo }) => {
  const todo = useSelector((state) => state.todos.todos);

  return (
    <div>
      <ul>
        {todo.map((item) => {
          return <Todo key={item.id} {...item} />;
        })}
      </ul>
    </div>
  );
};

export default Todos;
